FROM node:10

ADD . /usr/src/app
WORKDIR /usr/src/app

EXPOSE 80

RUN npm install
CMD npm run debug