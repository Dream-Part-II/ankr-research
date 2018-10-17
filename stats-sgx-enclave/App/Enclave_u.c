#include "Enclave_u.h"
#include <errno.h>

typedef struct ms_calculate_average_t {
	float ms_retval;
} ms_calculate_average_t;

typedef struct ms_add_integer_t {
	int ms_num;
} ms_add_integer_t;

typedef struct ms_calculate_median_t {
	float ms_retval;
} ms_calculate_median_t;

typedef struct ms_calculate_std_t {
	float ms_retval;
} ms_calculate_std_t;

typedef struct ms_ocall_print_t {
	char* ms_str;
} ms_ocall_print_t;

static sgx_status_t SGX_CDECL Enclave_ocall_print(void* pms)
{
	ms_ocall_print_t* ms = SGX_CAST(ms_ocall_print_t*, pms);
	ocall_print((const char*)ms->ms_str);

	return SGX_SUCCESS;
}

static const struct {
	size_t nr_ocall;
	void * table[1];
} ocall_table_Enclave = {
	1,
	{
		(void*)Enclave_ocall_print,
	}
};
sgx_status_t calculate_average(sgx_enclave_id_t eid, float* retval)
{
	sgx_status_t status;
	ms_calculate_average_t ms;
	status = sgx_ecall(eid, 0, &ocall_table_Enclave, &ms);
	if (status == SGX_SUCCESS && retval) *retval = ms.ms_retval;
	return status;
}

sgx_status_t add_integer(sgx_enclave_id_t eid, int num)
{
	sgx_status_t status;
	ms_add_integer_t ms;
	ms.ms_num = num;
	status = sgx_ecall(eid, 1, &ocall_table_Enclave, &ms);
	return status;
}

sgx_status_t calculate_median(sgx_enclave_id_t eid, float* retval)
{
	sgx_status_t status;
	ms_calculate_median_t ms;
	status = sgx_ecall(eid, 2, &ocall_table_Enclave, &ms);
	if (status == SGX_SUCCESS && retval) *retval = ms.ms_retval;
	return status;
}

sgx_status_t calculate_std(sgx_enclave_id_t eid, float* retval)
{
	sgx_status_t status;
	ms_calculate_std_t ms;
	status = sgx_ecall(eid, 3, &ocall_table_Enclave, &ms);
	if (status == SGX_SUCCESS && retval) *retval = ms.ms_retval;
	return status;
}

