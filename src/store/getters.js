
export const productGetters = {
    // allId: state => state.products.result,
    // entities: state => state.products.entities,
    // allProducts: (state, getters) => {
    allProducts: (state) => {
      return state.products
      // const result = getters.allId
      // const entities = getters.entities
      //
      // return result.map(r => {
      //   const product = entities.products[r]
      //   // if (typeof product.manufacturer === Object) return
      //   console.log(entities.products[r], product.manufacturer)
      //   product.manufacturer = entities.manufacturer[product.manufacturer]
      //   return product
      // })
    },
    allProductsByStock: (state) => {
      const byStock = [...state.products]
      byStock.sort((productA, productB) => {
        if(productA.stock > productB.stock) 
          return -1
        if(productA.stock < productB.stock) 
          return 1
        return 0
      })
      return byStock
    },
    productById: (state, getters) => id => {
      // console.log('PRODUCT ID', id)
      if (getters.allProducts.length > 0) {
        return getters.allProducts.filter(p => p.id === id)[0]
      } else {
        return state.product
      }
    },
    allManufacturers: state => {
      return state.manufacturers
    }
  }

export const orderGetters = {
    allOrders: state => { return state.orders },
    orderById: (state, getters) => id => {
      // console.log('ORDER ID', id)
      if (getters.allUsers.length > 0) {
        return getters.allOrders.find(o => o.id === id)
      }
      return undefined
    }
  }

export const userGetters = {
    allUsers: state => { return state.users },
    userById: (state, getters) => id => {
      if (getters.allUsers.length > 0) {
        return getters.allUsers.find(u => {
          return u[0].Value === id
        })
      }
      return undefined
    },
    username: (state, getters) => id => {
      const user = getters.userById(id)
      if(user!==undefined)
        return user[3].Value
      return undefined
    },
    address: (state, getters) => id => {
      const user = getters.userById(id)
      if(user!==undefined)
        return user[1].Value
      return undefined
    },
    phone: (state, getters) => id => {
      const user = getters.userById(id)
      if(user!==undefined)
        return user[5].Value
      return undefined
    }
  }
  
export const manufacturerGetters = {
    allManufacturers: state => state.manufacturers
  }