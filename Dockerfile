FROM --platform=linux/amd64 node:16 as build_image

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "serve"]
