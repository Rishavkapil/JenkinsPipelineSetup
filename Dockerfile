# Stage 1: Build the application
FROM node:20

WORKDIR /build

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]


