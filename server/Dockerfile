FROM node:11.6.0

RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server
COPY . .

RUN npm i
RUN npm build

EXPOSE 5000
CMD ["npm", "start"]