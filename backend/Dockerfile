FROM node:12.10.0-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE $NODE_DOCKER_PORT

CMD ["npm", "start"]
