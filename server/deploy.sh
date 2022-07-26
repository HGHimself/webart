echo "deploying the server to dockerhub!"

docker image build -t hgmaxwellking/webart-server .
docker push hgmaxwellking/webart-server

sudo docker run -it --rm --name certbot
 -v "/etc/letsencrypt:/etc/letsencrypt"
 -v "/var/lib/letsencrypt:/var/lib/letsencrypt" -v "/home/ec2-user/dist:/dist"
 certbot/certbot certonly

sudo cp /etc/letsencrypt/live/digitheque.io/cert.pem secret/
sudo cp /etc/letsencrypt/live/digitheque.io/privkey.pem secret/
sudo cp /etc/letsencrypt/live/digitheque.io/fullchain.pem secret/
sudo cp /etc/letsencrypt/live/digitheque.io/chain.pem secret/

mv cert.pem cert1.pem 
 mv chain.pem chain1.pem 
 mv fullchain.pem fullchain1.pem 
 mv privkey.pem privkey1.pem 

docker image rm hgmaxwellking/webart-server
docker-compose up --force-recreate --build -d