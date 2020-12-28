<template>
  <div>
    <h1>View Product</h1>
		<b-img :src=model.image rounded alt="Product Image" height="128"></b-img>
    <h2> {{ model.name }}</h2>
		<p>{{ model.description }}</p>
		<h4>Stock: <strong> {{ model.stock }} </strong></h4>
		<h4>Price: <strong> {{ model.price }} </strong></h4>
		<b-button :to="'/admin/edit/'+model.id" variant="primary"><b-icon-pencil></b-icon-pencil> Update</b-button>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { getProduct } from '../../graphql/queries';

export default {
	name: 'ViewProduct',
	async created() {
		this.getProduct()
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
				// variables : { price: 400 }
			});
			this.model = product.data.getProduct
		}
	}

}
</script>