FROM php:8.0-apache
RUN docker-php-ext-install pdo_mysql && docker-php-ext-enable pdo_mysql
# Use the default production configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
