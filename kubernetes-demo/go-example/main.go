/*
Copyright 2016 The Kubernetes Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Note: the example only works with the code within the same release/branch.
package main

import (
	"fmt"
	"time"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"strings"

	k8sapi "k8s.io/api/core/v1"
	batchv1 "k8s.io/api/batch/v1"
)

func main() {
	// creates the in-cluster config
	config, err := rest.InClusterConfig()
	if err != nil {
		fmt.Printf("Error obtaining configuration of cluster\n")
		panic(err.Error())
	}
	// creates the clientset
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		fmt.Printf("Error obtaining clientset\n")
		panic(err.Error())
	}

	// create jobClient
	jobsClient := clientset.BatchV1().Jobs("default")

	// create spec for hello-node job 
	job := &batchv1.Job{
	    ObjectMeta: metav1.ObjectMeta{
	        Name: "hellonode-job",
	    },
	    Spec: batchv1.JobSpec{
	        Template: k8sapi.PodTemplateSpec{
	            Spec: k8sapi.PodSpec{
	                Containers: []k8sapi.Container{
	                    {
	                        Name:  "hello-node",
	                        Image: "hello-node:v1",
	                    },
	                },
	                RestartPolicy: k8sapi.RestartPolicyNever,
	            },
	        },
	    },
	}

	// create job
	newJob, err := jobsClient.Create(job)
	if err != nil {
		fmt.Printf("Error creating job\n")
		panic(err.Error())
	}
	fmt.Println("New job name: ", newJob.Name)

	// monitor amount of time daemon has been monitoring
	iterations := 0

	// monitor status of pods running inside cluster
	for {
		fmt.Println("Iteration %d\n", iterations)
		pods, err := clientset.CoreV1().Pods("").List(metav1.ListOptions{})
		if err != nil {
			fmt.Printf("Error obtaining pods.\n")
			panic(err.Error())
		}

		// check each pod in cluster
		for _, pod := range pods.Items {
			fmt.Println(pod.Name, pod.Status)
			fmt.Println()

			// check if pod is running the hello-node job 
			if strings.HasPrefix(pod.Name, "hellonode-job") {
				fmt.Println("Found job!")

				// delete hello-node job after ~60 seconds
				if iterations == 6 {
					fmt.Println("About to delete job.")
					deletePolicy := metav1.DeletePropagationForeground
					if err := jobsClient.Delete("hellonode-job", &metav1.DeleteOptions{
						PropagationPolicy: &deletePolicy,
					}); err != nil {
						fmt.Println("Failed to delete job.")
						panic(err)
					}
					fmt.Println("Deleted job.")
				}

				// check if pod is completed 
				if pod.Status.Phase == "Succeeded" {
					fmt.Println("Job completed!")
				}
				fmt.Println()
			}
		}

		time.Sleep(10 * time.Second)
		iterations += 1
	}
}
