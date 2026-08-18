const fs = require('fs');
let code = fs.readFileSync('src/components/SyndicateSuite.tsx', 'utf8');

// Generate the 4-day window dynamically based on current date
const windowCode = `
  const getRollingDates = () => {
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
  const defaultDate = dateWindow[1]; // "Today"
`;

code = code.replace(/selectedDate = "2026-08-18",/, 'selectedDate,');

// Insert dateWindow definition inside component
code = code.replace(/export function SyndicateSuite\(\{[\s\S]*?\}\: SyndicateSuiteProps\) \{/, 
`$&
${windowCode}
  const activeDateKey = selectedDate || defaultDate;
`);

// Replace ["2026-08-16", "2026-08-17", "2026-08-18", "2026-08-19"] with dateWindow
code = code.replace(/\{\["2026-08-16", "2026-08-17", "2026-08-18", "2026-08-19"\]\.map\(\(dateVal\)/, '{dateWindow.map((dateVal)');

// Ensure activeDateKey replaces selectedDate inside the component where relevant
code = code.replace(/const activeDateKey = selectedDate;/g, ''); 
// Wait, is there already `const activeDateKey = selectedDate;`? Let's check!
fs.writeFileSync('patch_syndicate.cjs.tmp', code);
