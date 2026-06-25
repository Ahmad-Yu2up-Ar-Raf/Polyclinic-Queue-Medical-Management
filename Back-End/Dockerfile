# Dockerfile Production Teroptimasi
FROM php:8.4-cli-bookworm AS base

# Install system dependencies & extension pdo_pgsql
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    &>& docker-php-ext-install pdo pdo_pgsql bcmath opcache

# Ambil binary FrankenPHP resmi & Composer
COPY --from=dunglas/frankenphp:latest /usr/local/bin/frankenphp /usr/local/bin/frankenphp
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-dev --optimize-autoloader

# PENTING: Kunci cache Laravel di dalam image sewaktu build time!
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

RUN chmod -R 777 storage bootstrap/cache

EXPOSE 7860

ENTRYPOINT ["frankenphp", "php-server", "--listen", ":7860", "--root", "./public"]
