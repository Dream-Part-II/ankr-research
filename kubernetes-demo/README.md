# Programmatically interact with the Kubernetes cluster to run, monitor, and terminate applications 

October 25th, 2018:

Got a very basic model of an "daemon" application monitoring a docker image job. The daemon is a Golang program that is responsible for monitoring the execution state of the docker image through constant queries to the Kubernetes API for the amount of pods and status of pods running inside the Kubernetes cluster. Specifically, every 10 seconds it will print out the number of pods executing inside the node, the names of each of the pods, and the status of each pod (i.e. if it's currently running, when it was initialized, etc.) 

For the toy example of the docker image job clients send to the Kubernetes cluster, I utilized the Hello World example here: https://kubernetes.io/docs/tutorials/hello-minikube/ and slightly modified so that the program would terminate after 60 seconds. Doing so, we can simulate the completion of a job and terminate the pod whenever the job is completed. 