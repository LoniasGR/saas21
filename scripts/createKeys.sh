#!/bin/bash

# Create the key pairs
node generateKeypair.js

# Copy the keys to the services 
cp id_rsa_priv.pem ./authentication/
cp id_rsa_pub.pem ./authentication/

cp id_rsa_pub.pem ./user-profile/
