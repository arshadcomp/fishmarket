<template>
	<b-card class="mb-2 border-0">
		<b-row class="mb-1">
			<b-col cols="8">
				<router-link :to="'/product/details/'+product.id" class="product-link">
					<b-card-title  :title="product.name" title-tag="h5"></b-card-title>
				</router-link>
				<p><small class="text-secondary mb-3"> Seller: FreshFishDevbag</small></p>
				<p><strong>₹ {{ product.price }}</strong> <span class="text-secondary"> per {{product.unit}}</span></p>
				<p><small>Delivery in a day | <span class="text-success">Free</span></small></p>
      </b-col>
			<b-col cols="4">
				<router-link :to="'/product/details/'+product.id" class="product-link">
					<b-card-img
						:src="product.image"
						alt="Product Image"
						class="rounded"
					>
					</b-card-img>
				</router-link>
			</b-col>
		</b-row>

		<b-row>
			<b-col cols="6">
				<b-button @click="remove" variant="danger" small>Remove</b-button>
			</b-col>
			<b-col cols="6">
				<b-input-group v-if="this.product.quantity > 0" style="max-width: 160px" class="ml-auto">
					<b-input-group-prepend>
						<b-button size="sm" text="Button" variant="info" @click="decrement"><b-icon icon="dash-circle"></b-icon></b-button>
					</b-input-group-prepend>
					<b-form-input v-model="product.quantity" class="text-center border-info"></b-form-input>
					<b-input-group-append>
						<b-button size="sm" text="Button" variant="info" @click="increment"><b-icon icon="plus-square"></b-icon></b-button>
					</b-input-group-append>
				</b-input-group>
				<h4 v-else class="text-danger text-center mt-2">Out of Stock</h4>
			</b-col>
		</b-row>
	</b-card>
</template>

<script>
	import {
		INCREMENT_CART_QUANTITY,
		DECREMENT_CART_QUANTITY,
		REMOVE_FROM_CART,
		UPDATE_CART_NO_STOCK
	} from '../../store/mutation-types'

	import { API } from 'aws-amplify';
	import { getProduct } from '@/graphql/queries';

	
  export default {
		name: 'cart-item',
		async created() {
			// console.log('ITEM', this.product)
			this.getProduct()
		},
		props: ['product'],
    methods : {
			async getProduct() {
				const product = await API.graphql({
					query: getProduct,
					variables : { id: this.product.id }
				});
				if(product.data.getProduct.stock <= 0)
					this.$store.commit(UPDATE_CART_NO_STOCK, this.product.id)
			},
      increment() {
				if(this.product.stock === undefined || this.product.stock === 0 || this.product.quantity === this.product.stock) return
				this.$store.commit(INCREMENT_CART_QUANTITY, this.product.id)
			},
			decrement() {
				if(this.product.quantity <= 1) return
				this.$store.commit(DECREMENT_CART_QUANTITY, this.product.id)
			},
			remove() {
				this.$store.commit(REMOVE_FROM_CART, this.product.id)
			}
    }
  }
</script>