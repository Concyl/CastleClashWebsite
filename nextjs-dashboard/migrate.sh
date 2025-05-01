#!/bin/sh
set -e
until pg_isready -h db -p 5432 -U postgres; do
  sleep 2
done
pnpm db:generate
pnpm db:migrate
echo "Starting application..."
exec "$@"