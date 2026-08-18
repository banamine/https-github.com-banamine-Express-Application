const fs = require('fs');

const file = 'server.ts';
let code = fs.readFileSync(file, 'utf8');

const backupStart = '    const BACKUP_EPISODES = [';
const backupEnd = '    ];';
const startIndex = code.indexOf(backupStart);
const endIndex = code.indexOf(backupEnd, startIndex) + backupEnd.length;

if (startIndex !== -1 && endIndex !== -1) {
  const newBackupEpisodes = `    const BACKUP_EPISODES = [
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
    ];`;
  
  code = code.substring(0, startIndex) + newBackupEpisodes + code.substring(endIndex);
  fs.writeFileSync(file, code);
  console.log("Patched server.ts BACKUP_EPISODES");
} else {
  console.log("Could not find BACKUP_EPISODES bounds.");
}
