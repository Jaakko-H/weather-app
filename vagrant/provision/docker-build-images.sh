# Build the docker images as user 'vagrant'
docker build -t weatherapp_backend /opt/backend
docker build -t weatherapp_frontend /opt/frontend
