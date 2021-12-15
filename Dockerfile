FROM node:16.13-alpine3.14

WORKDIR /server

COPY ./package.json .
RUN npm install --production

COPY . .

EXPOSE 8080 3000

CMD npm start

