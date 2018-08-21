#FROM ubuntu:xenial
FROM tozd/sgx:ubuntu-xenial

COPY . /usr/src/app
WORKDIR /usr/src/app

# Clean up the environment
RUN make clean

# Build SGX-based app in pre-release, simulation mode
#RUN make SGX_MODE=SIM SGX_PRERELEASE=1 SGX_DEBUG=0

# Build SGX-based app in pre-release, hardware mode
RUN make SGX_PRERELEASE=1 SGX_DEBUG=0

# Run the SGX-based application
#ENTRYPOINT ["bash", "./entrypoint.sh"]
