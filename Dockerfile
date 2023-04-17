FROM node:16 as build_image

COPY package*.json ./
RUN npm install

CMD [ "npm", "run", "build"]

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve"]
