FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY src ./src
EXPOSE 5000
CMD npm start