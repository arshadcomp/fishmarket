<template>  
  <b-container class="p-0">
    <b-row>
      <template v-for="product in products">
        <product-item :product="product" :key="product.id"></product-item>
      </template>
    </b-row>
  </b-container>
</template>

<script>
  import ProductItem from './ProductItem.vue'

  // import { API } from 'aws-amplify'
  // import { onListProduct } from '@/graphql/subscriptions'

  export default {
    name: 'product-list',
    created() {
      this.getProducts()
    },
    data() {
      return {
        products: this.$store.getters.allProductsByStock
      }
    },
    methods : {
      truncated(description) {
        return description.length < 128 ? description :  description.substring(0,128)+"..."
      },
      getProducts() {
        this.$store.watch(
          () => {
            return this.$store.getters.allProductsByStock
          },
          () => {
            this.products = this.$store.getters.allProductsByStock
          }
        )
      }
    },
    components: {
      'product-item': ProductItem
    }
  }
</script>