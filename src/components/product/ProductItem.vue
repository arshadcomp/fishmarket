<template>
  <b-col cols="12" sm="6" md="4" lg="3" class="mb-3">
    <b-card class="mb-2 h-100" no-body>
      <router-link :to="'/product/detail/'+product.id">
        <b-card-img-lazy
          :src="product.image"
          :height=200
          alt="Product Image"
          top
        >
        </b-card-img-lazy>
      </router-link>
      <b-card-body>
        <router-link :to="'/product/detail/'+product.id">
          <b-card-title :title="product.name"></b-card-title>
        </router-link>
        
        <b-card-text>
          <h3> &#8377; {{ product.price }} <small class="text-secondary">/ {{product.unit}}</small> </h3>
          <h6 v-if="inStock" class="text-right text-danger"><em>Only {{product.stock}} left</em></h6>
          <small>{{ truncate(product.description) }}</small>
        </b-card-text>

      </b-card-body>
      <b-card-footer class="bg-white">
        <product-button :product="product"></product-button>
      </b-card-footer>
    </b-card>
  </b-col>
</template>

<script>
  import ProductButton from './ProductButton.vue'
  export default {
    name: 'product-item',
    props: ['product'],
    components: {
      'product-button': ProductButton
    },
    computed : {
      inStock() {
        return this.product.stock > 0
      }
    },
    methods : {
      truncate(description) {
        return description.length < 128 ? description :  description.substring(0,128)+"..."
      },
    }
  }
</script>