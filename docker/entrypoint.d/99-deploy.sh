#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting container deployment script..."

# 1. Run Database Migrations (ONLY ON WEB CONTAINER / MIGRATION LEADER)
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "Waiting for database connection before running migrations..."
    MAX_TRIES=30
    COUNT=0
    until php -r "
        try {
            new PDO(
                sprintf('pgsql:host=%s;port=%s;dbname=%s', getenv('DB_HOST') ?: 'pgsql', getenv('DB_PORT') ?: '5432', getenv('DB_DATABASE') ?: 'fubball'),
                getenv('DB_USERNAME') ?: 'sail',
                getenv('DB_PASSWORD') ?: '',
                [PDO::ATTR_TIMEOUT => 2]
            );
            exit(0);
        } catch (Exception \$e) {
            exit(1);
        }
    " > /dev/null 2>&1 || [ "$COUNT" -ge "$MAX_TRIES" ]; do
        COUNT=$((COUNT + 1))
        echo "Database unavailable, waiting 1s... ($COUNT/$MAX_TRIES)"
        sleep 1
    done

    if [ "$COUNT" -ge "$MAX_TRIES" ]; then
        echo "Error: Database connection timed out after ${MAX_TRIES}s!"
        exit 1
    fi

    echo "Database ready. Running migrations..."
    php /var/www/html/artisan migrate --force || {
        echo "Initial migration attempt failed or concurrent migration in progress. Retrying in 3s..."
        sleep 3
        php /var/www/html/artisan migrate --force || true
    }
fi

# 2. Ensure Storage Symlink Exists
if [ ! -L /var/www/html/public/storage ]; then
    echo "Creating storage symlink..."
    php /var/www/html/artisan storage:link || true
fi

# 3. Rebuild Filesystem Caches (ALL CONTAINERS)
echo "Rebuilding caches..."
php /var/www/html/artisan config:cache
php /var/www/html/artisan view:cache
php /var/www/html/artisan route:cache
php /var/www/html/artisan event:cache

echo "Deployment script completed successfully!"