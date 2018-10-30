# Programmatically interact with the Kubernetes cluster to run, monitor, and terminate applications 

October 25th, 2018:

Got a basic model of an daemon application monitoring a docker image job. The daemon is a Golang program that is responsible for monitoring the execution state of the docker image through constant queries to the Kubernetes API for the amount of pods and status of pods running inside the Kubernetes cluster. Specifically, every 10 seconds it will print out the number of pods executing inside the node, the names of each of the pods, and the status of each pod (i.e. if it's currently running, when it was initialized, etc.) I essentially hardcoded this application to run a job "hello-node", which is a simple node application which displays the message "Hello world", and monitor the execution status of the pod, printing out the status of the pod in particular, and then terminating the job after 60 seconds has passed. 

For the toy example of the docker image job clients send to the Kubernetes cluster, I utilized the Hello World example here: https://kubernetes.io/docs/tutorials/hello-minikube/

To set up the environment corresponding to this example, we must first follow the instructions listed in the hello-minikube tutorial listed above. Depending on the operating system, the steps may differ slightly, but we need to install the following dependencies:
Docker, kubernetes-cli, minikube, the go-client for Kubernetes, and one of the vm-drivers: (I used xhyve, but hyper-kit seems to be preferred).

Afterwards, we can start to set up our environment. First, ensure that Docker is running. Then, to start up the minikube, run the command:

```
$ minikube start --vm-driver=(name of driver you installed)
```

Sometimes if this command hangs, we may have to delete the config file from a previous session. Run these commands to do so:

```
$ minikube delete
$ rm -rf ~/.minikube
```

Then we can create docker images for the hello-node and Kubernetes daemon application. First, navigate into the hellonode directory inside the kubernetes-demo directory. Run the command:
```
$ eval $(minikube docker-env)
```

Do this for each terminal window you're planning to create Docker images for Minikube to ensure that the docker image created will be inside the minikube cluster, then run:
```
$ docker build -t hello-node:v1 .
```

To check if the docker image is inside the minikube, run the command:
```
$ minikube ssh docker images 
```

Afterwards, navigate to the go-example directory. Then run the command:
```
$ GOOS=linux go build -o ./app .
```

To build a binary file for the go daemon application. Then run the command:
```
$ docker build -t in-cluster:v1 .
```

Once we have both docker images inside the minikube, we can start running the daemon application. To do so, run the command:

```
$ kubectl run --rm -i demo --image=in-cluster:v1 --image-pull-policy=Never
```

This will create a deployment for the go-application, which essentially is a persistent application, which will create a job for the hellonode program. We can run the command:
```
$ kubectl get jobs
```

before a minute passes and we can confirm that a job is running. After a minute passes, we can run the command again
```
$ kubectl get jobs
```

and there should be no jobs listed. With slight modification to the program, we can also delete the pod the job was running in, restart the job on failure exit code, etc. 

To delete the deployment, run the command:

```
$ kubectl delete deployment demo
```

To remove a particular image, run the command: 

```
$ docker rmi (name_of_image):v1 -f
```

To shut down Minikube and delete the local vm, run:

```
$ minikube stop
$ minikube delete 
```





