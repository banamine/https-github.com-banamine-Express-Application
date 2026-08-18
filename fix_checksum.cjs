const fs = require('fs');
let code = fs.readFileSync('src/components/PlaylistEditor.tsx', 'utf8');

code = code.replace(
/const computedChecksum = "chsum_" \+ Math\.random\(\)\.toString\(36\)\.substring\(2, 10\);/,
`const simpleHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16);
      };
      const computedChecksum = "chsum_" + simpleHash(editorContent);`
);

fs.writeFileSync('src/components/PlaylistEditor.tsx', code);
