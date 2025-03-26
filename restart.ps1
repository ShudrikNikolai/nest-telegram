cd docker

docker compose -f docker-compose.yml down;
docker compose -f docker-compose.yml up -d --build;
docker compose -f docker-compose.yml logs -f --tail=100;
