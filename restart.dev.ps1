cd docker

docker compose -f docker-compose.dev.yml down;
docker compose -f docker-compose.dev.yml up -d --build;
docker compose -f docker-compose.dev.yml logs -f --tail=100;
