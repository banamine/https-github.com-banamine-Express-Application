const fs = require('fs');

const file = 'src/components/LiteApp.tsx';
let code = fs.readFileSync(file, 'utf8');

// We want to replace the `resolvedAjnHubSegments` logic
// It starts around `const resolvedAjnHubSegments = useMemo(() => {`
// and ends at `return [\n      makeSegment(...)\n    ];\n  }, [ajnEpisodes]);`

const startTag = 'const resolvedAjnHubSegments = useMemo(() => {';
const endTag = '  }, [ajnEpisodes]);';

const startIndex = code.indexOf(startTag);
const endIndex = code.indexOf(endTag, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const newLogic = `const resolvedAjnHubSegments = useMemo(() => {
    if (!ajnEpisodes || ajnEpisodes.length === 0) {
      return [];
    }

    const now = new Date();
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const filtered = ajnEpisodes.filter(ep => {
      const pubDate = new Date(ep.pubDate);
      const isRecent48h = pubDate >= fortyEightHoursAgo;
      const titleLower = ep.title.toLowerCase();
      const showLower = (ep.show || "").toLowerCase();
      const isSundayShow = (showLower.includes("sunday") || titleLower.includes("sunday")) && pubDate >= oneWeekAgo;
      return isRecent48h || isSundayShow;
    });

    // Sort descending by pubDate (newest first)
    filtered.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return filtered.map((ep, index) => {
      let defaultThumb = "https://archive.org/download/daily-highlights/lmbsa.png";
      const showLower = (ep.show || "").toLowerCase();
      if (showLower.includes("war")) {
        defaultThumb = "https://archive.org/download/daily-highlights/warroom.png";
      } else if (showLower.includes("alex")) {
        defaultThumb = "https://archive.org/download/daily-highlights/gettyimages-1796841914.webp";
      } else if (showLower.includes("sunday")) {
        defaultThumb = "https://archive.org/download/daily-highlights/emegency.png";
      }

      // Display Day String (Today, Yesterday, or the date)
      const epDate = new Date(ep.pubDate);
      const today = now.toISOString().split('T')[0];
      const yesterdayDate = new Date(now);
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterday = yesterdayDate.toISOString().split('T')[0];
      
      let displayDayStr = ep.dateKey;
      if (ep.dateKey === today) displayDayStr = "Today";
      else if (ep.dateKey === yesterday) displayDayStr = "Yesterday";
      else {
        // e.g. "Sunday"
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        displayDayStr = days[epDate.getDay()];
      }

      return {
        id: \`seg-ajn-\${index}-\${ep.dateKey}\`,
        title: \`\${ep.show || "AJN Broadcast"} - \${ep.hour || "Full Show"} (\${displayDayStr})\`,
        timestampLabel: ep.hour || "Full Show",
        duration: "1:00:00",
        thumbnailUrl: defaultThumb,
        broadcaster: (ep.show || "AJN").toUpperCase(),
        videoUrl: ep.videoUrl
      };
    });
`;
  code = code.substring(0, startIndex) + newLogic + code.substring(endIndex);
  fs.writeFileSync(file, code);
  console.log("Patched LiteApp.tsx logic");
} else {
  console.log("Could not find bounds in LiteApp.tsx");
}
