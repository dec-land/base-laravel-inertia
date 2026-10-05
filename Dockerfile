# syntax=docker/dockerfile:1
# check=skip=SecretsUsedInArgOrEnv
FROM node:26-alpine AS frontend
ARG VITE_REVERB_APP_KEY=fubball
ARG VITE_REVERB_HOST=ws.fubball.online
ARG VITE_REVERB_PORT=443
ARG VITE_REVERB_SCHEME=https
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM composer:2.10 AS vendor
WORKDIR /app
COPY app/ app/
COPY database/ database/
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-scripts \
    --prefer-dist \
    --ignore-platform-reqs

FROM serversideup/php:8.5-frankenphp
WORKDIR /var/www/html
USER root
COPY --chmod=755 docker/entrypoint.d/ /etc/entrypoint.d/
COPY --chown=www-data:www-data . /var/www/html
COPY --chown=www-data:www-data --from=vendor /app/vendor /var/www/html/vendor
COPY --chown=www-data:www-data --from=frontend /app/public/build /var/www/html/public/build
RUN mkdir -p /var/www/html/storage/framework/{cache,sessions,views} /var/www/html/storage/logs /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
EXPOSE 8080
USER www-data