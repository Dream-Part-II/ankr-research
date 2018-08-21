# Dockerized SGX-based application [WiP]

1. Install Docker
  ```
  $ sudo apt-get install docker.io
  ```
2. Add user to `docker` group
3. Validate Docker installation by running `hello-world` container:
  ```
  $ docker run hello-world
  ```
1. Install latest release of Docker Compose:
  ```
  $ sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
  ```
2. Install Docker Machine:
  ```
  $ base=https://github.com/docker/machine/releases/download/v0.14.0 &&
    curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
    sudo install /tmp/docker-machine /usr/local/bin/docker-machine
  ```
  * Allow all to execute `docker-compose` binary
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
4. Build Docker image:
  ```
  $ docker-compose build
  ```
5. Launch the Docker container:
  ```
  $ docker-compose up
  ```
6. Open a bash shell in the container:
  ```
  $ docker-compose exec sgx-based-app bash
  ```
7. Config the SGX-related environment variables:
  ```
  # source /opt/intel/sgxsdk/environment
  ```
8. Run the SGX-based app:
  ```
  # ./app
  ```
9. Exit the container bash shell:
  ```
  # exit
  ```
6. Remove the Docker container:
  ```
  $ docker-compose down
  ```
