FROM node:14
WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

ENV PORT=8080 \
    DB_URI= \
    JWT_SECRET= \
    ADMIN_DATA= 

RUN npm install

COPY . ./app

EXPOSE 8080

CMD ["npm", "run", "build"]