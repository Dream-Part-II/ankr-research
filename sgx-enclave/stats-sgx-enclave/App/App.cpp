#include <stdio.h>
#include <iostream>
#include "Enclave_u.h"
#include "sgx_urts.h"
#include "sgx_utils/sgx_utils.h"

#define MAX_BUF_LEN 5

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
    float ptr;
    int buffer[MAX_BUF_LEN] = {2, 1, 4, 3, 5};
    for (int i = 0; i < MAX_BUF_LEN; i++) {
        sgx_status_t status = add_integer(global_eid, buffer[i]);

        if (status != SGX_SUCCESS) {
            std::cout << "SGX Failed" << std::endl;
        }
    }
    sgx_status_t status = calculate_average(global_eid, &ptr);
    if (status != SGX_SUCCESS) {
        std::cout << "SGX Failed" << std::endl;
    }
    printf("Average: %f\n", ptr);

    status = calculate_median(global_eid, &ptr);
    if (status != SGX_SUCCESS) {
        std::cout << "SGX Failed" << std::endl;
    }

    printf("Median: %f\n", ptr);

    status = calculate_std(global_eid, &ptr);
    if (status != SGX_SUCCESS) {
        std::cout << "SGX Failed" << std::endl;
    }

    printf("Standard Deviation: %f\n", ptr);

    return 0;
}