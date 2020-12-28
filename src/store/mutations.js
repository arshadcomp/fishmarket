// import { productSchema } from './schemas'
// import { normalize } from 'normalizr'
// import merge from "lodash/object/merge"

import {
    // ADD_PRODUCT,
    // ADD_PRODUCT_SUCCESS,
    // PRODUCT_BY_ID,
    // PRODUCT_BY_ID_SUCCESS,
    // UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    // REMOVE_PRODUCT,
    // REMOVE_PRODUCT_SUCCESS,
    ADD_TO_CART,
    UPDATE_CART_NO_STOCK,
    INCREMENT_CART_QUANTITY,
    DECREMENT_CART_QUANTITY,
    REMOVE_FROM_CART,
    ALL_PRODUCTS,
    ALL_PRODUCTS_SUCCESS,
    // ALL_MANUFACTURERS,
    // ALL_MANUFACTURERS_SUCCESS,
    // ERROR_MSG,
    SET_AUTH_STATE,
    SET_AUTH_DATA,
    STORE_OPEN,
    ALL_ORDERS,
    ADD_TO_ORDERS,
    ADD_TO_USERS,
  } from './mutation-types'
  
  export const productMutations = {
    [ALL_PRODUCTS] (state) {
      state.showLoader = true
    },
    [ALL_PRODUCTS_SUCCESS] (state, payload) {
      state.showLoader = false
      state.products = payload
    },
    // [PRODUCT_BY_ID] (state) {
    //   state.showLoader = true
    // },
    // [PRODUCT_BY_ID_SUCCESS] (state, payload) {
    //   state.showLoader = false
    //   state.product = payload
    // },
    // [ADD_PRODUCT]: (state, payload) => {
    //   state.showLoader = true
    // },
    // [ADD_PRODUCT_SUCCESS]: (state, payload) => {
    //   state.showLoader = false
    //   state.products.push(payload)
    // },
    // [UPDATE_PRODUCT]: (state, payload) => {
    //   state.showLoader = true
    // },
    [UPDATE_PRODUCT_SUCCESS]: (state, payload) => {
      state.showLoader = false
      state.products = state.products.map(p => {
        if(p.id === payload.id)
          p = payload
        return p
      })
    },
    // [REMOVE_PRODUCT]: (state, payload) => {
    //   state.showLoader = true
    // },
    // [REMOVE_PRODUCT_SUCCESS]: (state, payload) => {
    //   state.showLoader = false
    //   const index = state.products.findIndex(p => p._id === payload)
    //   console.debug('index', index)
    //   state.products.splice(index, 1)
    // },
    // [ERROR_MSG] (state, payload) {}
  }
  
  export const cartMutations = {
    [ADD_TO_CART]: (state, payload) => {
      payload = Object.assign({}, payload, { quantity: 1 })
      state.cart.push(payload)
      // console.log(state.cart, state.cart.length)
    },
    [UPDATE_CART_NO_STOCK]: (state, product_id) => {
      const index = state.cart.findIndex(p => p.id === product_id)
      state.cart[index].quantity = 0
    },
    [INCREMENT_CART_QUANTITY]: (state, product_id) => {
      const index = state.cart.findIndex(p => p.id === product_id)
      state.cart[index].quantity = state.cart[index].quantity + 1
      // console.log(state.cart, state.cart.length, index)
    },
    [DECREMENT_CART_QUANTITY]: (state, product_id) => {
      const index = state.cart.findIndex(p => p.id === product_id)
      state.cart[index].quantity = state.cart[index].quantity - 1
      // console.log(state.cart, state.cart.length, index)
    },
    [REMOVE_FROM_CART]: (state, product_id) => {
      const index = state.cart.findIndex(p => p.id === product_id)
      state.cart.splice(index, 1)
      // console.log('CART STATE', state.cart, state.cart.length, index)
    }
  }
  
  // export const manufacturerMutations = {
  //   [ALL_MANUFACTURERS] (state) {
  //     state.showLoader = true
  //   },
  //   [ALL_MANUFACTURERS_SUCCESS] (state, payload) {
  //     state.showLoader = false
  //     state.manufacturers = payload
  //   }
  // }

  export const authMutations = {
    [SET_AUTH_STATE] (state, authState) {
      state.authorized = authState === 'signedin' ? true : false;
    },
    [SET_AUTH_DATA](state, authData) {
      state.user = authData
      // if(authData!==undefined)
      //   state.user = authData.attributes
      // else
      //   state.user = null
      // if(authData && authData.signInUserSession) {
      //   state.user = authData.attributes
        // console.log('STORE_USER', state.user)
      // }
    } 
  }

  export const settingMutations = {
    [STORE_OPEN] (state, payload) {
      state.open = payload
    }
  }

  export const adminMutations = {
    [ALL_ORDERS] (state, payload) {
      state.orders = payload
    },
    [ADD_TO_ORDERS] (state, payload) {
      const index = state.orders.findIndex(order => order.id === payload.id)
      if(index===-1)
        state.orders.push(payload)
    },
    [ADD_TO_USERS] (state, payload) {
      const index = state.users.findIndex(user => user[0].Value === payload[0].Value)
      if(index===-1)
        state.users.push(payload)
    }
  }
  