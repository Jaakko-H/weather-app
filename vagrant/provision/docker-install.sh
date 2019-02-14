# Install required packages
yum install -y yum-utils device-mapper-persistent-data lvm2
# Setup Docker stable repository
yum-config-manager --add-repo "https://download.docker.com/linux/centos/docker-ce.repo"
# Install docker
yum install docker-ce -y
