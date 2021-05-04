<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1 >Your chainID is: {{ chainId }}</h1>
  </div>
</template>

<script>
// This function detects most providers injected at window.ethereum
import detectEthereumProvider from "@metamask/detect-provider";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      chainId: undefined,
    };
  },
  async beforeMount() {
    // #1. Detect the MetaMask Ethereum provider
    const provider = await detectEthereumProvider();
    if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      this.startApp(provider); // initialize your app
    } else {
      console.log("Please install MetaMask!");
    }

    const accounts = await window.ethereum.enable(); // prompts MetaMask and asks to connect to account
    console.log(accounts); // returns the account connected to
    console.log(window.ethereum);

    // #2. Handle chain (network) and chainChanged (per EIP-1193)

    const ethereum = window.ethereum; // QUESTION: why did I have to add this line?
    // QUESTION(bis): why was it not enough to have (w/o declaring var):
    // this.chainId = await window.ethereum.request({ method: "eth_chainId" });
    this.chainId = await ethereum.request({ method: "eth_chainId" });
    
    // NOTE:  to geth the chainId, the following also worked: 
    //        this.chainId = await window.ethereum.chainId;
    
    ethereum.on("chainChanged", this.handleChainChanged);

    // #3. Handle user accounts and accountsChanged (per EIP-1193)




  },
  methods: {
    startApp(provider) {
      // If the provider returned by detectEthereumProvider is not the same as
      // window.ethereum, something is overwriting it, perhaps another wallet.
      if (provider !== window.ethereum) {
        console.error("Do you have multiple wallets installed?");
      }
      // Access the decentralized web!
    },
    handleChainChanged() {
      window.location.reload();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
