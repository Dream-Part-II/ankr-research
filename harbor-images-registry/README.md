# Using Harbor to setup private Images registry On AWS

## Installing the AWS CLI
The primary distribution method for the AWS CLI on Linux, Windows, and macOS is pip. But Pip is not installed by default on Ubuntu 18.04.<br/>
**1. Install Pip for Python 3** <br/>
    01). Start by updating the package lsit:<br/>
    ```$ sudo apt update``` 
<br/>
    02). Install pip for Python 3: <br/>
    ```
    $ sudo apt install python3-pip
    ```
<br/>
    03). Verify the installation by checking the pip version:<br/>
    ```
    $ pip3 --version
    ```
<br/>

**2. Install AWS CLI**
Since we already have pip3 and a supported version of Python, now install the AWS CLI with the following command:
```
$ pip3 install awscli --upgrade --user
```
![awscli version]()






## Create EC2 Instance on AWS
 




## Setup Harbor On EC2
