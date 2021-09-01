# Team SAAS33 | SAAS NTUA 2021

## Instructions

1) Run the `createKeys.sh` script to create a private and a public key.
2) Inside the `scripts` folder, there is a simple bash script for spinning up the microservices containers. You can run it with `bash microservices -flag`, where the flags are 
* `-d` bring all the containers down,
* `-b` build the containers,
* `-u` spin up the containers,
* `-l` see the logs of the containers.
4) We are running NGINX on bare metal as a reverse proxy, so a very simple configuration can be found in `nginx/microservices.lavdelas.me` and `nginx/soa.lavdelas.me`. Using the `install_configuration.sh` the NGINX conf can be installed in the canonical location of NGINX, a.k.a `\etc\nginx`. In case you want to include NGINX as a container, there are a lot of tutorials on how to set up a container and use the provided configuration. *Don't forget to change the name of the host.*
