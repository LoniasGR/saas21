# Team SAAS33 | SAAS NTUA 2021

## Instructions

1) Run the `createKeys.sh` script to create a private and a public key.
2) Follow the instruction inside the `docker` folder to build the containers.
3) We are running NGINX on bare metal as a reverse proxy, so a very simple configuration can be found in `nginx/microservices.lavdelas.me`. Using the `install_configuration.sh` the NGINX conf can be installed in the canonical location of NGINX, a.k.a `\etc\nginx`. In case you want to include NGINX as a container, there are a lot of tutorials on how to set up a container and use the provided configuration. *Don't forget to change the name of the host.*
