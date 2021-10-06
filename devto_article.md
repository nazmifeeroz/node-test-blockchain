---
title: Build your own remote private blockchain with AWS and Ganache
published: false
description: Build a blockchain from scratch at low cost for you to test for your development
tags:
cover_image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6rjxsyts6q1zsamt31jl.jpg
series: Your very own blockchain
---

This will be a 2 part series!

I have been _fiddling_ in the blockchain world for a while trying to figure how the blockchain works and how to create one. There isn't one guide that helps one to build his very own blockchain! So I'm writing this article to help you speed up your process of building one. If you are interested to build a blockchain and desire to create your own private ethereum network, look no further.

In this article, I'll be sharing with you on how to create a private blockchain from scratch with almost no cost. It's best used for testing your application code or smart contract that may contain bugs for attackers to exploit. By setting up your own private test blockchain, it helps to simulate the Ethereum blockchain before deploying it to the main network.

### This article will cover

- Setting up an AWS instance running Ganache
- Setting up security group to only allow your IP to access the blockchain
- Running the blockchain
- Containerise the blockchain to have it run in background and easier deployment (Part 2 _Coming Soon_)
- Using Nginx to route your blockchain to a URI (Part 2 _Coming Soon_)
- Request api token with Nginx (Part 2 _Coming Soon_)

# Setting up an AWS EC2 instance

Let's start! Create a small instance in AWS to deploy our blockchain. The smallest instance will do!

1. Head over to EC2 service homepage and click on `Launch Instance`.
2. Choose the free tier eligible `Ubuntu Server 20.04 LTS (HVM), SSD Volume` type.
   ![Ubuntu Server](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ftcq7w65qoh26inut8q4.png)
3. Select `t2.micro` Type and press on `Next` button.
   ![Instance type](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jyzt0kiylsyd6gaain2t.png)
4. Keep pressing `Next` until **Step 6: Configure Security Group**. Create a new security group with the default SSH rule updated with source `My IP`. Add two more rules `Custom TCP` and `Custom UDP`. Select `My IP` as your source to only allow your IP address to access the blockchain.
   ![Security Group](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/06j1fd05m6yjs2lwdfb5.png)
5. Select Next and press Launch. On the `Select key pair` prompt. Select an existing key pair if you have one. Else create a new key pair. Press launch and wait until the Instance State gets to `Running`

# Running the blockchain

1. Connect into your newly created EC2 instance by **SSH** or using **Instance Connect**.
2. Run the following commands:
    ```shell
    $ sudo apt-get update
    $ sudo apt install curl
    $ curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
    $ source ~/.profile
    $ nvm install --lts
    ```
3. Verify that `npm` is successfully installed
    ```shell
    $ npm -v
    ```
4. Install **Ganache CLI**
    ```shell
    $ sudo npm install -g ganache-cli
    ```
5. Run Ganache
    ```shell
    $ ganache-cli --host "[private_ip_of_AWS_instance]"  --port 8545 --networkId 5777
    ```

    _Private IP should be **Private IPv4 addresses** of your instance_

You should see a prompt that Ganache is listening on port 8545 to indicate you have a running blockchain! :tada:
## Test out your blockchain

I have created a small node app for you to connect to your blockchain and get the balance of one created account. I used [Web3 JS](https://web3js.readthedocs.io/en/v1.5.2/) to call the blockchain.

1. In another tab in your terminal, clone this repository:
    ```shell
    $ git clone https://github.com/nazmifeeroz/node-test-blockchain
    ```

2. Duplicate `.env.example` into a new file `.env`
    ```
    $ cp .env.example .env
    ```

3. Get your `BLOCKCHAIN_IP_ADDRESS` from your EC2 instance console. This should be the **Private IPv4 address**

4. Run the app

    ```
    $ yarn && yarn start
    ```

You should see the balance of your first account of your blockchain. :sunglasses:

![Output Test](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4ep4rudvrjlz81cofitc.png)

### About the app

If you would open up `main.js`, there's a `Main()` function that is fetching all the accounts available in your blockchain (default is 10 accounts). It then calls the `getBalance()` method with the first account address. That simple!

## :tada: Congratulations!

You now have a running blockchain at your own dispense. In part 2 of my series, I will show you how to dockerize your blockchain so that you can startup a blockchain easily and have your blockchain programmatically accessible by using an API token.
