FROM node:14 as build

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/linetracer-counter/frontend-admin

RUN rm /etc/nginx/conf.d/default.conf
COPY /etc/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]