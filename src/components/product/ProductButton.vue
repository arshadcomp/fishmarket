<template>
  <div>
    <span v-if="!storeOpen">
      <b-button disabled variant="danger" block>Booking Closed</b-button>
    </span>
    <span v-else>
      <span v-if="!inStock">
        <b-button disabled variant="outline-danger" block>Out of Stock</b-button>
      </span>
      <span v-else>
        <b-button v-if="isAdding" @click="addToCart" block variant="warning"> <b-icon icon="cart-plus"></b-icon> Add to Cart</b-button>
        <b-button v-else disabled variant="outline-warning" block>Item in Cart</b-button>
      </span>
    </span>
    <!-- <span v-if="inStock">
      <b-button v-if="isAdding" @click="addToCart" block variant="warning"> <b-icon icon="cart-plus"></b-icon> Add to Cart</b-button>
      <b-button v-else disabled variant="outline-warning" block>Item in Cart</b-button>
    </span>
    <span v-else>
      <b-button disabled variant="outline-danger" block>Out of Stock</b-button>
    </span> -->
    
  </div>
</template>

<script>
  import {
    ADD_TO_CART,
    REMOVE_FROM_CART
  } from '../../store/mutation-types'
  export default {
    props: ['product'],
    data () {
      return {
        cart: this.$store.state.cart,
        storeOpen : this.$store.state.open
      }
    },
    computed: {
      isAdding () {
        return this.cart.findIndex(p => p.id === this.product.id) < 0
        // return this.cart.indexOf(this.product) < 0
      },
      inStock() {
        return this.product.stock > 0
      }
    },
    methods: {
      addToCart () {
        this.$store.commit(ADD_TO_CART, this.product)
      },
      removeFromCart (id) {
        this.$store.commit(REMOVE_FROM_CART, id)
      }
    }
  }
</script>