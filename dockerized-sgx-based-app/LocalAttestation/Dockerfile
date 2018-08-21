#FROM ubuntu:xenial
FROM tozd/sgx:ubuntu-xenial

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN make clean

#RUN bash -c "source /opt/intel/sgxsdk/environment"

#RUN echo $SGXSDK

RUN make SGX_MODE=SIM SGX_PRERELEASE=1 SGX_DEBUG=0

#CMD ["./app"]

#CMD ["echo", "Hello, world!"]

# ENTRYPOINT ["echo", "Hello, world"]

#ENTRYPOINT ["bash -c \"source /opt/intel/sgxsdk/environment./; ./app\""]
