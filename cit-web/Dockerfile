# base image
FROM node:11.13.0-alpine

# set working directory
ENV NODE_ROOT /usr/src/app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 80
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=80

CMD ["npm", "start"]
