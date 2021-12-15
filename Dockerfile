FROM node:16.13-alpine3.14

WORKDIR /server

COPY ./package.json .
RUN npm install --production

COPY . .

ENV PORT=8080
ENV DB_HOST=mongodb+srv://db_admin:Pa55w0rd@cluster0.txe83.mongodb.net/db-contacts?retryWrites=true&w=majority
ENV SECRET=Node.js_Is_Imazing
ENV SENDGRID_API_KEY=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
ENV EMAIL=trash_only@ukr.net

EXPOSE 8080 3000

CMD npm start

