FROM node:21

RUN mkdir /opt/server
COPY ./package.json /opt/server/
COPY ./package-lock.json /opt/server/

WORKDIR /opt/server
RUN npm i

COPY ./public/ /opt/server/public/
COPY ./views/ /opt/server/views/
COPY ./app.js /opt/server/

EXPOSE 3000
CMD ["node", "app.js"]

