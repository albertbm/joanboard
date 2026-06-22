// Copy this file to config.js and fill in your own values.
// config.js is gitignored so your personal details never enter git.
window.JOAN_CONFIG = {
  // Leave HA_URL and TOKEN empty to use the bundled add-on's API proxy
  // (recommended): the add-on injects the token server-side, so no token is
  // ever served to the browser. Set them only if you host this dashboard
  // yourself and want it to call Home Assistant directly.
  HA_URL: "",
  TOKEN: "",

  // UI language: matches a file in lang/ (en, is, ...).
  LANGUAGE: "en",
  // Free-text message shown centered in the status bar (leave "" to hide).
  BAR_MSG: "",

  // Entities (battery, WiFi and inside temperature come natively from the device)
  SONOS_ENTITY: "media_player.kitchen_speaker",
  // Stations whose "now playing" title is junk (e.g. a filename): show a fixed
  // name instead. Keyed by a stable substring of media_content_id (the stream
  // URL), e.g. { "somestreamid": "Some FM" }.
  STATION_TITLE: {},
  WEATHER_ENTITY: "weather.home",
  DINNER_CALENDAR: "calendar.dinner",
  DINNER_DAYS: 3,

  // Bin collection (optional): a sensor whose state is the next collection date
  // (YYYY-MM-DD). TRASH_LABEL_ATTR names an attribute holding the bin type, or "".
  // Leave TRASH_ENTITY "" to hide the line.
  TRASH_ENTITY: "",
  TRASH_LABEL_ATTR: "",
  // Optional: rename bin terms from the sensor, e.g. { "Mixed": "General" }.
  TRASH_LABEL_MAP: {},

  // Family calendars: [entity, display name]
  FAMILY: [
    ["calendar.person_one", "Person One"],
    ["calendar.person_two", "Person Two"]
  ],
  FAMILY_DAYS: 14,
  FAMILY_MAX: 7,

  // Weather forecast columns
  FORECAST_DAYS: 4,

  // Radio control scripts (HA script entity object_ids, without the "script." prefix)
  SCRIPT_SKIP: "radio_change_station",
  SCRIPT_PLAY: "radio_play_pause",

  // Misc
  VOLUME_STEP: 0.05,
  // Refresh cadence per section (clock + battery + signal are fixed at 1 min):
  RADIO_REFRESH_SEC: 30,        // radio / now-playing
  PERIODIC_REFRESH_MIN: 30,     // weather + family calendar
  DAILY_REFRESH_AT: "06:40"     // dinner + bin (relative dates) — once each morning
};
