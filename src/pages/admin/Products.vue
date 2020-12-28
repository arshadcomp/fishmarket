<template>
  <div>
    <div class="title">
      <h1>This is Product List</h1>
      <div v-for="item in products" :key="item.id">
        <b-card no-body class="overflow-hidden mb-3">
          <b-row no-gutters>
            <b-col md="6">
              <b-link :to="'/admin/view/'+item.id">
                <b-card-img :src="item.image" height="200" alt="Image" class="rounded-0"></b-card-img>
              </b-link>
            </b-col>
            <b-col md="6">
              <b-card-body :title=item.name >
                <b-card-text>
                  {{ truncated(item.description) }}
                </b-card-text>
                <!-- <router-link :to="'/admin/edit/'+item.id"><i class="fa fa-pencil-square-o"></i> Update</router-link> -->
                <b-button :to="'/admin/edit/'+item.id" variant="primary"><b-icon-pencil></b-icon-pencil> Update</b-button>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { listProducts } from '@/graphql/queries';

export default {
  name: 'ListProducts',
  async created() {
    this.getProducts();
  },
  data() {
    return {
      products: []
    }
  },
  methods : {
    truncated(description) {
      return description.length < 128 ? description :  description.substring(0,128)+"..."
    },
    async getProducts() {
      const products = await API.graphql({
        query: listProducts
      });
      this.products = products.data.listProducts.items;
    },
  }
}


</script>