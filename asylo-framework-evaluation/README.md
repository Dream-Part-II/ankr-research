# Review of Asylo framework for TEE development

Asylo (https://asylo.dev/) is a framework for enclave applications developed by Google folks.

Asylo aims to streamline development of applications on trusted executions environments (TEEs) such as Intel SGX and ARM TrustZone.

Forum at https://groups.google.com/forum/#!forum/asylo-users

## Getting started

To get started, follow the quickstart guide at https://asylo.dev/docs/guides/quickstart.html.

In particular, one can build and run an SGX enclave application using the Asylo Docker image as follows:

```shell
# Run interactively in a terminal and remove the container upon exiting
docker run -it --rm \
    # Create a volume for Bazel cache at a directory under /root on the host
    -v bazel-cache:/root/.cache/bazel \
    # Mount directory from host onto container directory
    -v "${MY_PROJECT}":/opt/my-project \
    # Set working directory inside container
    -w /opt/my-project \
    # Run latest image of Asylo framework
    gcr.io/asylo-framework/asylo \
    # Invoke bazel inside container to run the Bazel package quickstart configured as an enclave simulation and message as argument
    bazel run --config=enc-sim //quickstart -- --message="Asylo Rocks"
```

Alternatively, build the package (without running it) by using the `bazel build` command and not passing the `--message` argument.

Build and run other examples (i.e., Bazel packages) in the directory by setting the package and arguments thereof accordingly.

For instance, the following command within the `docker` command above:
```shell
bazel run --config=enc-sim //hello_world -- --names="Alice, Bob"
```
builds and runs the `hello_world` package passing a list of two names as the input argument.

Finally, build and run the examples (Bazel packages) in debug hardware mode by setting the proper Bazel configuration and linking to the SGX driver and AESM service on the host:

```shell
# Run interactively in a terminal and remove the container upon exiting
docker run -it --rm \
    # Link SGX driver from host to the container
    --device=/dev/isgx \
    # Mount the AESM socket from the host into the container
    -v /var/run/aesmd/aesm.socket:/var/run/aesmd/aesm.socket
    -v bazel-cache:/root/.cache/bazel \
    -v "${MY_PROJECT}":/opt/my-project \
    -w /opt/my-project \
    gcr.io/asylo-framework/asylo \
    # Select SGX hardware mode config
    bazel run --config=sgx //quickstart -- --message="Asylo Rocks"
```
## Discussion

### Pros

* high-level enclave abstraction model makes application development less cumbersome
  * shorter time-to-market
* supports SGX hardware release mode since v. 0.3.0 (https://github.com/google/asylo/releases/tag/v0.3.0)
* enforces security best practices for building and signing production-level enclave applications (https://asylo.dev/docs/guides/sgx_release_enclaves.html)
* supports Protobuf v. 2 for message formatting and serialization to/from enclave (and across networks) (https://asylo.dev/docs/guides/quickstart.html#enclave-interaction-model)
* supports gRPC-based client/server model (https://asylo.dev/docs/guides/grpc_server.html)
  * easy development of distributed enclave applications
* builds and runs application inside Docker container (link `isgx` module and `aesmd` service to run in HW mode) (https://asylo.dev/docs/guides/sgx_release_enclaves.html#step-5-launch-the-release-enclave)
  * easy deployment of enclave applications on physical and virtual servers (as long as they support Intel SGX)

### Cons
* No support for remote attestation as of 8/31/2018 according to https://groups.google.com/forum/#!topic/asylo-users/-0LoLbgS3kg
  * Can Asylo be side-stepped and remote attestation carried out directly?
* No support for Windows (https://github.com/google/asylo/blob/master/INSTALL.md)

### Other details
* uses Bazel (https://www.bazel.build/) to build applications


### Open questions

* Does it support debugging (incl. enclave)? How well is it supported?
* How flexible is it? Can the developer use low-level SGX APIs for specific operations not yet supported by Asylo such as remote attestation?
* Are gRPC inside enclaves TLS-terminated?
  * Secure gRPC model is going to be supported soon according to https://groups.google.com/forum/#!topic/asylo-users/-0LoLbgS3kg but it's not
* How to integrate enclave application w/ existing products like BOINC? gRPC-based APIs?
