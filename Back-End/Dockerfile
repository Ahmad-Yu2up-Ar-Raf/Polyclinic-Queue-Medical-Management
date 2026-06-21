FROM dunglas/frankenphp:php8.2-alpine

# Install ekstensi PHP & Opcache
RUN install-php-extensions pdo pdo_pgsql bcmath opcache

# Copy composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy files
COPY . .

# Install dependencies (Optimize)
RUN composer install --no-dev --optimize-autoloader

# Setup storage
RUN chmod -R 777 storage bootstrap/cache

# Konfigurasi FrankenPHP Worker
ENV FRANKENPHP_CONFIG="worker ./public/index.php"

# Gunakan port 80
ENTRYPOINT ["php", "artisan", "octane:start", "--server=frankenphp", "--host=0.0.0.0", "--port=80"]
