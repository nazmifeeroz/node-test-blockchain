## Setting up private Eth

### Install NVM

```
sudo apt install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.profile
nvm install --lts
```

### Install Ganache CLI

```
npm install -g ganache-cli
```

### Start Ganache

```
ganache-cli --host "[private_ip_of_AWS_instance]"  --port 8545 --networkId 5777
```

## Dockerise Ganache

### Install Docker into EC2 Instance

```
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

### Create dockerfile

```
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

### Build and run Dockerfile

```
sudo docker build -t ganache .

sudo docker run -d -p 8545:8545 ganache

sudo docker logs --follow ganache
```

### Stop all Docker processes

```
sudo docker kill $(sudo docker ps -q) && sudo docker rm $(sudo docker ps -a -q) && sudo docker rmi $(sudo docker images -q)
```
