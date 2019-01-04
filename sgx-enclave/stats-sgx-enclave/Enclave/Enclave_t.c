#include "Enclave_t.h"

#include "sgx_trts.h" /* for sgx_ocalloc, sgx_is_outside_enclave */
#include "sgx_lfence.h" /* for sgx_lfence */

#include <errno.h>
#include <string.h> /* for memcpy etc */
#include <stdlib.h> /* for malloc/free etc */

#define CHECK_REF_POINTER(ptr, siz) do {	\
	if (!(ptr) || ! sgx_is_outside_enclave((ptr), (siz)))	\
		return SGX_ERROR_INVALID_PARAMETER;\
} while (0)

#define CHECK_UNIQUE_POINTER(ptr, siz) do {	\
	if ((ptr) && ! sgx_is_outside_enclave((ptr), (siz)))	\
		return SGX_ERROR_INVALID_PARAMETER;\
} while (0)


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

static sgx_status_t SGX_CDECL sgx_calculate_average(void* pms)
{
	CHECK_REF_POINTER(pms, sizeof(ms_calculate_average_t));
	//
	// fence after pointer checks
	//
	sgx_lfence();
	ms_calculate_average_t* ms = SGX_CAST(ms_calculate_average_t*, pms);
	sgx_status_t status = SGX_SUCCESS;



	ms->ms_retval = calculate_average();


	return status;
}

static sgx_status_t SGX_CDECL sgx_add_integer(void* pms)
{
	CHECK_REF_POINTER(pms, sizeof(ms_add_integer_t));
	//
	// fence after pointer checks
	//
	sgx_lfence();
	ms_add_integer_t* ms = SGX_CAST(ms_add_integer_t*, pms);
	sgx_status_t status = SGX_SUCCESS;



	add_integer(ms->ms_num);


	return status;
}

static sgx_status_t SGX_CDECL sgx_calculate_median(void* pms)
{
	CHECK_REF_POINTER(pms, sizeof(ms_calculate_median_t));
	//
	// fence after pointer checks
	//
	sgx_lfence();
	ms_calculate_median_t* ms = SGX_CAST(ms_calculate_median_t*, pms);
	sgx_status_t status = SGX_SUCCESS;



	ms->ms_retval = calculate_median();


	return status;
}

static sgx_status_t SGX_CDECL sgx_calculate_std(void* pms)
{
	CHECK_REF_POINTER(pms, sizeof(ms_calculate_std_t));
	//
	// fence after pointer checks
	//
	sgx_lfence();
	ms_calculate_std_t* ms = SGX_CAST(ms_calculate_std_t*, pms);
	sgx_status_t status = SGX_SUCCESS;



	ms->ms_retval = calculate_std();


	return status;
}

SGX_EXTERNC const struct {
	size_t nr_ecall;
	struct {void* ecall_addr; uint8_t is_priv;} ecall_table[4];
} g_ecall_table = {
	4,
	{
		{(void*)(uintptr_t)sgx_calculate_average, 0},
		{(void*)(uintptr_t)sgx_add_integer, 0},
		{(void*)(uintptr_t)sgx_calculate_median, 0},
		{(void*)(uintptr_t)sgx_calculate_std, 0},
	}
};

SGX_EXTERNC const struct {
	size_t nr_ocall;
	uint8_t entry_table[1][4];
} g_dyn_entry_table = {
	1,
	{
		{0, 0, 0, 0, },
	}
};


sgx_status_t SGX_CDECL ocall_print(const char* str)
{
	sgx_status_t status = SGX_SUCCESS;
	size_t _len_str = str ? strlen(str) + 1 : 0;

	ms_ocall_print_t* ms = NULL;
	size_t ocalloc_size = sizeof(ms_ocall_print_t);
	void *__tmp = NULL;

	ocalloc_size += (str != NULL && sgx_is_within_enclave(str, _len_str)) ? _len_str : 0;

	__tmp = sgx_ocalloc(ocalloc_size);
	if (__tmp == NULL) {
		sgx_ocfree();
		return SGX_ERROR_UNEXPECTED;
	}
	ms = (ms_ocall_print_t*)__tmp;
	__tmp = (void *)((size_t)__tmp + sizeof(ms_ocall_print_t));

	if (str != NULL && sgx_is_within_enclave(str, _len_str)) {
		ms->ms_str = (char*)__tmp;
		memcpy(__tmp, str, _len_str);
		__tmp = (void *)((size_t)__tmp + _len_str);
	} else if (str == NULL) {
		ms->ms_str = NULL;
	} else {
		sgx_ocfree();
		return SGX_ERROR_INVALID_PARAMETER;
	}
	
	status = sgx_ocall(0, ms);

	if (status == SGX_SUCCESS) {
	}
	sgx_ocfree();
	return status;
}

