# Download docker-compose for this Linux kernel name (uname -s) and machine hardware name (uname -m)
curl -L \
    "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# Apply executable permissions to the docker-compose binary file
chmod +x /usr/local/bin/docker-compose
# Add docker group
groupadd docker
# Add user 'vagrant' to the docker group
usermod -aG docker vagrant
