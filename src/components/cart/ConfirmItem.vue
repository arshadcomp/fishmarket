<template>
	<b-card class="mb-2 border-0">
		<b-row class="mb-1">
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
			<b-col cols="8 text-left">
				<router-link :to="'/product/details/'+product.id" class="product-link">
					<b-card-title :title="product.name"></b-card-title>
				</router-link>

				<small class="text-secondary"> Seller: FreshFishDevbag</small>
				<p class="mb-3"><strong>₹ {{ product.price }}</strong> <span class="text-secondary"> per {{product.unit}}</span></p>

				<b-alert v-if="confirm" show variant="success">ORDER CONFIRM</b-alert>
				<b-alert v-else show variant="warning"><b-spinner label="Spinning"></b-spinner> Wait for Order Confirmation...</b-alert>

			</b-col>
		</b-row>
	</b-card>
</template>

<script>
	import {
		REMOVE_FROM_CART,
		UPDATE_CART_NO_STOCK
	} from '../../store/mutation-types'

	import { API } from 'aws-amplify';
	import { getProduct } from '@/graphql/queries';
	import { createOrder } from '@/graphql/mutations';
	// import { updateProduct } from '@/graphql/mutations';
	import { onCreateOrder } from '@/graphql/subscriptions';

	
  export default {
		name: 'cart-item',
		async created() {
			this.getProduct()
			this.subscribeCreateOrder()
		},
		props: ['product', 'time'],
		data() {
			return {
				confirm: false
			}
		},
    methods : {
			async getProduct() {
				const product = await API.graphql({
					query: getProduct,
					variables : { id: this.product.id }
				});
				if(product.data.getProduct.stock > 0){
					//create order
					API.graphql({
							query: createOrder,
							variables: { input: {
								userID: this.$store.state.user.attributes.sub,
								productID: this.product.id,
								status: 'CONFIRM',
								quantity: this.product.quantity,
								amount: Math.floor(this.product.price*this.product.quantity),
								time: this.time
							}},
						})
						.then((data) => {
							console.log('ORDER CREATED', data)
							this.confirm = true
							this.remove()
							this.$store.dispatch('updateProduct', {
								id: this.product.id,
								stock: this.product.stock - this.product.quantity
							})
						})
						.catch( (error) => {
							console.log('ORDER NOT CREATED', error)
						})
					
					
					
					// try {
					// 	await API.graphql({
					// 		query: createOrder,
					// 		variables: { input: {
					// 			userID: this.$store.state.user.attributes.sub,
					// 			productID: this.product.id,
					// 			status: 'CONFIRM',
					// 			quantity: this.product.quantity,
					// 			amount: Math.floor(this.product.price*this.product.quantity),
					// 			time: this.time
					// 		}},
					// 	});
					// } catch (error) {
					// 	console.log(error)
					// }

					// this.$store.dispatch('updateProduct', {
					// 		id: this.product.id,
					// 		stock: this.product.stock - this.product.quantity
					// 	})
					
					// API.graphql({
					// 	query: updateProduct,
					// 	variables: {input: {
					// 		id: this.product.id,
					// 		stock: this.product.stock - this.product.quantity
					// 	}},
					// })
					// .then(() => {
					// 	this.$store.commit(UPDATE_PRODUCT_STOCK, {id:this.product.id, stock: this.product.quantity})
					// })
					// .catch(error => console.log(error))

					// try {
					// 	await API.graphql({
					// 		query: updateProduct,
					// 		variables: {input: {
					// 			id: this.product.id,
					// 			stock: this.product.stock - this.product.quantity
					// 		}},
					// 	});
					// } catch (error) {
					// 	console.log(error)
					// }
					//update stock
					
					
				} else {
					this.$store.commit(UPDATE_CART_NO_STOCK, this.product.id)
				}
					
			},
			subscribeCreateOrder() {
				API.graphql({ query: onCreateOrder }).subscribe({
					next: (eventData) => {
						console.log('Order Created', eventData)
						//remove from cart
						this.confirm = true
						this.remove()
					}
				});
			},
			remove() {
				this.$store.commit(REMOVE_FROM_CART, this.product.id)
			}
    }
  }
</script>