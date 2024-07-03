FROM node:14 as build

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

ENV SERVER_URI=https://j93.es/api/

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/linetracer-counter/frontend-client

EXPOSE 80

RUN npm run start

CMD ["nginx", "-g", "daemon off;"]
