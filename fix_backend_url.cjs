const fs = require('fs');
const path = require('path');

const OLD_DECLARATION = "const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://ajn-archive-iptv-player-382115576551.us-west2.run.app';";
const NEW_DECLARATION = "const BACKEND_URL = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || 'https://ajn-archive-iptv-player-382115576551.us-west2.run.app');";

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(OLD_DECLARATION)) {
        content = content.replace(OLD_DECLARATION, NEW_DECLARATION);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log("Updated", fullPath);
      }
    }
  }
}

processDirectory('./src');
