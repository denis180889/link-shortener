FROM node:slim
LABEL maintainer = "denis.pob@gmail.com"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./app/ ./
RUN npm install
CMD ["npm", "run", "start"]