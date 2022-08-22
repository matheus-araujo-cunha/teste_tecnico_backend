FROM node:17.4.0

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

ENV NODE_PATH=./src

CMD ["yarn","start"]