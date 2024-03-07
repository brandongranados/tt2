FROM node:14

WORKDIR /home

COPY package*.json ./
COPY public/ public/
COPY src/ src/

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]

