# Menggunakan image resmi FrankenPHP (Berbasis Debian Bookworm agar DNS stabil)
FROM dunglas/frankenphp:php8.4-bookworm

# Install ekstensi PHP dengan script bawaan FrankenPHP
RUN install-php-extensions pdo pdo_pgsql bcmath opcache pcntl

# Ambil Composer terbaru
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy seluruh file project
COPY . .

# Bypass peringatan root session composer
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install dependensi Laravel (Optimized untuk Production)
RUN composer install --no-dev --optimize-autoloader

# PENTING: Kunci cache konfigurasi & route Laravel di dalam image
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# Atur permission
RUN chmod -R 777 storage bootstrap/cache

# Wajib untuk Hugging Face
EXPOSE 7860

# Jalankan server
ENTRYPOINT ["frankenphp", "php-server", "--listen", ":7860", "--root", "./public"]
