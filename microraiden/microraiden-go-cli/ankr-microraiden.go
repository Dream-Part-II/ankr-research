package main

import (
	"flag"
	"strings"
	"bufio"
	"fmt"
	"os"
	"context"
	"github.com/ethereum/go-ethereum/accounts/keystore"
	"math/big"
	"log"
	"crypto/ecdsa"
	"crypto/x509"
    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/accounts/abi/bind"
    "github.com/ethereum/go-ethereum/accounts/abi/bind/backends"
    "github.com/ethereum/go-ethereum/ethclient"
    "github.com/ethereum/go-ethereum/crypto"
    "github.com/ethereum/go-ethereum/core"
    microraiden "./contracts"
)

/* Creates account and wallet for user ACCOUNTNAME. */
func createAccount(accountName string) {
	if accountName == "" {
		fmt.Println("You must provide a name for this account.")
		os.Exit(1)
	}
	// Generate Key Pair, Address, and Private Key
	privateKey, err := crypto.GenerateKey()
    if err != nil {
        log.Fatal(err)
    }

    privateKeyBytes, err := x509.MarshalECPrivateKey(privateKey)
    if err != nil {
    	log.Fatal(err)
    }
    fmt.Println(privateKeyBytes)
    publicKey := privateKey.Public()
    publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
    if !ok {
        log.Fatal("error casting public key to ECDSA")
    }

    address := crypto.PubkeyToAddress(*publicKeyECDSA).Hex()

	// Write info to files
	file, err := os.Create(accountName + ".txt")
	file.WriteString(address + "\n")
	
	// Write Private Key Bytes to files
	privateKeyFile, err := os.Create(accountName + "-private-key.txt") 
	privateKeyFile.Write(privateKeyBytes)
}

func getAddressFromAccountName(fileNames string) (string, string) {
	files := strings.Split(fileNames, " ")
	user1, user2 := files[0], files[1]
	address1 := "0x0"
	address2 := "0x0"
	if _, err := os.Stat(user1 + ".txt"); !os.IsNotExist(err) {
		file, err := os.Open(user1 + ".txt")
		if err != nil {
			log.Fatal(err)
    	}
    	defer file.Close()

    	scanner := bufio.NewScanner(file)
    	for scanner.Scan() {
    		address1 = scanner.Text()
    		break
    	}
	}

	if _, err := os.Stat(user2 + ".txt"); !os.IsNotExist(err) {
		file, err := os.Open(user2 + ".txt")
		if err != nil {
			log.Fatal(err)
    	}
    	defer file.Close()

    	scanner := bufio.NewScanner(file)
    	for scanner.Scan() {
    		address2 = scanner.Text()
    		break
    	}
	}

	return address1, address2
}

func createKs() {
    ks := keystore.NewKeyStore("./tmp", keystore.StandardScryptN, keystore.StandardScryptP)
    password := "secret"
    account, err := ks.NewAccount(password)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(account.Address.Hex())
}

func getPrivateKeyFromAccountName(fileNames string) ([]byte) {
	files := strings.Split(fileNames, " ")
	user1, _ := files[0], files[1]

	file, err := os.Open(user1 + "-private-key.txt")
	if err != nil {
  		fmt.Println(err)
  		os.Exit(1)
  	}
	
	defer file.Close()

	fileinfo, err := file.Stat()
	
	if err != nil {
  		fmt.Println(err)
  		os.Exit(1)
	}

	filesize := fileinfo.Size()
	buffer := make([]byte, filesize)

	_, err = file.Read(buffer)
	if err != nil {
  		fmt.Println(err)
  		os.Exit(1)
	}
	return buffer
}

func main() {
	// Create Ethereum Client on Kovan Test Network
	client, err := ethclient.Dial("https://kovan.infura.io")
	if err != nil {
		log.Fatal(err)
	}

	// Create private key for loading Microraiden Smart Contract
	privateKey, err := crypto.GenerateKey()
    if err != nil {
        log.Fatal(err)
    }

    // Address of Microraiden Smart Contract
    smartContractAddress := common.HexToAddress("0xed94e711e9de1ff1e7dd34c39f0d4338a6a6ef92")
    nonce, err := client.PendingNonceAt(context.Background(), smartContractAddress)
    if err != nil {
    	log.Fatal(err)
    }

   	gasPrice, err := client.SuggestGasPrice(context.Background())
    
    if err != nil {
    	log.Fatal(err)
    }
	auth := bind.NewKeyedTransactor(privateKey)
    auth.Nonce = big.NewInt(int64(nonce))
    auth.Value = big.NewInt(0) // in wei
    auth.GasLimit = uint64(1000000000) // in units
    auth.GasPrice = gasPrice

	instance, err := microraiden.NewMicroraiden(smartContractAddress, backends.NewSimulatedBackend(core.GenesisAlloc{auth.From: {Balance: big.NewInt(10000000000)}}, 10000000))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("contract is loaded")
	_ = instance

	// Create account name
	createAccountCommand := flag.NewFlagSet("createAccount", flag.ExitOnError)
	createAccountNamePtr := createAccountCommand.String("name",  "", "Name of Account. (Required)")
	
	//Generate Key Pair, Address, and Private Key
	key, _ := crypto.GenerateKey()
	address := crypto.PubkeyToAddress(key.PublicKey).Hex()
	privkey := hex.EncodeToString(key.D.Bytes())

	//Create channel
	createChannelCommand := flag.NewFlagSet("createChannel", flag.ExitOnError)
	createChannelUsersPtr := createChannelCommand.String("users", "", "Name of users. (Required)")

	//Create channel
	createChannelCommand := flag.NewFlagSet("createChannel", flag.ExitOnError)
	createChannelUsersPtr := createChannelCommand.String("users", "", "Name of users. (Required)")

	switch(os.Args[1]) {
	case "createAccount":
		createAccountCommand.Parse(os.Args[2:])
		createAccount(*createAccountNamePtr)
	case "createChannel":
		createChannelCommand.Parse(os.Args[2:])
		address1, address2 := getAddressFromAccountName(*createChannelUsersPtr)
		privateKeyBytes1 := getPrivateKeyFromAccountName(*createChannelUsersPtr)
		nonce, err = client.PendingNonceAt(context.Background(), common.HexToAddress(address1))
		
		if err != nil {
    		log.Fatal(err)
    	}

   		gasPrice, err = client.SuggestGasPrice(context.Background())
    
    	if err != nil {
    		log.Fatal(err)
    	}

    	privKey1, err := x509.ParseECPrivateKey(privateKeyBytes1)
    	if err != nil {
    		log.Fatal(err)
    	}
    	_, _ = address1, address2
    	_ = privKey1
		auth = bind.NewKeyedTransactor(privKey1)
		_ = auth
		// auth.Nonce = big.NewInt(int64(nonce))
		// auth.Value = big.NewInt(0) // in wei
		// auth.GasLimit = uint64(1000000000) // in units
		// auth.GasPrice = gasPrice
		// instance.CreateChannel(auth, common.HexToAddress(address2), big.NewInt(10))
	}
}
