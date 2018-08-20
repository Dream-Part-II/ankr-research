# Dockerized SGX-based application

1. Install Docker
  ```
  $ sudo apt-get install docker.io
  ```
2. Add user to `docker` group
3. Validate Docker installation by running `hello-world` container:
  ```
  $ docker run hello-world
  ```
2. Install Docker Machine:
  ```
  $ base=https://github.com/docker/machine/releases/download/v0.14.0 &&
    curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
    sudo install /tmp/docker-machine /usr/local/bin/docker-machine
  ```
2. Install VirtualBox:
  ```
  $ sudo apt-get install virtualbox
  ```
1. Create Docker Machine w/:
  ```
  $ docker-machine \
      create \
      --driver virtualbox \
      --virtualbox-no-share \
      sgx-based-app
  ```
