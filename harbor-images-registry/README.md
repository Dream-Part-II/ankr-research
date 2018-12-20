# Using Harbor to setup private Images registry On AWS

## Installing the AWS CLI
The primary distribution method for the AWS CLI on Linux, Windows, and macOS is `pip`. But Pip is not installed by default on Ubuntu 18.04.

### 1. Install Pip for Python 3 
01). Start by updating the package lsit: 
```
$ sudo apt update
``` 

02). Install pip for Python 3: <br/>
```
$ sudo apt install python3-pip
```

03). Verify the installation by checking the pip version:<br/>
```
$ pip3 --version
```

### 2. Install AWS CLI
01). Since we already have pip3 and a supported version of Python, now install the AWS CLI with the following command:
```
$ sudo pip3 install --upgrade awscli
```

02). Check `aws` version:
```
$ aws --version
```

```
aws-cli/1.16.72 Python/3.6.7 Linux/4.15.0-42-generic botocore/1.12.62
```

### 3. Uninstall AWS CLI
Run the following command to uninstall:
```
$ pip3 uninstall awscli
```


## Configure the AWS CLI

### 1. Configure CLI
01). Run `aws configure` at the command line to set up your credentials and settings:
```
$ aws configure 
AWS Access Key ID [None]:
AWS Secret Access Key [None]:
Default region name [None]: us-west-2
Default output format [None]:
```

* **AWS Access Key ID and AWS Secret Access Key** - These are your account credentials.
* **Default region name** - This is the name of the region you want to make calls against by default.
* **Default output format** - Could be json(default), text, or table.

02). Run a command to verify that your credentials are configured correctly and that you can connect to AWS.
```
$ aws ec2 describe-regions --output table
```
![aws connect region](https://github.com/Ankr-network/tee-research-and-development/blob/feature/swdev-92-harbor-images-registry/harbor-images-registry/png/6%20aws%20region%20table.png)


## Create EC2 Instance on AWS

### 1. Create a Security Group and Key Pair for the EC2 Instance
Next we will set up prerequisites for launching an EC2 instance that can be accessed using SSH.
01). Create a new security group and add a rule that allows incoming traffic over port 22 for SSH.
```
$ aws ec2 create-security-group --group-name ankr-harbor --vpc-id vpc-xxxxxxxx --description "security group for development environment"
```
We will get the `GroupId` in `json` format: `{ "GroupId" : "sg-XXXXXXXX" }`. Make note of `GroupId`, will use later. <br/>
_Note_: Used default VPC (Virtual Private Cloud) for the region, so omit the `--vpc-id` parameter here.
```
$ aws ec2 authorize-security-group-ingress --group-name ankr-harbor --protocol tcp --port 22 --cidr 0.0.0.0/0
```
_Note_: Use `0.0.0.0/0 CIDR` for test.

02). Next, create a key pair, which allows us to connect to the EC2 instance. The following command saves the contents of the key to a file named `devenv-key.pem`.
```
$ aws ec2 create-key-pair --key-name devenv-key --query 'KeyMaterial' --output text > devenv-key.pem
```

03). On Linux, we need to change the file mode to restrain the access.
```
chmod 400 devenv-key.pem
```

### 2. Launch and Connect to the instance
01). Run the following command, using the security group ID which we created in the previous step. Using `Amazon EC2 console` to find the AMI (Amazon Machine Image) to bootstrap the instance. Using default subnet here, so omit the `--subnet-id` parameter. This command will return the Instance ID(s). Hardware requirments for Harbor `minimal 2 CPU, minimal 4GB Mem, minimal 40GB Disk`, so choose instance type `t2.medium`.
```
$ aws ec2 run-instances --image-id ami-0f05ad41860678734 \
                        --subnet-id subnet-xxxxxxxx \
                        --security-group-ids sg-XXXXXXXX \
                        --count 1 \
                        --instance-type t2.medium \
                        --key-name devenv-key \
                        --query "Instances[0].InstanceId"
-------------------------------------------------------------------
"i-0787e4282810ef9cf"
```
02). The instance takes a few moments to launch. After the instance is up and running, we will retrieve the public IP of the instance which will be used later for connecting to the instance.
```
$ aws ec2 describe-instances --instance-ids  i-0787e4282810ef9cf --query "Reservations[0].Instances[0].PublicIpAddress
--------------------------------------------------------------------
54.188.253.77
```
03). To connect to the instance, use the public IP and private key `.pem` file:
```
ssh -i devenv-key.pem ubuntu@54.188.253.77
```
Get the following error/warning message:
```
The authenticity of host '54.188.253.77 (54.188.253.77)' can't be established.
ECDSA key fingerprint is SHA256:ulJkxUDLUDSrjOQBVQIRrVFdO0a0tCtw+H5uyGZr9S0.
Are you sure you want to continue connecting (yes/no)?
Yes

Warning: Permanently added '54.188.253.77' (ECDSA) to the list of known hosts.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for 'devenv-key.pem' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "devenv-key.pem": bad permissions
ubuntu@54.188.253.77: Permission denied (publickey).

```
The _Permission denied(publickey)_ error is because `Permission on the key must be restricted to the ownder`.
```
$ ls -l devenv-key.pem
---------------------------
-rw-r--r-- 1 user user 1671 Dec  8 15:13 devenv-key.pem

$ chmod 600 devenv-key.pem
```
04). Connect to the server again
```
$ ssh -i devenv-key.pem ubuntu@54.188.253.77
------------------------------------------------------
Welcome to Ubuntu 18.04.1 LTS (GNU/Linux 4.15.0-1027-aws x86_64)
```


## Setup Harbor On EC2

### Instruction of how to Install Docker
https://docs.docker.com/v17.09/engine/installation/linux/docker-ce/ubuntu/#install-docker-ce

### Instruction of how to Install Docker-compose
https://docs.docker.com/compose/install/#install-compose

### Instruction of how to Install Harbor v1.7.0-rc1
01). Install and Use WGET
```
$ sudo apt-get update
$ sudo apt-get install wget
$ wget --version
$ wget https://storage.googleapis.com/harbor-releases/release-1.7.0/harbor-offline-installer-v1.7.0-rc2.tgz

```
02). Unzip Harbor Installer
```
$ tar xvf harbor-offline-installer-v1.7.0-rc2.tgz
```
03). Navigate to `harbor` directory, accept default `harbor.cfg` configurations. Finally, run the following command to install Harbor:
```
sudo ./install.sh
```
04). Use AWS Route53 set up Domain Name: `harbor.ankr.network`
05). Add AWS Application Load Balancer. For `http 80` requests, will redirect to `https://#{host}:443/#{path}?#{query}` with `Status code: HTTP_301`. For `https 443` requests, will forward to EC2 Harbor Instance.

### Log into Harbor & push/pull images
01). Browser Admin UI test with `https://harbor.ankr.network`
![ui login](https://github.com/Ankr-network/tee-research-and-development/blob/feature/swdev-92-harbor-images-registry/harbor-images-registry/png/7%20UI%20login.png)

02).Log into Harbor server through Docker-CLI `docker login harbor.ankr.network` by using default `username: admin password: Harbor12345`, get the following error:
![terminal Harbor login error](https://github.com/Ankr-network/tee-research-and-development/blob/feature/swdev-92-harbor-images-registry/harbor-images-registry/png/8%20fail%20login.png)

To fix this issue, we should modify `prepare` script by changing `public_url` option from `public_url = "https" + "://" + hostname` to `public_url = protocol + "://" + hostname`
![changing public_url option](https://github.com/Ankr-network/tee-research-and-development/blob/feature/swdev-92-harbor-images-registry/harbor-images-registry/png/9%20publicurl.png)

03). `docker login harbor.ankr.network` Login again with `username: admin` and `password: Harbor12345`


## Set Harbor's storage backend on AWS S3
By default, Harbor's storage backend is local filesystem. Here we will set AWS S3 as the storage.

### Configure s3 related parameters on harbor.cfg
01). Create a new _bucket_ on S3, named as `ankr-harbor-test`, region name as `US West (Oregon)`.
02). Will change Harbor's configuration, first stop existing Harbor instance
```
sudo docker-compose down -v
```
03). Configure _harbor.cfg_
```
vim harbor.cfg
--------------------------------------
registry_storage_provider_name = s3
registry_storage_provider_config = accesskey: XXXXXXXXX, secretkey: XXXXXXXXXX, region: us-west-2, bucket: ankr-harbor-test
```
**Notes**:
a). Key-value pairs for s3 configuration, refer to: https://docs.docker.com/registry/configuration/#list-of-configuration-options
b). Check AWS _region_ for corresponding _region name_, please click: https://docs.aws.amazon.com/general/latest/gr/rande.html
c). accesskey: AWS accesskey
d). secretkey: AWS secretkey
04). Run _prepare_ script to populate the configuration:
```
sudo ./prepar
```
05). Re-create and start Harbor's instance:
```
sudo docker-compose up -d
```

### Test the configuration
01). Docker client login harbor service
```
$ docker login harbor.ankr.network
username: admin
password: Harbor12345
```
02). Tag images
```
docker tag hello-world:latest harbor.ankr.network/https/hello-world:s3
```
03). Push images to harbor registry
```
docker push harbor.ankr.network/https/hello-world:s3
```
04). Log into AWS and check S3 bucket _ankr-harbor-test_. The directory named **docker** is in _ankr-harbor-test_ bucket
![s3 docker directory] (10)

Look into the **docker** directory, could see **s3** tag


![s3 tag image] (11)
05). Pull the image from s3:
```
docker pull harbor.ankr.network/https/hello-world:s3
```
![pull s3 tag file] (12)



