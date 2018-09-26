# Hello World Enclave Project
I created a "Hello World" style enclave project, in which the untrusted component makes an ECALL to the trusted execution environment. Upon successful completion of this process the following is logged out in the console:

Hello World
Successful communication with Enclave!

In to run this project make sure that the SGX SDK and driver are installed on your machine. To make and run, do the following in terminal:

1. make
2. ./app
