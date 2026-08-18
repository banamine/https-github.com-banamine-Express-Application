const fs = require('fs');

const file = 'server.ts';
let code = fs.readFileSync(file, 'utf8');

// Inside app.get("/api/ajn-archive", ...
// Replace the single fetch with fetching both RSS_URL and SUNDAY_URL

// We will find the block:
// const RSS_URL = "https://rss.alexjones.media/AJNHourlyVideo.xml";
// console.log(`[Proxy] Fetching AJN RSS feed from: ${RSS_URL}`);

const oldFetchBlock = `
      const RSS_URL = "https://rss.alexjones.media/AJNHourlyVideo.xml";
      console.log(\`[Proxy] Fetching AJN RSS feed from: \${RSS_URL}\`);
      
      const response = await fetch(RSS_URL, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        signal: AbortSignal.timeout(30000) // 12s timeout
      });

      if (!response.ok) {
        throw new Error(\`Failed to fetch RSS. Status: \${response.status}\`);
      }

      const xmlText = await response.text();
`;

const newFetchBlock = `
      const RSS_URL = "https://rss.alexjones.media/AJNHourlyVideo.xml";
      const SUNDAY_URL = "https://rss.alexjones.media/SundayLive.xml";
      console.log(\`[Proxy] Fetching AJN RSS feeds from: \${RSS_URL} and \${SUNDAY_URL}\`);
      
      const fetchFeed = async (url) => {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          },
          signal: AbortSignal.timeout(30000)
        });
        if (!response.ok) {
          console.warn(\`Failed to fetch RSS from \${url}. Status: \${response.status}\`);
          return "";
        }
        return await response.text();
      };

      const [xmlTextHourly, xmlTextSunday] = await Promise.all([
        fetchFeed(RSS_URL),
        fetchFeed(SUNDAY_URL)
      ]);
      const xmlText = xmlTextHourly + "\\n" + xmlTextSunday;
`;

if (code.includes('const RSS_URL = "https://rss.alexjones.media/AJNHourlyVideo.xml";')) {
  code = code.replace(oldFetchBlock, newFetchBlock);
  fs.writeFileSync(file, code);
  console.log("Patched server.ts to include SundayLive.xml");
} else {
  console.log("Could not find the block to patch in server.ts");
}
