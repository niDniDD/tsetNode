FROM node:latest

COPY . /src

WORDOIR /src

RUN npm install --production

EXPOSE 3000

CMD npm start