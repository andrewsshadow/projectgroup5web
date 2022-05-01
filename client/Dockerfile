FROM node:11.6.0

RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
COPY . .

RUN npm i 
RUN npm build

EXPOSE 3000
CMD ["npm", "start"]