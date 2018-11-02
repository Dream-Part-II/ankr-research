"""
Microraiden Basic Demo for Ankr:

In this file, we construct a channel between two parties, a sender and a recevier.
"""
from microraiden import Client
import os

receiver = '0x5cBF12aA30E557032e9D0992D5d3e9e02a2852DD'
privkey = '0x2D97329F760848A548A95B8A08F780932A02D43ECEC40138A70F92FB14847887' # Some sender private key

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