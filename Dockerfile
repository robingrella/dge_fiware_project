FROM node:12.16.1
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
USER 999:999
CMD [ "npm", "start" ]