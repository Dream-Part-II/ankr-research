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
	// "os"

	// "k8s.io/apimachinery/pkg/api/errors"
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

	jobsClient := clientset.BatchV1().Jobs("default")

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

	newJob, err := jobsClient.Create(job)
	if err != nil {
		fmt.Printf("Error creating job\n")
		panic(err.Error())
	}
	fmt.Println("New job name: ", newJob.Name)

	iterations := 0

	for {
		fmt.Println("Iteration %d\n", iterations)
		pods, err := clientset.CoreV1().Pods("").List(metav1.ListOptions{})
		if err != nil {
			fmt.Printf("Error obtaining pods.\n")
			panic(err.Error())
		}
		// fmt.Println("There are %d pods in the cluster\n", len(pods.Items))

		for _, pod := range pods.Items {
			// fmt.Println(pod.Name)
			fmt.Println(pod.Name, pod.Status)
			fmt.Println()

			if strings.HasPrefix(pod.Name, "hellonode-job") {
				fmt.Println("Found job!")
				// fmt.Println(pod.Status.Phase)

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

				if pod.Status.Phase == "Succeeded" {
					fmt.Println("Job completed!")
					// os.Exit(0)
				}
				fmt.Println()
			}
		}

		// Examples for error handling:
		// - Use helper functions like e.g. errors.IsNotFound()
		// - And/or cast to StatusError and use its properties like e.g. ErrStatus.Message
		// _, err = clientset.CoreV1().Pods("default").Get("hello-node", metav1.GetOptions{})
		// if errors.IsNotFound(err) {
		// 	fmt.Printf("Pod not found\n")
		// } else if statusError, isStatus := err.(*errors.StatusError); isStatus {
		// 	fmt.Printf("Error getting pod %v\n", statusError.ErrStatus.Message)
		// } else if err != nil {
		// 	fmt.Printf("Yikes, panic 2\n")
		// 	panic(err.Error())
		// } else {
		// 	fmt.Printf("Found pod\n")
		// }

		time.Sleep(10 * time.Second)
		iterations += 1
	}
}