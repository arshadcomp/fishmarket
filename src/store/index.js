import Vue from 'vue';
import Vuex from 'vuex';
// import VuexPersistence from 'vuex-persist'

import { productGetters, orderGetters, userGetters } from './getters'
// import { productMutations, cartMutations, manufacturerMutations, authMutations } from './mutations'
import { cartMutations, authMutations, settingMutations, productMutations, adminMutations } from './mutations'
import { productActions, settingActions } from './actions'
// import { onAuthUIStateChange } from '@aws-amplify/ui-components'

Vue.use(Vuex);

// const vuexLocal = new VuexPersistence({
//   storage: window.sesssionStorage,
//   reducer: (state) => ({cart:  state.cart})
// })

const store = new Vuex.Store({
    strict: true,
    state: {
      authorized: false,
      user: null,
      // // bought items
      cart: [],
      //open shop
      open: true,
      // // ajax loader
      showLoader: false,
      // // selected product
      // product: {},
      // // all products
      products: [],
      orders: [],
      users: []
      // // all manufacturers
      // manufacturers: []
    },
    // plugins: [vuexLocal.plugin],
    // plugins: [
    //   createPersist({
    //     namespace: "fresh-fish-devbaug",
    //     initialState: {},
    //     // ONE_WEEK
    //     expires: 7 * 24 * 60 * 60 * 1e3
    //   })
    // ],
    getters: Object.assign({}, productGetters, orderGetters, userGetters),
    mutations: Object.assign({}, cartMutations, authMutations, settingMutations, productMutations, adminMutations),
    actions: Object.assign({}, productActions, settingActions)
    // mutations: Object.assign({}, productMutations, cartMutations, manufacturerMutations, authMutations),
});

export default store