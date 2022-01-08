#stage 1

FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm ci && npm run-script build

#stage 2

FROM nginx:alpine
COPY --from=node /app/dist/GOODFOOD-2.0A /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
