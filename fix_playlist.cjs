const fs = require('fs');
let code = fs.readFileSync('src/components/PlaylistEditor.tsx', 'utf8');

// Add import
if (!code.includes('import { safeLocalStorage }')) {
  code = code.replace(/import React[\s\S]*?;/, `$&
import { safeLocalStorage } from "../utils/safeStorage";`);
}

code = code.replace(/localStorage\.getItem/g, 'safeLocalStorage.getItem');
code = code.replace(/localStorage\.setItem/g, 'safeLocalStorage.setItem');

fs.writeFileSync('src/components/PlaylistEditor.tsx', code);
