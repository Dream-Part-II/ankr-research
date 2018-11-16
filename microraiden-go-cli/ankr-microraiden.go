package main

import (
	"flag"
	"fmt"
	"os"
    "github.com/ethereum/go-ethereum/crypto"
    "encoding/hex"
)

func main() {
	// Create account name
	createAccountCommand := flag.NewFlagSet("createAccount", flag.ExitOnError)
	createAccountNamePtr := createAccountCommand.String("name",  "", "Name of Account. (Required)")
	
	//Generate Key Pair, Address, and Private Key
	key, _ := crypto.GenerateKey()
	address := crypto.PubkeyToAddress(key.PublicKey).Hex()
	privkey := hex.EncodeToString(key.D.Bytes())

	switch(os.Args[1]) {
	case "createAccount":
		createAccountCommand.Parse(os.Args[2:])
	}

	if *createAccountNamePtr == "" {
		fmt.Println("You must provide a name for this account.")
		os.Exit(1)
	}

	fmt.Println("Name of account: " + *createAccountNamePtr)
	fmt.Println("Address: " + address)
	fmt.Println("Private Key: 0x" + privkey)
}


/*
func main() {

	//Subcommands
	countCommand := flag.NewFlagSet("count", flag.ExitOnError)
	listCommand := flag.NewFlagSet("list", flag.ExitOnError)

	countTextPtr := countCommand.String("text", "", "Text to parse. (Required)")
	countMetricPtr := countCommand.String("metric", "chars", "Metric {chars|words|lines};.")
	countSubstringPtr := countCommand.String("substring", "", "The substring to be counted. (Required)")
	countUniquePtr := countCommand.Bool("unique", false, "Measure unique values of a metric.")

	listTextPtr := listCommand.String("text", "", "Text to Parse. (Required)")
	listMetricPtr := listCommand.String("metric", "chars", "Metric {chars|words|lines};.")
	listUniquePtr := listCommand.Bool("unique", false, "Measure unique values of a metric")

	if len(os.Args) < 2 {
		fmt.Println("list or count subcommand is required")
		os.Exit(1)
	}

	switch os.Args[1] {
	case "list":
		listCommand.Parse(os.Args[2:])
	case "count":
		countCommand.Parse(os.Args[2:])
	default:
		flag.PrintDefaults()
		os.Exit(1)
	}

	if listCommand.Parsed() {
		if *listTextPtr == "" {
			listCommand.PrintDefaults()
			os.Exit(1)
		}

		metricChoices := map[string]bool{"chars": true, "words": true, "lines": true}
		if _, validChoice := metricChoices[*listMetricPtr]; !validChoice {
			listCommand.PrintDefaults()
			os.Exit(1)
		}

        fmt.Printf("textPtr: %s, metricPtr: %s, uniquePtr: %t\n", *listTextPtr, *listMetricPtr, *listUniquePtr)
	}

	if countCommand.Parsed() {
		if *countTextPtr == "" {
			countCommand.PrintDefaults()
			os.Exit(1)
		}

		if *countMetricPtr == "substring" && *countSubstringPtr == "" {
			countCommand.PrintDefaults()
			os.Exit(1)
		}

		if *countMetricPtr != "substring" && *countSubstringPtr != "" {
			fmt.Println("--substring may only be used with --metric=substring.")
			countCommand.PrintDefaults()
			os.Exit(1)
		}

		metricChoices := map[string]bool{"chars": true, "words": true,  "lines": true}
		if _, validChoice := metricChoices[*listMetricPtr]; !validChoice {
            countCommand.PrintDefaults()
            os.Exit(1)
        }
        //Print
        fmt.Printf("textPtr: %s, metricPtr: %s, substringPtr: %v, uniquePtr: %t\n", *countTextPtr, *countMetricPtr, *countSubstringPtr, *countUniquePtr)
	}
}*/
