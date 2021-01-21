# base image
FROM node:15.6.0-alpine

# set working directory
ENV NODE_ROOT /usr/src/app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install yarn -g
COPY package.json yarn.lock ./
RUN yarn

COPY . .

RUN npm run build

EXPOSE 80
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080

CMD ["npm", "start"]
