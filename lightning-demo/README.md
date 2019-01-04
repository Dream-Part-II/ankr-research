# Investigate Lightning implementations for Payments

## Purpose of the Lightning Protocol

Lightning is essentially a protocol that lies above the Bitcoin blockchain layer that enables scability of the blockchain through the creation of off-chain transaction channels that users can update at their discretion. Without the need to broadcast a call to the blockchain each time parties want to make any transaction to another party, lightning significantly cuts costs typically associated with payments, allowing for a new type of transaction called micropayments. Additionally, because these payments are made off-chain, payments are instant. 

These efforts to implement the Lightning protocol is an attempt to make the bitcoin blockchain scalable. Because historically, any transaction, no matter how big or small, i.e. purchasing a pizza using Bitcoin during its early days as opposed to completing a large scale enterprise agreement to complete a cloud computing job, would have to go through the block confirmation process and then get mined on the blockchain. Due to this, naturally the Bitcoin blockchain has grown bloated, and costs to maintain and add to the blockchain is exponentially growing. An example of how several small scale transaction can severly bloat a blockchain can be seen in CryptoKitties & Satoshi Dice. CryptoKitties is an online game that utilizes the Ethereum blockchain for a decentralized database. Kitties can be traded, bred, or bought in which a smart contract hosted on the Ethereum blockchain would facilitate such transactions. However, during the "CryptoKitties" hype, multiple users were flooding the Ethereum blockchain with such microtransactions, such as buy one kitty, bred with another kitty, etc. More information can be found here: (https://qz.com/1145833/cryptokitties-is-causing-ethereum-network-congestion/)

For Ankr specifically, we want to leverage the Lightning protocol to allow Ankr, the consumer, and the data centers to pay each other in forms of microtransactions utilizing a decentralized network. For example, if a consumer wants to pay for a long scale project that has 3 distinct parts, the consumer and Ankr can open a lightning channel with a balance of 3 Bitcoin/0 Bitcoin, so the consumer has an initial balance of 3 bitcoin and Ankr has an initial balance of 0 bitcoin. After each part is finished, the consumer can update the closing transaction to 2/1, then 1/2, then finally 0/3, essentially paying Ankr one bitcoin each time. After the entire job is finished, Ankr can broadcast the closing transaction 0/3 to the blockchain, and can claim 3 Bitcoin to their on-chain address.

More discussion about the specifics of the lightning protocol can be found here: (https://github.com/lightningnetwork/lightning-rfc/blob/master/00-introduction.md)

## Implementations of Lighting Protocols

As the lightning protocol is just a standard, there are multiple implementations of lightning. Some prominent ones are LND, or lightning network daemon, MIT-lit, and Raiden. The first two implementations are hosted on the Bitcoin blockchain, whereas Raiden is hosted on the Ethereum blockchain. In this writeup I will be focusing on the first two implementations, as well as discuss some pros & cons related to each implementation. 

LND is the most fleshed out implementation of the Lightning Protocol, with several tutorials of how to run the implementations as well as a well-documented API documentation, with two interfaces: a REST API, and a gRPC service. LND also supports Docker images, which is something we may consider as the Ankr DCCN is heavily integrated with Docker and Kubernetes. In addition, LND is written in Go, which allows for easier integration with our DCCN. Overall, some of the features listed are:

* Creating channels. 
* Closing channels. 
* Completely managing all channel states (including the exceptional ones!).
* Maintaining a fully authenticated+validated channel graph.
* Performing path finding within the network, passively forwarding incoming payments.
* Sending outgoing onion-encrypted payments through the network.
* Updating advertised fee schedules.
* Automatic channel management (autopilot).

It seems that this implementation is the most robust implementation of the Lightning protocol, and if we decide to utilize the Bitcoin blockchain for our payment solutions, I would suggest utilizing LND. However, there are certain drawbacks of LND/Bitcoin that may be detrimental. Some of these drawbacks are:

* Bitcoin mining is more computationally intensive than ethereum, so transaction costs for LND may be significantly more expensive than Raiden, despite less transactions overall, although this is dependent on the smart contract and the magnitude of the state change (at the time of writeup, Bitcoin txn fee is 0.21 usd/txn, wheras for Ethereum for an average of 21000 gas used, 0.007 usd/txn) 
* LND built in defraud mechanism is unforgiving: if one party accidentally broadcasts old closing txn to the network, then the other party can use exchanged secret to claim ALL the funds in the channel, read more here: (https://dev.lightning.community/overview/#channel-updates)
* No built-in token support for Bitcoin, however, there are conceptually colored-coins exists that can emulate a token, read more here: (https://news.bitcoin.com/a-bch-fueled-colored-coins-desktop-wallet-launches/)

There is another implementation of Lightning on Bitcoin, called MIT-Lit. However, this implementation is still relatively early stage in comparison to LND, and they explicitly say not for use with real money/bitcoin. A cursory look at the dependency graph (https://raw.githubusercontent.com/mit-dci/lit/master/docs/deps.png) as well as the walkthrough for how to run the example stating ("Lit sortof works on testnet. There are known bugs / omissions / errors, and also unknown ones! Reporting bugs / crashes is helpful, and fixing them is even more helpful.") indicates that feature-wise it is lacking.

## Demos/Tutorials

As lightning is a topic of interest right now, there are multiple articles/tutorials for how to get nodes running locally on your own computer, and LND itself has a series of tutorials to run LND locally, using gRPC to interact with nodes programmatically, etc. here: (https://dev.lightning.community/tutorial/).

The tutorial in interest that reflects our goals for Ankr is linked here: (https://dev.lightning.community/tutorial/01-lncli/index.html). It states how to start three nodes Alice, Bob, and Charlie, have them talk to each other, set up channels, route payments between one another, and close a channel.

Another implementation is packaging both BTCD and LND together in a docker-compose file, and then having them interact together through the use of docker containers. The relevent tutorial can be found here: https://dev.lightning.community/guides/docker/. This guide also mentions how to test the docker implementation on testnet as well, and is an easy way for us to test any payment related solution. One thing to note is the environment variable isn't recognized when trying to test utilizing testnet, so I had to hardcode the shell scripts that start the daemons to start utilizing the --testnet flag.

Tutorial to run node on mainnet: (https://gist.github.com/bretton/0b22a0503a9eba09df86a23f3d625c13)

