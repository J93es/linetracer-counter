FROM node:14
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

RUN npm run build

COPY . .
EXPOSE 8080
CMD ["npm", "start"]