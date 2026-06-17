FROM nginx:alpine
RUN apk add --no-cache jq
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY run.sh /run.sh
RUN chmod +x /run.sh
# run.sh reads the ha_token / allow_cidr add-on options into nginx includes,
# then starts nginx. Static files are served from the mapped /share/joan.
ENTRYPOINT []
CMD ["/run.sh"]
