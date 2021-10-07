echo "deploying the server to dockerhub!"

echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin
docker image build -t $DOCKER_HUB_USERNAME/webart-server .
docker push $DOCKER_HUB_USERNAME/webart-server
