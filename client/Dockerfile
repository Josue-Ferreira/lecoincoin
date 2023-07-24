FROM node:lts-alpine
WORKDIR /app
RUN npm update
COPY package*.json ./
RUN npm i
COPY src ./src
COPY public ./public
CMD npm start