<template>
	<div>
		<div v-if="loading">
			<b-card class="mb-2 border-0 shadow-sm">
				<b-row class="mb-1">
					<b-col cols="2">
						<b-spinner label="Spinning"></b-spinner>
					</b-col>
					<b-col cols="4">
						Loading
					</b-col>
				</b-row>
			</b-card>
		</div>
		<b-card v-else class="mb-2 border-0 shadow-sm">
			<b-row class="mb-2">
				<b-col cols="12" class="text-secondary mb-1"><small>ORDER ID# <strong>{{order.id.substr(0,4).toUpperCase() }}</strong></small> </b-col>
				<b-col cols="4" md="2">
					<router-link :to="'/product/details/'+product.id" class="product-link">
						<b-card-img
							:src="product.image"
							alt="Product Image"
							class="rounded"
						>
						</b-card-img>
					</router-link>
				</b-col>
				<b-col cols="8" md="4">
					<router-link :to="'/product/details/'+product.id" class="product-link">
						<b-card-title :title="product.name" title-tag="h5"></b-card-title>
					</router-link>

					<small class="text-secondary"> Seller: FreshFishDevbag</small>
					<p class="text-secondary"><small>₹ {{order.amount/order.quantity}} X {{order.quantity}} ({{product.unit}})</small></p>
					

				</b-col>
				<b-col cols="4" md="2" class="text-center">
					<h3>₹ {{ order.amount }}</h3>
					<!-- <p class="mt-3 mt-md-0 mb-3"><strong>₹ {{ order.amount }}</strong></p> -->
				</b-col>
				<b-col cols="8" md="4">
					
					<p v-if="order.status==='CONFIRM'">
						<small><b-icon icon="circle" variant="success"></b-icon> Delivery expected by</small><br>
						<small>{{this.getDeliveryDate().toDateString()}}</small> | <small class="text-success">Free</small>
					</p>
					<p v-else-if="order.status==='DELIVERED'">
						<small><b-icon icon="circle" variant="success"></b-icon> Delivered on</small><br>
						<small>{{date.toDateString()}}</small>
					</p>
					
				</b-col>
			</b-row>
		</b-card>
	</div>
</template>

<script>
	import { API } from 'aws-amplify';
	import { getProduct } from '@/graphql/queries';

  export default {
		name: 'cart-item',
		async created() {
			this.getProduct()
		},
		props: ['order'],
		data() {
			return {
				product: {},
				loading : true,
				date: new Date(Date.parse(this.order.createdAt))
			}
		},
    methods : {
			async getProduct() {
				const product = await API.graphql({
					query: getProduct,
					variables : { id: this.order.productID }
				});
				this.product = product.data.getProduct
				this.loading = false
			},
			getDeliveryDate() {
				let date = new Date(Date.parse(this.order.createdAt))
				if(date.getHours() > 8 )
					date.setTime(date.getTime() + 24*3600*1000)
				return date
			}
    }
  }
</script>