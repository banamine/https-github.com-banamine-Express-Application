const fs = require('fs');
let code = fs.readFileSync('src/components/TrackList.tsx', 'utf8');

const regex = /\/\/ Listen for audio player error events\s*useEffect\(\(\) => \{[\s\S]*?\}, \[addLog\]\);/;

const replacement = `// Listen for audio player error events
  useEffect(() => {
    const handleError = (e: any) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'AUDIO') {
        const audio = target as HTMLAudioElement;
        const currentUrl = audio.src;
        if (currentUrl) {
          setFailedTracks((prev) => {
            const next = new Set(prev);
            next.add(currentUrl);
            return next;
          });
          if (addLog) {
            addLog(\`Audio stream failed to load source: \${currentUrl}\`, "error");
          }
        }
      }
    };

    window.addEventListener("error", handleError, true);

    return () => {
      window.removeEventListener("error", handleError, true);
    };
  }, [addLog]);`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/TrackList.tsx', code);
