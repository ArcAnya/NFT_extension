import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      ethereumInfo: undefined,
      // provider: undefined,
    }
  },
  mutations: {
    updateEthereumInfo(state, payload) {
        state.ethereumInfo = payload;
    },
    /* updateProvider(state, payload) {
        state.provider = payload;
    } */
  },
  actions: {
    updateEthereumInfo(context, payload) {
        context.commit('updateEthereumInfo', payload.ethereumInfo);
    },
    /* updateProvider(context, payload) {
        context.commit('updateProvider', payload.provider);
        if (context.state.provider) {
          console.log(context.state.provider);
          if (context.state.provider !== context.state.ethereumInfo) {
            console.error("Do you have multiple wallets installed?");
        }
      } else {
          console.log("Please install MetaMask!");
      }
    } */
  }, 
  getters: {
    ethereumInfo(state) {
        return state.ethereumInfo;
    },
    /* provider(state) {
        return state.provider;
    } */
  }
})

export default store;