FROM ubuntu:xenial-20180808

RUN uname --all

# Update package info
RUN apt-get update

# Install dependencies for Intel SGX PSW
RUN apt-get -y install \
      libssl-dev \
      libcurl4-openssl-dev \
      libprotobuf-dev

# Install dependencies for Intel SGX SDK
RUN apt-get -y install \
      build-essential \
      python

WORKDIR /root/docker-sgx

# Install iclsClient
RUN apt-get -y install \
      wget \
      alien

RUN wget http://registrationcenter-download.intel.com/akdlm/irc_nas/11414/iclsClient-1.45.449.12-1.x86_64.rpm

RUN alien --scripts iclsClient-1.45.449.12-1.x86_64.rpm

RUN dpkg -i iclsclient_1.45.449.12-2_amd64.deb

# Install dynamic application loader host interface

RUN apt-get -y install \
      git \
      cmake \
      pkg-config \
      uuid-dev \
      libxml2-dev \
      libsystemd-dev

RUN git clone https://github.com/intel/dynamic-application-loader-host-interface

WORKDIR /root/docker-sgx/dynamic-application-loader-host-interface

RUN cmake .
RUN make
RUN make install

RUN jhid -v

RUN systemctl enable jhi

# RUN systemctl status jhi

RUN which systemctl

# Install PSW
WORKDIR /root/docker-sgx/psw
RUN apt-get -y install kmod
RUN wget https://download.01.org/intel-sgx/linux-2.2/ubuntu64-server/sgx_linux_x64_psw_2.2.100.45311.bin
RUN chmod u+x sgx_linux_x64_psw_2.2.100.45311.bin
RUN ./sgx_linux_x64_psw_2.2.100.45311.bin
RUN ls -l /opt/intel/sgxpsw
# RUN systemctl status aesm

# Install SDK
WORKDIR /opt/intel
RUN wget https://download.01.org/intel-sgx/linux-2.2/ubuntu64-server/sgx_linux_x64_sdk_2.2.100.45311.bin
RUN chmod u+x sgx_linux_x64_sdk_2.2.100.45311.bin
RUN yes yes | ./sgx_linux_x64_sdk_2.2.100.45311.bin

# RUN bash -c "source /root/docker-sgx/sdk/sgxsdk/environment; echo $SGX_SDK"
# RUN bash -c "echo $SGX_SDK"

CMD ["ls", "-lR", "/root/docker-sgx/sdk"]
