"""
Microraiden Basic Demo for Ankr:

In this file, we construct a channel between two parties, a sender and a recevier.
"""
from microraiden import Client
import os

receiver = '0xaaaaaaaaaaaaaaaaaaaaaaa'
privkey = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' # Some sender private key

client = Client(privkey)
# Open a suitable channel for communication and deposit 10 TKN
channel = client.get_suitable_channel(receiver, 1)
channel.create_transfer(1)

print(
    'Current balance proof:\n'
    'From: {}\n'
    'To: {}\n'
    'Channel opened at block: #{}\n'  # used to uniquely identify this channel
    'Balance: {}\n'                   # total: 0
    'Signature: {}\n'                 # valid signature for a balance of 0 on this channel
    .format(
        channel.sender, channel.receiver, channel.block, channel.balance, channel.balance_sig
    )
)

channel.close()

# Wait for settlement period to end.

channel.settle()
