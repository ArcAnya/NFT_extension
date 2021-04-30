<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ test }}</h1>
  </div>
</template>

<script>
// This function detects most providers injected at window.ethereum
import detectEthereumProvider from "@metamask/detect-provider";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      test: 0,
    };
  },
  async beforeMount() {
    const provider = await detectEthereumProvider();
    if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      this.startApp(provider); // initialize your app
    } else {
      console.log("Please install MetaMask!");
    }
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
  }
}
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
