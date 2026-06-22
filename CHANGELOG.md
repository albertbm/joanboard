# Changelog

What changed, newest first.

## 2026.06.22

### Added
- Bin day under the clock. `TRASH_ENTITY` is a sensor whose state is the next collection date;
  `TRASH_LABEL_ATTR` pulls in the bin type and `TRASH_LABEL_MAP` lets you rename the bin terms.
- A power button. When nothing's playing the radio controls disappear and a power button takes
  their place, wired to `SCRIPT_PLAY`.
- `STATION_TITLE`, for stations that broadcast a filename as the track name. Match the stream URL
  and show a fixed name instead.
- Tap the screen to pull in the slow stuff (weather, calendars, dinner, bin). Capped at once a
  minute so it can't be spammed.
- Knobs for how often each section refreshes: `RADIO_REFRESH_SEC`, `PERIODIC_REFRESH_MIN`,
  `DAILY_REFRESH_AT`.
- The add-on builds for ARM now, not just amd64, so it installs on a Pi or HA Green/Yellow.

### Changed
- Each section refreshes on its own schedule instead of one big loop: clock, battery and signal
  every minute; radio every 30 seconds; weather and calendar every half hour; dinner and bin once
  in the morning. Much less hammering of the Home Assistant API.
- The page only rewrites a value when it has actually changed. An e-ink panel that doesn't change
  isn't repainted, which is the whole game for battery.
- WiFi signal rounds to the nearest 5 dBm, so the usual jitter doesn't keep redrawing it.
- The add-on pins its nginx image now, warns in the log when the token isn't set, and skips a
  malformed `allow_cidr` entry instead of writing broken config.

### Fixed
- A muted player reads 0% now, instead of whatever the volume was set to.
- The battery reading ignores impossible jumps. A worn gauge that flips between two values no
  longer makes the number flicker.

### Security
- Calendar, dinner and bin text is escaped before it reaches the page. The dashboard shares an
  origin with the proxy that injects the token, so an event title with markup in it could
  otherwise run script that reaches the Home Assistant API.

## 2026.06.18

First release. An e-ink dashboard for a Visionect Joan, fed by Home Assistant: clock, weather and
forecast, a merged family calendar, the dinner plan, and radio controls. A LAN-only nginx add-on
serves the page and proxies the Home Assistant API so the token stays on the server, behind an IP
allowlist. Battery, WiFi and inside temperature come straight off the device. English and Icelandic.
