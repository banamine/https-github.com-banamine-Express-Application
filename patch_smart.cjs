const fs = require('fs');
let code = fs.readFileSync('src/components/SmartVideoEngine.tsx', 'utf8');

// Add PlaybackCircuitBreaker import
code = code.replace(/import Hls from 'hls\.js';/, "import Hls from 'hls.js';\nimport { PlaybackCircuitBreaker } from '../utils/PlaybackCircuitBreaker';");

// Add onError to props
code = code.replace(/onPlaying\?: \(\) => void;/, "onPlaying?: () => void;\n  onError?: (msg?: string) => void;");
code = code.replace(/onPlaying: onPlayingCallback }/, "onPlaying: onPlayingCallback, onError }");

// Instantiate circuit breaker
code = code.replace(/const \[autoplayBlocked, setAutoplayBlocked\] = useState\(false\);/, 
`const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const breakerRef = useRef(new PlaybackCircuitBreaker(3, 12000));
  const stallTimerRef = useRef<NodeJS.Timeout | null>(null);`);

// Replace cleanup
code = code.replace(/if \(hlsRef\.current\) \{\s+hlsRef\.current\.destroy\(\);\s+hlsRef\.current = null;\s+\}/g,
`if (hlsRef.current) {
      hlsRef.current.stopLoad();
      hlsRef.current.detachMedia();
      hlsRef.current.destroy();
      hlsRef.current = null;
    }`);

// Handle PlayError & buffering
code = code.replace(/const handlePlayError = \(e: any\) => \{/,
`const triggerError = (msg: string) => {
      if (breakerRef.current.recordFailure()) {
        if (isMounted) setStatus(\`TRIPPED: \${msg}\`);
        if (onError) onError(msg);
      } else {
        if (isMounted) setStatus(\`RECOVERING: \${msg}\`);
        // Force re-init if not tripped
        if (hlsRef.current) {
          hlsRef.current.recoverMediaError();
        }
      }
    };

    const handlePlayError = (e: any) => {`);

// Add playing / stalled listeners
code = code.replace(/video\.addEventListener\('playing', onPlaying\);\s+video\.addEventListener\('timeupdate', onPlaying\);/,
`video.addEventListener('playing', onPlaying);
    video.addEventListener('timeupdate', onPlaying);

    const onStalled = () => {
      if (!isMounted) return;
      if (stallTimerRef.current) clearTimeout(stallTimerRef.current);
      stallTimerRef.current = setTimeout(() => {
        triggerError('STUCK_BUFFERING');
      }, 5000);
    };

    const onNativeError = () => {
      const err = video.error;
      triggerError(err ? \`NATIVE_ERROR_\${err.code}\` : 'UNKNOWN_NATIVE_ERROR');
    };

    video.addEventListener('waiting', onStalled);
    video.addEventListener('stalled', onStalled);
    video.addEventListener('error', onNativeError);`);

// In onPlaying, clear stall timer
code = code.replace(/if \(isMounted && status !== 'PLAYING'\) \{/,
`if (stallTimerRef.current) clearTimeout(stallTimerRef.current);
      breakerRef.current.reset();
      if (isMounted && status !== 'PLAYING') {`);

// In HLS fatal error
code = code.replace(/if \(data\.fatal\) \{\s+if \(isMounted\) setStatus\(\`ENGINE ERROR: \$\{data\.type\}\`\);\s+hls\.destroy\(\);\s+\}/,
`if (data.fatal) {
              if (isMounted) setStatus(\`ENGINE ERROR: \${data.type}\`);
              hls.stopLoad();
              hls.detachMedia();
              hls.destroy();
              hlsRef.current = null;
              triggerError(data.type);
            }`);

// Cleanup event listeners
code = code.replace(/video\.removeEventListener\('playing', onPlaying\);\s+video\.removeEventListener\('timeupdate', onPlaying\);/,
`video.removeEventListener('playing', onPlaying);
      video.removeEventListener('timeupdate', onPlaying);
      video.removeEventListener('waiting', onStalled);
      video.removeEventListener('stalled', onStalled);
      video.removeEventListener('error', onNativeError);
      if (stallTimerRef.current) clearTimeout(stallTimerRef.current);`);

// Final HLS cleanup inside return
code = code.replace(/if \(hlsRef\.current\) hlsRef\.current\.destroy\(\);/,
`if (hlsRef.current) {
        hlsRef.current.stopLoad();
        hlsRef.current.detachMedia();
        hlsRef.current.destroy();
        hlsRef.current = null;
      }`);

fs.writeFileSync('src/components/SmartVideoEngine.tsx', code);
