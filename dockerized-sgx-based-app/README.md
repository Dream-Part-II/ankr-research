# Dockerized SGX-based application [WiP]

This is a sample project demonstrating how to containerize an SGX-based application.

## Requirements

### Docker and Docker Compose

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

### Docker Machine

In order to run an SGX-based application in hardware mode in a virtualized environment, the virtualized environment must support the Intel SGX technology.

One can stil run SGX-based applications in a simulation mode in a virtualized environment.

1. Install Docker Machine:
  ```
  $ base=https://github.com/docker/machine/releases/download/v0.14.0 &&
    curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
    sudo install /tmp/docker-machine /usr/local/bin/docker-machine
  ```
  * Install VirtualBox:
    ```
    $ sudo apt-get install virtualbox
    ```
2. Create Docker Machine w/:
  ```
  $ docker-machine \
      create \
      --driver virtualbox \
      --virtualbox-no-share \
      sgx-based-app
  ```

## Build and run the SGX-based application

1. Build Docker image:
  ```
  $ docker-compose build
  ```
2. Launch the Docker container:
  ```
  $ docker-compose up
  ```
3. Remove the Docker container:
  ```
  $ docker-compose down
  ```

### Run the SGX-based application interactively

1. Open a bash shell in the container:
  ```
  $ docker-compose exec sgx-based-app bash
  ```
2. Run the SGX-based app:
  ```
  # ./entrypoint.sh
  ```
3. Exit the container bash shell:
  ```
  # exit
  ```
