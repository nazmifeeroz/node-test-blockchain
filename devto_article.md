---
title: Build your own remote private blockchain with AWS and Ganache
published: false
description: Build a blockchain from scratch at low cost for you to test for your development
tags:
cover_image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6rjxsyts6q1zsamt31jl.jpg
series: Your very own blockchain
---

This will be a 2 part series!

In this article, I'll be sharing with you on how to create a private blockchain from scratch with almost no cost. It's best used for testing your application code or smart contract that may contain bugs for attackers to exploit. By setting up your own private test blockchain, it helps to simulate the Ethereum blockchain before deploying it to the main network.

### This article will cover

- Setting up an AWS instance running Ganache
- Setting up security group to only allow your IP to access the blockchain
- Running the blockchain
- Containerise the blockchain to have it run in background and easier deployment (Part 2 _Coming Soon_)
- Using Nginx to route your blockchain to a URI (Part 2 _Coming Soon_)
- Request api token with Nginx (Part 2 _Coming Soon_)

# Setting up an AWS EC2 instance

For the start, let's create a small instance in AWS to deploy our blockchain. We don't really need a big instance to create a blockchain.

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
   $ sudo apt install
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
6. Test out your blockchain
   - Keep the Ganache CLI running and open a new terminal tab.
   - Clone this repository, https://github.com/nazmifeeroz/node-test-blockchain
   - Create a `.env` file at the root folder and insert a variable `BLOCKCHAIN_IP_ADDRESS` (Get the **Public IPv4 address** of your instance)
   - Run `yarn && yarn start`
   - You should see balance of your first account of your blockchain
![Output Test](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4ep4rudvrjlz81cofitc.png)

## :tada: Congratulations!

You now have a running blockchain at your own dispense. In part 2 of my series, I will show you how to dockerize your blockchain so that you can startup a blockchain easily and have your blockchain programmatically accessible by using an API token.
