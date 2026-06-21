# UPGRADE: Pakai image resmi FrankenPHP dengan PHP 8.4 Alpine
FROM dunglas/frankenphp:php8.4-alpine

# Install ekstensi PHP & Opcache
RUN install-php-extensions pdo pdo_pgsql bcmath opcache

# Copy composer terbaru
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy seluruh source code aplikasi
COPY . .

# Bypass peringatan root session composer demi kelancaran non-interactive build
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install dependencies (Production Optimized)
RUN composer install --no-dev --optimize-autoloader

# Atur permission storage agar tidak macet saat generate log/cache
RUN chmod -R 777 storage bootstrap/cache

# Konfigurasi FrankenPHP Worker Mode untuk Laravel
ENV FRANKENPHP_CONFIG="worker ./public/index.php"

# Jalankan Laravel Octane dengan Engine FrankenPHP di Port 80
ENTRYPOINT ["php", "artisan", "octane:start", "--server=frankenphp", "--host=0.0.0.0", "--port=80"]
