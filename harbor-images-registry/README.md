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
![aws connect region](6)


## Create EC2 Instance on AWS

### 1. Create a Security Group and Key Pair for the EC2 Instance
Next we will set up prerequisites for launching an EC2 instance that can be accessed using SSH.
01). Create a new security group and add a rule that allows incoming traffic over port 22 for SSH.
```
$ aws ec2 create-security-group --group-name ankr-harbor --vpc-id vpc-xxxxxxxx --description "security group for development environment"
```
We will get the `GroupId` in `json` format: `{ "GroupId" : "sg-XXXXXXXX" }`. <br/>
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

## Setup Harbor On EC2
