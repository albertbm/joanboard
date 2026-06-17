#!/bin/sh
set -e
OPTS=/data/options.json

# Token injected into the API proxy (never served to the browser).
TOKEN="$(jq -r '.ha_token // ""' "$OPTS" 2>/dev/null)"
printf 'proxy_set_header Authorization "Bearer %s";\n' "$TOKEN" > /etc/nginx/joan_token.conf

# IP allow/deny list from allow_cidr (space- or comma-separated CIDRs).
CIDRS="$(jq -r '.allow_cidr // "0.0.0.0/0"' "$OPTS" 2>/dev/null)"
: > /etc/nginx/joan_access.conf
for c in $(echo "$CIDRS" | tr ',' ' '); do
  [ -n "$c" ] && printf 'allow %s;\n' "$c" >> /etc/nginx/joan_access.conf
done
echo 'deny all;' >> /etc/nginx/joan_access.conf

exec nginx -g 'daemon off;'
