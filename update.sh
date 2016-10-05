#!/usr/bin/env bash
#/bin/bash -xe

IP=52.59.228.227
# ssh -i maankoodaus3.pem ec2-user@54.93.42.47  "kill $(ps aux | grep '[n]ode server' | awk '{print $2}')"

scp -i maankoodaus3.pem ./* ec2-user@${IP}:/opt/mkk-front/

scp -r -i maankoodaus3.pem ./src ec2-user@${IP}:/opt/mkk-front/src/

# ssh -i maankoodaus3.pem ec2-user@54.93.42.47  "cd /opt/mkk | node server.js &"
