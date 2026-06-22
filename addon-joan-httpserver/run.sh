#!/bin/sh
set -e
OPTS=/data/options.json

# Surface a clear reason rather than a cryptic jq failure if the options ever go missing.
if [ ! -r "$OPTS" ]; then
  echo "ERROR: cannot read $OPTS - add-on options unavailable." >&2
  exit 1
fi

# Token injected into the API proxy (never served to the browser).
TOKEN="$(jq -r '.ha_token // ""' "$OPTS")"
[ -z "$TOKEN" ] && echo "WARNING: ha_token is not set - the API proxy will return 401 and dashboard data will not load."
printf 'proxy_set_header Authorization "Bearer %s";\n' "$TOKEN" > /etc/nginx/joan_token.conf

# IP allow/deny list from allow_cidr (space- or comma-separated CIDRs).
CIDRS="$(jq -r '.allow_cidr // "0.0.0.0/0"' "$OPTS")"
: > /etc/nginx/joan_access.conf
for c in $(echo "$CIDRS" | tr ',' ' '); do
  [ -z "$c" ] && continue
  # Only accept IP/CIDR-shaped tokens, so a typo can't inject stray nginx directives.
  if echo "$c" | grep -qE '^[0-9a-fA-F.:]+(/[0-9]+)?$'; then
    printf 'allow %s;\n' "$c" >> /etc/nginx/joan_access.conf
  else
    echo "WARNING: ignoring invalid allow_cidr entry: $c"
  fi
done
echo 'deny all;' >> /etc/nginx/joan_access.conf

exec nginx -g 'daemon off;'
