FROM node:latest

WORKDIR /documentation

COPY package.json /documentation/

COPY . .

RUN yarn global add @compodoc/compodoc

CMD ["yarn", "run", "compodoc"]

EXPOSE 4201