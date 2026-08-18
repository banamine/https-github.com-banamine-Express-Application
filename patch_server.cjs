const fs = require('fs');

const file = 'server.ts';
let code = fs.readFileSync(file, 'utf8');

// We want to wrap the error handler in endpoints doing archive.org fetches to return the nice error message.

// In /api/ajn-discover-channels
code = code.replace(
  'throw new Error(`Archive.org metadata status ${response.status}`);',
  'throw new Error(`Archive.org metadata status ${response.status}. Internet Archive may be experiencing a power outage or service disruption.`);'
);

code = code.replace(
  'console.error("[Channel Discovery] Error fetching live channels from archive.org:", err);',
  'console.error("[Channel Discovery] Error fetching live channels from archive.org:", err.message);'
);

// In search API
code = code.replace(
  'res.status(500).json({ success: false, error: err.message || "Failed to parse archive.org response" });',
  'res.status(500).json({ success: false, error: err.message + " (Note: Internet Archive is currently dealing with a power outage causing service disruptions)." });'
);

code = code.replace(
  'res.status(500).json({ success: false, error: err.message || "Failed to search archive.org" });',
  'res.status(500).json({ success: false, error: err.message + " (Note: Internet Archive is currently dealing with a power outage causing service disruptions)." });'
);

// In playlist/import-from-archive-metadata
code = code.replace(
  'res.status(500).json({ success: false, error: err.message || "Failed to parse archive.org response" });',
  'res.status(500).json({ success: false, error: (err.message || "Failed to parse archive.org response") + " (Note: Internet Archive is currently dealing with a power outage causing service disruptions)." });'
);
code = code.replace(
  'res.status(500).json({ success: false, error: err.message || "Failed to load collection metadata" });',
  'res.status(500).json({ success: false, error: (err.message || "Failed to load collection metadata") + " (Note: Internet Archive is currently dealing with a power outage causing service disruptions)." });'
);


fs.writeFileSync(file, code);
console.log("Patched server.ts error messages");
