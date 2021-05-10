<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h1>Your chainID is: {{ chainId }}</h1>
    </div>
</template>

<script>

// This function detects most providers injected at window.ethereum
import detectEthereumProvider from "@metamask/detect-provider";
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
    name: "ETHinfo",
    props: {
        msg: String,
    },
    data() {
        return {
            chainId: undefined,
            currentAccount: undefined,
            provider: undefined,
            accounts: undefined, // QUESTION: why is this not needed?
        };
    },
    async beforeMount() {
        
        // #1. Detect the MetaMask Ethereum provider

        this.updateEthereumInfo({ ethereumInfo: window.ethereum });
        
        // QUESTION: why did I have to add this line?
        // QUESTION(bis): why was it not enough to have (w/o declaring var):
        // this.chainId = await window.ethereum.request({ method: "eth_chainId" });

        // console.log(this.ethereumInfo == window.ethereum); // QUESTION: WHY NOT EQUAL?

        this.provider = await detectEthereumProvider();
        if (this.provider) {
            // console.log(this.provider);
            // From now on, this should always be true:
            // provider === window.ethereum
            // QUESTION: Why is it NOT true then?
            this.startApp(); // initialize your app
        } else {
            console.log("Please install MetaMask!");
        }

        // prompts MetaMask and asks to connect to account
        this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // #2. Handle chain (network) and chainChanged (per EIP-1193)

        this.chainId = await this.ethereumInfo.request({
            method: "eth_chainId",
        });
        // NOTE:  to geth the chainId, the following also worked:
        //        this.chainId = await window.ethereum.chainId;

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

        // console.log("provider: ", this.provider, "\n", "window.ethereum", window.ethereum);
        // window.ethereum can be found IN the object provider.
        // QUESTION: CLARIFICATION ON THE PROCESS HERE

        // #4. Access the user's accounts (per EIP-1102)

        
        
    },
    computed: {
        ...mapGetters([
            'ethereumInfo',
            /* 'provider', */
        ])
    },
    methods: {
        ...mapActions([
            'updateEthereumInfo',
            /* 'updateProvider', */
        ]),
        handleAccountsChanged(accounts) {
            if (accounts.length === 0) {
                // MetaMask is locked or the user has not connected any accounts
                console.log("Please connect to MetaMask.");
            } else if (accounts[0] !== this.currentAccount) {
                this.currentAccount = accounts[0];
                console.log(this.currentAccount);
            }
        },
        startApp() {
            // If the provider returned by detectEthereumProvider is not the same as
            // window.ethereum, something is overwriting it, perhaps another wallet.
            // QUESTION:    is it enough to compare this.provider with this.ethereumInfo 
            //              (rather than directly window.ethereum which returns fals)?
            if (this.provider !== this.ethereumInfo) {
                console.error("Do you have multiple wallets installed?");
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
