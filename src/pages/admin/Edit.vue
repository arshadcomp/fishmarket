<template>
  <div>
    <h1>Update Product</h1>
    <product-form
      @save-product="updateProduct"
      :model="model"
      :isEditing="true"></product-form>
  </div>
</template>

<script>
import ProductForm from '../../components/product/ProductForm.vue'

import { API } from 'aws-amplify';
import { getProduct } from '../../graphql/queries';
// import { updateProduct } from '../../graphql/mutations';
import { onUpdateProduct } from '../../graphql/subscriptions';

export default {
  name: 'EditProduct',
  async created() {
    console.log(this.$route.params.id)
    this.getProduct()
    this.subscribe();
  },
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async getProduct() {
      const product = await API.graphql({
        query: getProduct,
        variables : { id: this.$route.params.id }
      });
      this.model = product.data.getProduct
    },
    async updateProduct() {
      // console.log('Update Product', this.model)
      const model = {
        id: this.model.id,
        name: this.model.name,
        description: this.model.description,
        image: this.model.image,
        unit: this.model.unit,
        price: this.model.price,
        stock: this.model.stock
      }
      this.$store.dispatch('updateProduct', model)
    },
    subscribe() {
      API.graphql({ query: onUpdateProduct })
        .subscribe({
          next: () => {
            console.log('Product updated')
            const productId = this.model.id
            this.$router.push({name: 'View', params: { productId }})
          }
        });
    }
  },
  components: {
    'product-form' : ProductForm
  }
}
</script>