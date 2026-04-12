#!/bin/bash

set -e # Остановить выполнение при любой ошибке

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Флаги
FRONT_ONLY=false

log() {
  echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
  echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1"
  exit 1
}

warning() {
  echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1"
}

# Функция для выполнения команды с проверкой
run_command() {
  log "Выполняю: $1"
  if eval "$1"; then
    log "✅ Успешно: $1"
  else
    error "❌ Ошибка при выполнении: $1"
  fi
}

# Функция деплоя фронтенда
deploy_frontend() {
  log "🎨 Деплой клиентской части..."
  run_command "cd /var/www/vtempe/data/rhythm"
  run_command "git pull"
  run_command "npm run build:prod"
}

# Деплой только фронтенда
frontend_only_deploy() {
  log "🎨 Запуск деплоя только фронтенд части..."
  deploy_frontend
  log "ℹ️  Фронтенд собран."
}

# Основной процесс
main() {
  parse_arguments "$@"
  frontend_only_deploy
  log "🎉 Деплой успешно завершен!"
}

# Запускаем основной процесс
main "$@"


# Сделайте скрипт исполняемым и запустите:
# chmod +x deploy.sh
# /var/www/vtempe/data/cost-ratio/deploy.sh
