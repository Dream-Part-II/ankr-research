#include <stdio.h>
#include<math.h>
#include "sgx_trts.h"
#include <string.h>
#include "Enclave_t.h"
#define MAX_BUF_LEN 5

int buf[MAX_BUF_LEN];
int i = 0;

void add_integer(int num) {
	if (i >= MAX_BUF_LEN) {
		return;
	}

	buf[i] = num;
	i++;
}

float calculate_average() {
	int sum = 0;
	for (int i = 0; i < MAX_BUF_LEN; i++) {
		sum+=buf[i];
	}
	sum/=MAX_BUF_LEN;
	return sum;
}

void sort(int *array , int n)
{ 
    int i=0 , j=0 , temp=0;
    for(i=0 ; i<n ; i++)
    {
        for(j=0 ; j<n-1 ; j++)
        {
            if(array[j]>array[j+1])
            {
                temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
}

float calculate_median() {
	sort(buf, MAX_BUF_LEN);
	return buf[MAX_BUF_LEN/2];
}

float calculate_std() {
	int avg = calculate_average();
	float sum = 0.0;
	for (int i = 0; i < MAX_BUF_LEN; i++) {
		sum += pow((buf[i] - avg), 2);
	}
	sum/=MAX_BUF_LEN;
	return pow(sum, 0.5);
}