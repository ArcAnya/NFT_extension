<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>Your chainID is: {{ chainId }}</h1>
    <button @click="connect">Connect</button>
    <ul>
      <li>wuuut? you have {{ currentBalance }} wei! </li>
    </ul>
  </div>
</template>

<script>
// This function detects most providers injected at window.ethereum
import detectEthereumProvider from "@metamask/detect-provider";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import VideoNFT from "../../build/contracts/VideoNFT.json";
import Web3 from "web3";

export default {
  name: "ETHinfo",
  props: {
    msg: String,
  },
  data() {
    return {
        
    };
  },
  async beforeMount() {
    // #1. Detect the MetaMask Ethereum provider

    this.updateEthereumInfo({ ethereumInfo: window.ethereum });

    this.updateProvider({ provider: await detectEthereumProvider() });

    // prompts MetaMask and asks to connect to account
    this.updateAccounts({
      accounts: await window.ethereum.request({
        method: "eth_accounts",
      }),
    });

    // #2. Handle chain (network) and chainChanged (per EIP-1193)

    this.updateChainId({
      chainId: await this.ethereumInfo.request({
        method: "eth_chainId",
      }),
    });

    this.ethereumInfo.on("chainChanged", this.handleChainChanged);

    // #3. Handle user accounts and accountsChanged (per EIP-1193)

    // QUESTION: better understand this code
    this.ethereumInfo
      .request({ method: "eth_accounts" })
      .then(this.handleAccountsChanged)
      .catch((err) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error(err);
      });

    this.ethereumInfo.on("accountsChanged", this.handleAccountsChanged);

    // #4. Access the user's accounts (per EIP-1102) => connect method

    // getting the ABI
    const abi = VideoNFT.abi;
    console.log("ABI: ", abi);

    // using web3
    let web3 = new Web3("ws://localhost:8545");

    // getting the current account balance 
    this.updateCurrentBalance({
        currentBalance: Math.trunc((await web3.eth.getBalance(this.accounts[0]) / (10**18)) )
    });

    // instantiating a contract
    const contract = new web3.eth.Contract(abi, this.accounts[0]);
    console.log(contract);


  },
  computed: {
    ...mapGetters([
      "ethereumInfo",
      "provider",
      "accounts",
      "chainId",
      "currentAccount",
      "currentBalance",
    ]),
  },
  methods: {
    ...mapActions([
      "updateEthereumInfo",
      "updateProvider",
      "updateAccounts",
      "updateChainId",
      "updateCurrentAccount",
      "updateCurrentBalance",
    ]),
    connect() {
      this.ethereumInfo
        .request({ method: "eth_requestAccounts" })
        .then(this.handleAccountsChanged)
        .catch((err) => {
          if (err.code === 4001) {
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
    },
    handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log("Please connect to MetaMask.");
      } else if (accounts[0] !== this.currentAccount) {
        this.updateCurrentAccount({ currentAccount: accounts[0] });
        console.log(this.currentAccount);
      }
    },
    handleChainChanged() {
      window.location.reload();
    },
  },
};
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
