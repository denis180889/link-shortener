FROM node:slim
LABEL maintainer = "denis.pob@gmail.com"
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "run", "start"]