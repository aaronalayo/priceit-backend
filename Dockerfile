FROM alpine

RUN apk add --update nodejs npm

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]
