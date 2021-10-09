---
title: Part 2 - Dockerise your Blockchain app
published: true
description: You have created a blockchain. Now let's dockerize it!
tags: aws, blockchain, cloud, docker
cover_image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vv865kzcah8f7lc03xc7.jpg
series: Your very own blockchain
---

In the previous article, we've built an Ethereum blockchain on AWS using Ganache-CLI. The blockchain is up but it requires to be manually started with your terminal tab always running `ganache`. What if we can have the blockchain running in background on the EC2 server, and add a custom domain to its IP address, and then secure it with an API token. So that's what we will be working on in this part.

Here is where Docker comes in.

## Containerise your blockchain app

Docker is useful when you need to run an app pre installed with all its dependencies.

1. `ssh` into your EC2 instance and install docker by running these commands
    ```shell
    $ sudo apt-get update

    $ sudo apt-get install \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release

    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

    $ echo \
    "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    $ sudo apt-get update

    $ sudo apt-get install docker-ce docker-ce-cli containerd.io

    $ sudo docker run hello-world
    ```
    You should be able to see this output after the last command. 

    ![Docker hello world](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e41ags1zhnoyd1d32i7o.png)

2. Create a Dockerfile

    Create a new file named `Dockerfile` at your current folder. In the file add these lines,

    ```dockerfile
    # node:alpine will be our base image to create this image
    FROM node:alpine

    # Set the /app directory as working directory
    WORKDIR /app

    # Install ganache-cli globally
    RUN npm install -g ganache-cli

    EXPOSE 8545

    # Set the default command for the image
    CMD ["ganache-cli", "-h", "0.0.0.0", "--port", "8545", "--networkId", "5777"] 
    ```

3. Build and run Dockerfile

    We are now ready to build and run the blockchain in the background!

    ```shell
    # Builds the docker image with the name ganache
    sudo docker build -t ganache .

    # runs the app. -d will detach the app so that it will in background
    sudo docker run -d -p 8545:8545 ganache

    # checks if ganache has run successfully
    sudo docker logs ganache
    ```

## Your app is up and running!

Visit your AWS public IP on port 8545 (`http://<YOUR_EC2_IP_ADDRESS>:8545`).