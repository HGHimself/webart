echo "deploying the frontend to dockerhub!"

echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin
docker image build -t $DOCKER_HUB_USERNAME/webart-frontend .
docker push $DOCKER_HUB_USERNAME/webart-frontend

sudo docker run -it --rm --name certbot \
            -v "/etc/letsencrypt:/etc/letsencrypt" \
            -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
            certbot/certbot certonly
