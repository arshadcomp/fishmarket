<template>
  <div>
    <div class="title">
      <h1>New product</h1>
      <product-form @save-product="createProduct" :model="model"></product-form>
    </div>
  </div>
</template>

<script>
import ProductForm from '../../components/product/ProductForm.vue'

import { API } from 'aws-amplify';
import { createProduct } from '../../graphql/mutations';
import { onCreateProduct } from '../../graphql/subscriptions';

export default {
  name : 'New',
  created() {
    this.subscribe()
  },
  data() {
    return {
      model : {}
    }
  },
  methods : {
    async createProduct() {
      // console.log('model', this.model)
      await API.graphql({
        query: createProduct,
        variables: {input: this.model},
      });
    },
    subscribe() {
      API.graphql({ query: onCreateProduct })
        .subscribe({
          next: (eventData) => {
            // console.log('Product added', eventData)
            let productId = eventData.value.data.onCreateProduct.id
            this.$router.push({name: 'View', params: { id: productId }})
          }
        });
    }
  },
  components: {
    'product-form' : ProductForm
  }
}
</script>