FROM node:16

WORKDIR /dist/src/server

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 8888

CMD [ "yarn", "start" ]
