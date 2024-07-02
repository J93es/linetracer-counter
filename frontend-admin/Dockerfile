FROM node:14 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
run npm run build
CMD ["nginx", "-g", "daemon off;"]