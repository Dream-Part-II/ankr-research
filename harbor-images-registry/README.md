# Using Harbor to setup private Docker images registry service
Docker has its own image registry service, which is Docker Hub. But for private docker images or if developers want to host docker images locally, proprietary docker image registry service could be built. Here we leverage on Harbor (https://goharbor.io/) to set up our own Docker Image Registry service.
## Purpose
1. Store private and confidential images
2. Classify images by stage tags, for example, develop, staging, or production