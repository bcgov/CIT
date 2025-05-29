# base image
FROM node:20 AS build-deps

# set working directory
ENV NODE_ROOT /usr/src/app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

RUN yarn build

FROM nginxinc/nginx-unprivileged:1.27-alpine
USER root
RUN apk add coreutils
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY --from=build-deps /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/static/env.tsx
RUN ln -s /tmp/env.tsx /usr/share/nginx/html/static/env.tsx
USER nginx
EXPOSE 80

RUN printenv

CMD ["sh", "-c", "envsubst < /usr/share/nginx/html/static/env.template.tsx > /tmp/env.tsx && exec nginx -g 'daemon off;'"]
