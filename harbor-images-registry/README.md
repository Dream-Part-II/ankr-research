# Using Harbor to setup private Images registry On AWS

## Installing the AWS CLI
The primary distribution method for the AWS CLI on Linux, Windows, and macOS is `pip`. But Pip is not installed by default on Ubuntu 18.04.<br/>
**1. Install Pip for Python 3** <br/>
    01). Start by updating the package lsit:<br/>
    `$ sudo apt update` 
<br/>
    02). Install pip for Python 3: <br/>
    `$ sudo apt install python3-pip`
<br/>
    03). Verify the installation by checking the pip version:<br/>
    `$ pip3 --version`
<br/>

**2. Install AWS CLI** <br/>
    01). Since we already have pip3 and a supported version of Python, now install the AWS CLI with the following command:<br/>
    `$ sudo pip3 install --upgrade awscli`
<br/>
    02). Check `aws` version:<br/>
    `$ aws --version `
    <br/>
    `aws-cli/1.16.72 Python/3.6.7 Linux/4.15.0-42-generic botocore/1.12.62`
<br/>

**3. Uninstall AWS CLI**
Run the following command to uninstall:
```
$ pip3 uninstall awscli
```

## Configure the AWS CLI
**1. Configure CLI** <br/>
01). Run `aws configure` at the command line to set up your credentials and settings:<br/>
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
 




## Setup Harbor On EC2
