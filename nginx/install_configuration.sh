#!/bin/bash

#####################################################
## SIMPLE INSTALATION SCRIPT FOR NGINX
## 
## Just run bash ./nginx/install_configuration.sh
## to get the current configuration working for nginx
#####################################################

declare -a FILES=("microservices.lavdelas.me" "saas.lavdelas.me" "soa.lavdelas.me")
NGINX_FOLDER=/etc/nginx

for FILE in "${FILES[@]}"; do 
    sudo cp ./nginx/${FILE} ${NGINX_FOLDER}/sites-available/

    if [[ ! -e  ${NGINX_FOLDER}/sites-enabled/${FILE} ]]; then
        sudo ln -s ${NGINX_FOLDER}/sites-available/${FILE} ${NGINX_FOLDER}/sites-enabled/${FILE}
    fi
done

sudo nginx -t
sudo systemctl restart nginx