"""
Microraiden Basic Demo for Ankr:

In this file, we construct a channel between two parties, a sender and a recevier.
"""
from microraiden import Client
import os


"""Calculates Price of Resources Utilized """
def resource_calculation():
    return 1 # replace with resource calculation logic

receiver = '0xaaaaaaaaaaaaaaaaaaaaaaa'
privkey = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' # Some sender private key
 

client = Client(privkey)
resource_price = resource_calculation()
# Open a suitable channel for communication and deposit 1 TKN
channel = client.get_suitable_channel(receiver, resource_price)
channel.create_transfer(resource_price)

print(
    'Current balance proof:\n'
    'From: {}\n'
    'To: {}\n'
    'Channel opened at block: #{}\n'  # used to uniquely identify this channel
    'Balance: {}\n'                   # total: 1
    'Signature: {}\n'                 # valid signature for a balance of 1 on this channel
    .format(
        channel.sender, channel.receiver, channel.block, channel.balance, channel.balance_sig
    )
)

channel.close()

# Wait for settlement period to end.

channel.settle()
