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
  WEATHER_ENTITY: "weather.home",
  DINNER_CALENDAR: "calendar.dinner",
  DINNER_DAYS: 3,

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
  REFRESH_SEC: 20
};
