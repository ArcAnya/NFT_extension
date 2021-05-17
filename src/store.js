import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      ethereumInfo: undefined,
      provider: undefined,
      accounts: undefined,
      chainId: undefined,
      currentAccount: undefined,
    }
  },
  mutations: {
    updateEthereumInfo(state, payload) {
      state.ethereumInfo = payload;
    },
    updateProvider(state, payload) {
      state.provider = payload;
    },
    updateAccounts(state, payload) {
      state.accounts = payload;
    },
    updateChainId(state, payload) {
      state.chainId = payload;
    },
    updateCurrentAccount(state, payload) {
      state.currentAccount = payload;
    }
  },
  actions: {
    updateEthereumInfo(context, payload) {
      context.commit('updateEthereumInfo', payload.ethereumInfo);
    },
    updateProvider(context, payload) {
      context.commit('updateProvider', payload.provider);
      if (context.state.provider) {
        //console.log(context.state.provider);
        if (context.state.provider !== context.state.ethereumInfo) {
          console.error("Do you have multiple wallets installed?");
        }
      } else {
        console.log("Please install MetaMask!");
      }
    },
    updateAccounts(context, payload) {
      context.commit('updateAccounts', payload.accounts);
    },
    updateChainId(context, payload) {
      context.commit('updateChainId', payload.chainId);
    },
    updateCurrentAccount(context, payload) {
      context.commit('updateCurrentAccount', payload.currentAccount);
    }
  },
  getters: {
    ethereumInfo(state) {
      return state.ethereumInfo;
    },
    provider(state) {
      return state.provider;
    },
    accounts(state) {
      return state.accounts;
    },
    chainId(state) {
      return state.chainId;
    },
    currentAccount(state) {
      return state.currentAccount;
    }
  }
})

export default store;