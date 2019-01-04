#include <stdio.h>
#include <string.h>
#include "Enclave_t.h"

int hello_world_enclave() {
	ocall_print("Hello World");
	return 1;
}