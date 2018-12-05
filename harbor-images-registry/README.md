# Using Harbor to setup private Docker images registry service
Docker has its own image registry service, which is Docker Hub. But for private docker images or if developers want to host docker images locally, proprietary docker image registry service could be built. Here we leverage on Harbor (https://goharbor.io/) to set up our own Docker Image Registry service.
## Purposes
1. Store private and confidential images
2. Classify images by stage tags, for example, develop, staging, or production
## Prerequisites for the target host
This experiment was on Ubuntu 18.04. Installed:
1. Docker version 18.09.0
2. Docker-compose version 1.23.2
3. If you have error when try to install Harbor because _/usr/bin/pyton not found_, this error could be solved by add symlink: `Python3: (symlink python3 path to /usr/bin/python)`

More Info about how to install Harbor please check here: https://github.com/goharbor/harbor/blob/master/docs/installation_guide.md

## Download Harbor online/offline installer
1. Download online installer v1.6.2
2. Unzip installer: 
```
tar xvf harbor-online-installer-v1.6.2.tgz
```  

## Configuring Harbor with HTTPS Access
Harbor use HTTP by default to serve requests, but we set up HTTPS here for security. Harbor has an Nginx instance as a reverse proxy for all services, we can use the prepare script to configure Nginx to enable https.
We are in a test environment, so we choose to use a self-signed certificate here. The followings will show how to create our own CA, and use the CA to sign a server certificate and a client certificate.<br/>

Before start setting up Harbor, I want to show how to get my host IP (**192.168.0.107**). The host IP will be used during `self-signed certificate` and be used as `hostname` when configurate `harbor.cfg` later. I use Ubuntu 18.04, so use this command on terminal:
```
$ ip address
----------------------------------------------------------
inet 192.168.0.107/24 brd 192.168.0.255 scope global dynamic noprefixroute wlp2s0

```

### Getting Certificate Authority
1. Will generate RSA private key
```
openssl genrsa -out ca.key 4096
``` 
2. 
```
openssl req -x509 -new -nodes -sha512 -days 365 \
-key ca.key 
-out ca.crt
``` 
You are about to be asked to enter info that will be incorporated into your certificate request.<br/> **Notes:** Have to fill `Common Name(CN)` with your domain or IP. <br/>
After this, you will have `ca.crt` and `ca.key` files.

### Getting Server Certificate
1. Create our own Private Key
```
openssl genrsa -out 192.168.0.107.key 4096
``` 

2. Generate a certificate signing request.
```
openssl req -x509 -new -nodes -sha512 -days 365 \
-key 192.168.0.107.key \ 
-out 192.168.0.107.csr
```  
You are about to be asked to enter info that will be incorporated into your certificate request. **Notes:** Have to fill `Common Name(CN)` with your domain or IP. <br/>
After this, you will add two more files: `192.168.0.107.csr` and `192.168.0.107.key` files.

### Generate the certificate of your registry host:
1. Whether you're using FQDN like **yourdomain.com** or **IP** to connect your registry host, run the command below to generate the certificate of your registry host which comply with Subject Alternative Name and x509 v3 extension requirement. Since we use IP here, edit `v3.ext` like below: <br/>

v3.ext
```
cat > v3.ext <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth 
subjectAltName = IP:192.168.0.107

EOF
``` 

2. Create signature
```
openssl x509 -req -sha512 -days 3650 \
    -extfile v3.ext \
    -CA ca.crt -CAkey ca.key -CAcreateserial \
    -in 192.168.0.107.csr \
    -out 192.168.0.107.crt
``` 
_Note:_ If you have errors that direct to re-configurate v3.ext, then modify v3.ext and redo step `2. Create signature`, and copy the new signature and key to both Harbor and Docker (refer: following steps)  

### Modify Configuration for Harbor
**1). Configure Server Certificate and Key for Harbor** <br/>
After obtaining the **192.168.0.107.crt** and **192.168.0.107.key** files, copy them into directory such as `/data/cert/` under `/root`:
```
sudo mkdir /data/cert/
sudo cp 192.168.0.107.crt /data/cert/
sudo cp 192.168.0.107.key /data/cert/
```
**2). Configure Server Certificate, Key and CA for Docker** <br/>
2.1) The Docker daemon interprets `.crt` files as CA certificates and `.cert` files as client certificates. Convert server `192.168.0.107.crt` to `192.168.0.107.cert`:
```
openssl x509 -inform PEM -in 192.168.0.107.crt -out 192.168.0.107.cert
```
2.2) Deploy `192.168.0.107.cert`, `192.168.0.107.key`, and `ca.crt` for Docker:
```
sudo mkdir /etc/docker/certs.d/192.168.0.107/
sudo cp 192.168.0.107.cert /etc/docker/certs.d/192.168.0.107/
sudo cp 192.168.0.107.key /etc/docker/certs.d/192.168.0.107/
sudo cp ca.crt /etc/docker/certs.d/192.168.0.107/
```

**3). Configure Harbor** <br/>
3.1) Modify `harbor.cfg`, update the `hostname` (if necessary) and the protocol; also update the attributes `ssl_cert` and `ssl_cert_key`:
```
#set hostname
hostname = 192.168.0.107
#set ui_url_protocol
ui_url_protocol = https 
......
#The path of cert and key files for nginx, they are applied only the protocol is set to https 
ssl_cert = /data/cert/192.168.0.107.crt
ssl_cert_key = /data/cert/192.168.0.107.key
```
**4). Install Harbor** <br/>
4.1) Run `install.sh`
```
sudo ./install.sh
```
This step will check Harbor running environment and install Harbor from beginning <br/>

4.2) if your Harbor is running, and you re-configurate some thing, you should run `prepare script` to generate configuration files for Harbor:
```
sudo ./prepare
```
4.3) After `prepare script`, should stop and remove the existing instance.
```
docker-compose down -v
```
4.4) Finally, restart Harbor:
```
docker-compose up -d
```
4.5) Open browser and type: https://192.168.0.107, will display the `Harbor Admin Interface`. Using below default info to login (you could modify them in `harbor.cfg`):
```
username: admin
pw: Harbor12345
```

### Issues when try to connect to Harbor Interface
After setting up HTTPS for Harbor, met a issue when try to display Harbor Interface.

1. Browser still shows the warning regarding Certificate Authority (CA) unknown for security reason even though we signed certificates by self-signed CA and deploy the CA to the place mentioned above. It is because self-signed CA essentially is not a trusted third-party CA. You can import the CA to the browser on your own to solve the warning.

## Log into Harbor
```
docker login 192.168.0.107
username: admin
password: Harbor12345
```
Successfully Login with warning:
```
WARNING! Your password will be stored unencrypted in /home/xiaoping/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

```
