FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
RUN npm audit fix --force
RUN npm update
COPY src ./src
COPY public ./public
CMD npm start