#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="docker-compose.yml"

echo "[1/3] stop container(s)"
docker-compose -f "$COMPOSE_FILE" stop

echo "[2/3] remove container(s)"
docker-compose -f "$COMPOSE_FILE" rm -f

echo "[3/3] rebuild and run"
docker-compose -f "$COMPOSE_FILE" up --build -d

echo "Done. Service is running on port 6075."
