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

## Configuring Harbor with HTTPS Access
Harbor use HTTP by default to serve requests, but we set up HTTPS here for security. Harbor has an Nginx instance as a reverse proxy for all services, we can use the prepare script to configure Nginx to enable https.
We are in a test environment, so we choose to use a self-signed certificate here. The followings will show how to create our own CA, and use the CA to sign a server certificate and a client certificate

### Getting Certificate Authority
1. `sudo openssl genrsa -out ca.key 4096` Will generate RSA private key
2. `sudo openssl req -x509 -new -nodes -sha512 -days 365 -key ca.key -out ca.crt` You are about to be asked to enter info that will be incorporated into your certificate request. **Notes:** Have to fill `Common Name (CN)` with your domain or IP.
### Getting Server Certificate
1. `sudo openssl genrsa -out 192.168.1.10.key 4096` Create our own Private Key
2. `sudo openssl req -x509 -new -nodes -sha512 -days 365 -key 192.168.1.10.key -out 192.168.1.10.crt` Generate a certificate signing request. You are about to be asked to enter info that will be incorporated into your certificate request. **Notes:** Have to fill `Common Name (CN)` with your domain or IP.
### Generate the certificate of your registry host:
1. Whether you're using FQDN like **yourdomain.com** or **IP** to connect your registry host, run the command below to generate the certificate of your registry host which comply with Subject Alternative Name and x509 v3 extension requirement: <br/>

v3.ext
```
cat > v3.ext <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth 
subjectAltName = @alt_names

[alt_names]
DNS.3=192.168.1.10
EOFcat > v3.ext <<-EOF
authorityKeyIdentifier=keyid, issuer
basic
``` 

2. 
```
openssl x509 -req -sha512 -days 3650 \
    -extfile v3.ext \
    -CA ca.crt -CAkey ca.key -CAcreateserial \
    -in 192.168.1.10.csr \
    -out 192.168.1.10.crt
``` 
### Modify Configuration for Harbor
**1). Configure Server Certificate and Key for Harbor** <br/>
After obtaining the **192.168.1.10.crt** and **192.168.1.10.key** files, copy them into directory such as /data/cert/: <br/>
```
sudo mkdir /data/cert/
sudo cp 192.168.1.10.crt /data/cert/
sudo cp 192.168.1.10.key /data/cert/
```
**2). Configure Server Certificate, Key and CA for Docker** <br/>
2.1) The Docker daemon interprets `.crt` files as CA certificates and `.cert` files as client certificates. Convert server `192.168.1.10.crt` to `192.168.1.10.cert`:
```
sudo openssl x509 -inform PEM -in 192.168.1.10.crt -out 192.168.1.10.cert
```
2.2) Deploy `192.168.1.10.cert`, `192.168.1.10.key`, and `ca.crt` for Docker:
```
sudo mkdir /etc/docker/certs.d/192.168.1.10/
sudo cp 192.168.1.10.cert /etc/docker/certs.d/192.168.1.10/
sudo cp 192.168.1.10.key /etc/docker/certs.d/yourdomain.com/
sudo cp ca.crt /etc/docker/certs.d/192.168.1.10/
```
**3). Configure Harbor** <br/>
3.1) Modify `harbor.cfg`, update the `hostname` (if necessary) and the protocol; also update the attributes `ssl_cert` and `ssl_cert_key`:
```
#set hostname
hostname = 192.168.1.10
#set ui_url_protocol
ui_url_protocol = https 
......
#The path of cert and key files for nginx, they are applied only the protocol is set to https 
ssl_cert = /data/cert/192.168.1.10.crt
ssl_cert_key = /data/cert/192.168.1.10.key
```
3.2) Generate configuration files for Harbor:
```
sudo ./prepare
```
3.3) Since my Harbor is running, should stop and remove the existing instance.
```
sudo docker-compose down -v
```
3.4) Finally, restart Harbor:
```
sudo docker-compose up -d
```

