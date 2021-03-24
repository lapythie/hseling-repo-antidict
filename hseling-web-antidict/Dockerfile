FROM node:lts-alpine as front

COPY ./hseling-web-antidict/package*.json ./app/hseling-web-antidict/

RUN npm install ./app/hseling-web-antidict/
COPY ./hseling-web-antidict/ ./app/hseling-web-antidict/

WORKDIR ./app/hseling-web-antidict/

RUN npm run build

FROM nginx

COPY --from=front /app/hseling-web-antidict/build /usr/share/nginx/html
COPY --from=front /app/hseling-web-antidict/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx",  "-g", "daemon off;"]

EXPOSE 8000