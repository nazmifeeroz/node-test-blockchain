require("dotenv").config();

const Web3 = require("web3");

const web3 = new Web3(`http://${process.env.BLOCKCHAIN_IP_ADDRESS}:8545`);

const Main = async () => {
  const accounts = await web3.eth.getAccounts();

  const accountOneBalance = await web3.eth
    .getBalance(accounts[0])
    .then((b) => web3.utils.fromWei(b, "ether"));

  console.log("accountOneBalance", accountOneBalance);
};

Main();
