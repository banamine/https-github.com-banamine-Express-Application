const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const startTag = 'app.get("/api/ajn-archive", async (req, res) => {';
const endTag = '  } catch (err) {';

const startIndex = code.indexOf(startTag);
if (startIndex !== -1) {
  let closingBlockEnd = code.indexOf('});', startIndex);
  while (code.substring(startIndex, closingBlockEnd).split('{').length !== code.substring(startIndex, closingBlockEnd).split('}').length) {
      closingBlockEnd = code.indexOf('});', closingBlockEnd + 1);
  }
  const endIndex = closingBlockEnd + 3;

  const newCode = `app.get("/api/ajn-archive", async (req, res) => {
  const BACKUP_EPISODES = [
      {
        id: "https://ajn.archives.pub/hourly-m4v/20260816_Sun_SundayLive-Hr2.m4v",
        title: "VIDEO - 20260816_Sun_SundayLive-Hr2",
        videoUrl: "https://ajn.archives.pub/hourly-m4v/20260816_Sun_SundayLive-Hr2.m4v",
        pubDate: "2026-08-16T23:00:00.000Z",
        dateKey: "2026-08-16",
        show: "Sunday Night Live",
        hour: "Hour 2"
      },
      {
        id: "https://ajn.archives.pub/hourly-m4v/20260816_Sun_SundayLive-Hr1.m4v",
        title: "VIDEO - 20260816_Sun_SundayLive-Hr1",
        videoUrl: "https://ajn.archives.pub/hourly-m4v/20260816_Sun_SundayLive-Hr1.m4v",
        pubDate: "2026-08-16T22:00:00.000Z",
        dateKey: "2026-08-16",
        show: "Sunday Night Live",
        hour: "Hour 1"
      },
      {
        id: "https://ajn.archives.pub/hourly-m4v/20260816_Sun_Alex-Hr2.m4v",
        title: "VIDEO - 20260816_Sun_Alex-Hr2",
        videoUrl: "https://ajn.archives.pub/hourly-m4v/20260816_Sun_Alex-Hr2.m4v",
        pubDate: "2026-08-16T21:00:00.000Z",
        dateKey: "2026-08-16",
        show: "Alex Jones Show",
        hour: "Hour 2"
      },
      {
        id: "https://ajn.archives.pub/hourly-m4v/20260816_Sun_Alex-Hr1.m4v",
        title: "VIDEO - 20260816_Sun_Alex-Hr1",
        videoUrl: "https://ajn.archives.pub/hourly-m4v/20260816_Sun_Alex-Hr1.m4v",
        pubDate: "2026-08-16T20:00:00.000Z",
        dateKey: "2026-08-16",
        show: "Alex Jones Show",
        hour: "Hour 1"
      },
      {
        id: "https://ajn.archives.pub/hourly-m4v/20260815_Sat_Alex-Special.m4v",
        title: "VIDEO - 20260815_Sat_Alex-Special",
        videoUrl: "https://ajn.archives.pub/hourly-m4v/20260815_Sat_Alex-Special.m4v",
        pubDate: "2026-08-15T20:00:00.000Z",
        dateKey: "2026-08-15",
        show: "Alex Jones Show",
        hour: "Special"
      },
      {
        id: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_WarRoom-Hr3.m4v",
        title: "VIDEO - 20260814_Fri_WarRoom-Hr3",
        videoUrl: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_WarRoom-Hr3.m4v",
        pubDate: "2026-08-14T22:00:00.000Z",
        dateKey: "2026-08-14",
        show: "War Room",
        hour: "Hour 3"
      },
      {
        id: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_WarRoom-Hr2.m4v",
        title: "VIDEO - 20260814_Fri_WarRoom-Hr2",
        videoUrl: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_WarRoom-Hr2.m4v",
        pubDate: "2026-08-14T21:00:00.000Z",
        dateKey: "2026-08-14",
        show: "War Room",
        hour: "Hour 2"
      },
      {
        id: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_WarRoom-Hr1.m4v",
        title: "VIDEO - 20260814_Fri_WarRoom-Hr1",
        videoUrl: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_WarRoom-Hr1.m4v",
        pubDate: "2026-08-14T20:00:00.000Z",
        dateKey: "2026-08-14",
        show: "War Room",
        hour: "Hour 1"
      },
      {
        id: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_Alex-Hr4.m4v",
        title: "VIDEO - 20260814_Fri_Alex-Hr4",
        videoUrl: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_Alex-Hr4.m4v",
        pubDate: "2026-08-14T19:00:00.000Z",
        dateKey: "2026-08-14",
        show: "Alex Jones Show",
        hour: "Hour 4"
      },
      {
        id: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_Alex-Hr3.m4v",
        title: "VIDEO - 20260814_Fri_Alex-Hr3",
        videoUrl: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_Alex-Hr3.m4v",
        pubDate: "2026-08-14T18:00:00.000Z",
        dateKey: "2026-08-14",
        show: "Alex Jones Show",
        hour: "Hour 3"
      },
      {
        id: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_Alex-Hr2.m4v",
        title: "VIDEO - 20260814_Fri_Alex-Hr2",
        videoUrl: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_Alex-Hr2.m4v",
        pubDate: "2026-08-14T17:00:00.000Z",
        dateKey: "2026-08-14",
        show: "Alex Jones Show",
        hour: "Hour 2"
      },
      {
        id: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_Alex-Hr1.m4v",
        title: "VIDEO - 20260814_Fri_Alex-Hr1",
        videoUrl: "https://ajn.archives.pub/hourly-m4v/20260814_Fri_Alex-Hr1.m4v",
        pubDate: "2026-08-14T16:00:00.000Z",
        dateKey: "2026-08-14",
        show: "Alex Jones Show",
        hour: "Hour 1"
      }
    ];

    // Force hardcoded explicit URLs, overriding cached state
    return res.json({
      success: true,
      source: "hardcoded_override",
      episodes: BACKUP_EPISODES,
      metadata: {
        total: BACKUP_EPISODES.length,
        duration: 0,
        weekBuckets: {}
      }
    });
});`;

  code = code.substring(0, startIndex) + newCode + code.substring(endIndex);
  fs.writeFileSync('server.ts', code);
  console.log("Replaced /api/ajn-archive");
}
