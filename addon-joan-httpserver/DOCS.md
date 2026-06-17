# Joan Dashboard Server

A small nginx server that hosts the joanboard e-ink dashboard on the LAN and proxies the Home
Assistant API, injecting your token server-side so it is never exposed to the browser.

## Setup

1. Put the dashboard files in the Home Assistant `share/joan` folder (`dashboard.html`,
   `sleep.html`, `config.js`, and the `lang/` folder).
2. In this add-on's Configuration tab, set:
   - **ha_token**: a Home Assistant long-lived access token (Profile -> Security). The add-on
     adds it to API requests for you, so leave `TOKEN` empty in `config.js`.
   - **allow_cidr**: which network ranges may reach the server (see below).
3. Start the add-on. The dashboard is at `http://YOUR_HA_IP:8099/dashboard.html`.

## Security advisory

The only thing that needs to reach this server is the **Visionect renderer** (it fetches the
page and renders it for the tablet). Anyone else who can reach port 8099 can load the dashboard
and call the Home Assistant API through the proxy, because the proxy injects the token so the
caller needs none. So restrict `allow_cidr` to where the renderer actually comes from:

- **Visionect Server running in the Home Assistant add-on stack:** use the Docker/Supervisor
  network, typically `172.30.32.0/23`. The renderer appears from that internal network, not your
  LAN. Add your own machine (for example `192.168.1.50/32`) too if you want to open the dashboard
  in a browser.
- **Visionect Server self-hosted elsewhere:** use the Visionect server's IP, for example
  `10.0.0.5/32`.

`0.0.0.0/0` (allow all) is fine for first-run debugging, but it is a security risk. Tighten it
once things work. Use a comma- or space-separated list for multiple entries; add `::/0` only if
you actually use IPv6.

Never forward or tunnel port 8099 to the internet. The token is full-access (Home Assistant
tokens cannot be scoped), so the proxy must stay on the trusted LAN only.
