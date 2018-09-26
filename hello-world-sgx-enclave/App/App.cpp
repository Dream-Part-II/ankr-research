#include <stdio.h>
#include <iostream>
#include "Enclave_u.h"
#include "sgx_urts.h"
#include "sgx_utils/sgx_utils.h"

/* Global EID shared by multiple threads */
sgx_enclave_id_t global_eid = 0;

// OCall implementations
void ocall_print(const char* str) {
    printf("%s\n", str);
}

int main(int argc, char const *argv[]) {
    if (initialize_enclave(&global_eid, "enclave.token", "enclave.signed.so") < 0) {
        std::cout << "Fail to initialize enclave." << std::endl;
        return 1;
    }
    int ptr;
    sgx_status_t status = hello_world_enclave(global_eid, &ptr);

    if (status != SGX_SUCCESS) {
        std::cout << "SGX Failed" << std::endl;
    }

    if (ptr == 1) {
        std::cout << "Successful communication with Enclave!" << std::endl;
    } else {
        std::cout << "Unsuccessful communication with Enclave." << std::endl;
    }

    return 0;
}