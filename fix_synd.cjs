const fs = require('fs');
let code = fs.readFileSync('src/components/SyndicateSuite.tsx', 'utf8');

code = code.replace(/selectedDate = "2026-08-18",/g, 'selectedDate,');

code = code.replace(/const \{[\s\S]*?\} = useBroadcastDay\(selectedDate\);/, (match) => {
  return `  const getRollingDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = -1; i <= 2; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };
  const dateWindow = getRollingDates();
  const defaultDate = dateWindow[1];
  
  const actualDate = selectedDate || defaultDate;
  
` + match.replace(/selectedDate/, 'actualDate');
});

code = code.replace(/\{\["2026-08-16", "2026-08-17", "2026-08-18", "2026-08-19"\]\.map/, '{dateWindow.map');

// selectedDate in useEffect:
code = code.replace(/if \(selectedDate\) \{\s+selectDateKey\(selectedDate\);\s+\}/,
`if (actualDate) {
      selectDateKey(actualDate);
    }`);

code = code.replace(/\[selectedDate, selectDateKey\]/, '[actualDate, selectDateKey]');

fs.writeFileSync('src/components/SyndicateSuite.tsx', code);
