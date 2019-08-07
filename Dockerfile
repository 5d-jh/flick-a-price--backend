FROM node:10

ADD . /usr/src/app/quaterflix-backend
WORKDIR /usr/src/app/quaterflix-backend

EXPOSE 80

RUN npm install
CMD npm run debug