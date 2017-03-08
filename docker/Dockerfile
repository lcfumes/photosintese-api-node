FROM node:7.7-alpine

RUN apk --no-cache add supervisor

RUN npm install -g node-dev

COPY supervisor.conf /etc/supervisord-default.conf

ENTRYPOINT ["/usr/bin/supervisord", "--nodaemon", "--configuration", "/etc/supervisord-default.conf"]