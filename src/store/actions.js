import { API } from 'aws-amplify';
import { getProduct } from '@/graphql/queries';
import { updateProduct } from '@/graphql/mutations';
import { listProducts } from '@/graphql/queries';

import {
  STORE_OPEN,
  // ADD_PRODUCT,
  // ADD_PRODUCT_SUCCESS,
  // PRODUCT_BY_ID,
  // PRODUCT_BY_ID_SUCCESS,
  // UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  // REMOVE_PRODUCT,
  // REMOVE_PRODUCT_SUCCESS,
  ALL_PRODUCTS,
  ALL_PRODUCTS_SUCCESS,
  // ALL_MANUFACTURERS,
  // ALL_MANUFACTURERS_SUCCESS
} from './mutation-types'

const PRODUCT_ID = '01d1db3b-1519-4a1f-9f50-9843678b7639'
// Local store Status holder product 
// const PRODUCT_ID = 'fe6913f6-d7bc-4a7d-9896-fa3d62a10055'

export const settingActions = {
  init({commit}) {
    API.graphql({
      query: getProduct,
      variables: {id: PRODUCT_ID}
    })
    .then(response => {
      // console.log('SETTINGS', response)
      if(response.data.getProduct.price <= 0)
        commit(STORE_OPEN, false)
      else
        commit(STORE_OPEN, true)
    })
    .catch(error => console.log('ERROR FETCHING SETTINGS', error));
  },
  setStoreStatus({commit}, payload) {
    API.graphql({
      query: getProduct,
      variables: {id: PRODUCT_ID}
    }).then(response => {
      // console.log('STORE_STATUS', response.data.getProduct.price)
      if(!payload) {
        API.graphql({
          query: updateProduct,
          variables: { input: {id: PRODUCT_ID, price: -1 }}
        }).then(() =>  { commit(STORE_OPEN, false); console.log('Store Closed') }  )
      } else {
        if(response.data.getProduct.price > 0)
          commit(STORE_OPEN, true)
        else
          API.graphql({
            query: updateProduct,
            variables: { input: {id: PRODUCT_ID, price: 200 }}
          }).then(() => { commit(STORE_OPEN, true); console.log('Store Open') })
      }
    })
  }
}

export const productActions = {
  allProducts ({commit}) {
    commit(ALL_PRODUCTS)
    // console.log('Going to read products')
    API.graphql({
      query: listProducts
    })
    .then(response => {
      commit(ALL_PRODUCTS_SUCCESS, response.data.listProducts.items)
      // console.log('Read all products')
    })
    .catch(error => console.log('ERROR FETCHING PRODUCTS', error));
  },
  // productById ({commit}, payload) {
  //   commit(PRODUCT_BY_ID)
  //   axios.get(`${API_BASE}/products/${payload}`).then(response => {
  //     console.log(payload, response.data)
  //     commit(PRODUCT_BY_ID_SUCCESS, response.data)
  //   })
  // },
  // addProduct ({commit}, payload) {
  //   commit(ADD_PRODUCT)
  //   axios.post(`${API_BASE}/products`, payload).then(response => {
  //     commit(ADD_PRODUCT_SUCCESS, response.data)
  //   })
  // },
  updateProduct ({commit}, payload) {
    API.graphql({
      query: updateProduct,
      variables: { input: payload }
    }).then((response) => { 
      commit(UPDATE_PRODUCT_SUCCESS, response.data.updateProduct) 
    })
  },
  // removeProduct ({commit}, payload) {
  //   commit(REMOVE_PRODUCT)
  //   axios.delete(`${API_BASE}/products/${payload}`, payload).then(response => {
  //     console.debug('response', response.data)
  //     commit(REMOVE_PRODUCT_SUCCESS, response.data)
  //   })
  // }
}



// export const manufacturerActions = {
//   allManufacturers ({commit}) {
//     commit(ALL_MANUFACTURERS)
//     axios.get(`${API_BASE}/manufacturers`).then(response => {
//       commit(ALL_MANUFACTURERS_SUCCESS, response.data)
//     })
//   }
// }