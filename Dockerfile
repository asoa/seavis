FROM node:current

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get upgrade && \
  npm install && \
  npm install -g browserify && \
  apt-clean && \
  rm -rf /var/lib/apt/lists/*

COPY . .

RUN browserify src/views/leaflet/webmap.js -o public/bundle.js

EXPOSE 8000

CMD ["npm", "start"]

