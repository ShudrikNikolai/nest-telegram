docker compose -f docker-compose.yml down;
docker compose -f docker-compose.yml up -d --build;
docker compose -f docker-compose.yml logs -f --tail=100;

echo "start sleep"

Start-Sleep -Seconds 2

echo "start script"

docker exec -it nest-telegram-mongodb-1 /scripts/rs-init.sh
