const fs = require('fs');
let code = fs.readFileSync('src/components/TrackList.tsx', 'utf8');

code = code.replace(
/useEffect\(\(\) => \{\s+const audio = document\.querySelector\("audio"\);\s+if \(!audio\) return;\s+const handleError = \(\) => \{\s+const currentUrl = audio\.src;/,
`useEffect(() => {
    const handleError = (e: any) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'AUDIO') {
        const audio = target as HTMLAudioElement;
        const currentUrl = audio.src;`
);

code = code.replace(
/audio\.addEventListener\("error", handleError\);\s+return \(\) => \{\s+audio\.removeEventListener\("error", handleError\);\s+\};\s+\}, \[addLog\]\);/,
`}
    };

    window.addEventListener("error", handleError, true); // Use capture phase for non-bubbling media errors

    return () => {
      window.removeEventListener("error", handleError, true);
    };
  }, [addLog]);`
);

fs.writeFileSync('src/components/TrackList.tsx', code);
