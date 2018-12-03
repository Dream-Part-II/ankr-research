# Using Harbor to setup private Docker images registry service
Docker has its own image registry service, which is Docker Hub. But for private docker images or if developers want to host docker images locally, proprietary docker image registry service could be built. Here we leverage on Harbor (https://goharbor.io/) to set up our own Docker Image Registry service.
## Purposes
1. Store private and confidential images
2. Classify images by stage tags, for example, develop, staging, or production
## Prerequisites for the target host
Dual boot Ubuntu 18.01 on Windows 10 system and use Ubuntu as my OS. Installed:
1. Docker version 18.09.0
2. Docker-compose version 1.19.0
3. Python3: (symlink python3 path to /usr/bin/python)

More Info about how to install Harbor please check here: https://github.com/goharbor/harbor/blob/master/docs/installation_guide.md

## Download Harbor online/offline installer
1. Download online installer v1.6.2
2. Unzip installer: tar xvf harbor-online-installer-v1.6.2.tgz

## Configuring Harbor with HTTP Access and Install Harbor
By default Harbor use HTTP to server registry requests. After unzip installer, there is a harbor folder under the same directory. 
1. Navigate to harbor folder. `cd harbor`
2. Configurate harbor.cfg. `vim harbor.cfg`
3. Here only config `hostname` parameter. `hostname = 192.168.1.10`
4. Install Harbor. `sudo ./install.sh`  

 

