# sleeping DOES NOT help fix the error
#sleep 60

# root
#whoami

# list SGX devices
ls -l /dev/isgx
ls -l /dev/mei0

source /opt/intel/sgxsdk/environment

/usr/src/app/app
