# Start docker containers as user 'vagrant' with docker-compose using the yml file in /docker
sudo -u vagrant bash -c "/usr/local/bin/docker-compose -f /opt/docker/docker-compose.yml up -d"
