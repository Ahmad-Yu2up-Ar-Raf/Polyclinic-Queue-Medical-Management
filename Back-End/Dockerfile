# Pakai image resmi FrankenPHP dengan PHP 8.4 Alpine
FROM dunglas/frankenphp:php8.4-alpine

# Install ekstensi PHP, Opcache, dan PCNTL (Wajib untuk Octane!)
RUN install-php-extensions pdo pdo_pgsql bcmath opcache pcntl

# Copy composer terbaru
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy seluruh source code aplikasi
COPY . .

# Bypass peringatan root session composer
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Atur permission storage
RUN chmod -R 777 storage bootstrap/cache

# Konfigurasi FrankenPHP Worker Mode untuk Laravel
ENV FRANKENPHP_CONFIG="worker ./public/index.php"

# Jalankan Laravel Octane dengan Engine FrankenPHP, Port 80, dan Admin Port 2019
ENTRYPOINT ["sh", "-c", "php artisan migrate --force && php artisan db:seed --force && php artisan octane:start --server=frankenphp --host=0.0.0.0 --port=80 --admin-port=2019"]
