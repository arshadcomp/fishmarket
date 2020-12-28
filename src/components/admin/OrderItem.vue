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
			<b-row class="mb-1">
				<b-col cols=12>
					ORDER ID: <strong>{{order.id.substr(0,4).toUpperCase() }}</strong>
				</b-col>
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
						<b-card-title :title="product.name"></b-card-title>
					</router-link>

					<small class="text-secondary"> Seller: FreshFishDevbag</small>
					<p>
						<small>Quantity: <strong>{{order.quantity}} {{product.unit}}</strong></small>
					</p>
					

				</b-col>
				<b-col cols="4" md="2" class="text-center">
					<p class="mb-2"><strong>₹ {{ order.amount }}</strong></p>
					<p>FREE</p>
				</b-col>
				<b-col cols="8" md="4">
					<p v-if="order.status==='CONFIRM'">
						<small><b-icon icon="circle" variant="info"></b-icon> Ordered On</small><br>
						<small>{{this.getOrderDate()}}</small>
					</p>
					<p>
						<small><b-icon icon="circle" variant="warning"></b-icon> Delivery expected by</small><br>
						<small>{{this.getDeliveryDate()}}</small>
					</p>
				</b-col>
				<b-col cols="8">
					<small>Address</small><br>
					<p>
						<strong>{{username}}</strong><br>
						<strong>{{address}}</strong>, Kaiga Township<br>
						Mobile No: <strong> {{phone_number}}</strong>
					</p>
				</b-col>
				<b-col cols="4">
					<span v-if="order.status='CONFIRM'">
						<!-- <b-button @click="setStatus('DELIVERED')" size="sm" variant="success" class="mr-3">DELIVER</b-button>
						<b-button @click="setStatus('CANCELLED')" size="sm" variant="danger">CANCEL</b-button> -->
					</span>
					
					<b-button v-else-if="order.status='DELIVERED'" size="sm" variant="outline-success">DELIVERED</b-button>
					<b-button v-else-if="order.status='CANCELLED'" size="sm" variant="outline-success">CANCELLED</b-button>
				</b-col>

			</b-row>
		</b-card>
	</div>
</template>

<script>
	import { API } from 'aws-amplify';
	// import { Auth } from 'aws-amplify';
	// import { getProduct } from '@/graphql/queries';
	// import { updateOrder } from '@/graphql/mutations';
	// import { onUpdateOrder } from '@/graphql/subscriptions'

	import { ADD_TO_USERS } from '@/store/mutation-types'

  export default {
		name: 'order-item',
		created() {
			this.getProduct()
		},
		computed: {
			username() {
				return this.user[3].Value
			},
			address() {
				return this.user[1].Value
			},
			phone_number() {
				return this.user[5].Value
			}
		},
		props: ['order'],
		data() {
			return {
				product: {},
				user: {
					name: 'Loading',
					address: 'Loading',
					phone_number: 'Loading'
				},
				loading : true,
				date: new Date(Date.parse(this.order.createdAt))
			}
		},
    methods : {
			async getProduct() {
				this.product = this.$store.getters.productById(this.order.productID)
				const user = this.$store.getters.userById(this.order.userID)
				if(user!==undefined)
					this.user = user
				else{
					await API.get(
						'AdminQueries', 
						'/getUser', 
						{
							queryStringParameters: {
								"username": this.order.userID
							},
							headers: {
								'Content-Type' : 'application/json',
								// Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
								Authorization: this.$store.state.user.signInUserSession.getAccessToken().getJwtToken()
							}
						})
						.then(user => {
							this.loading = false
							this.user =  user.UserAttributes
							this.$store.commit(ADD_TO_USERS, this.user)
						})
				}
				
				/*
				const user = await API.get(
					'AdminQueries', 
					'/getUser', 
					{
						queryStringParameters: {
							"username": this.order.userID
						},
						headers: {
							'Content-Type' : 'application/json',
							// Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
							Authorization: this.$store.state.user.signInUserSession.getAccessToken().getJwtToken()
						}
					})
				

				
				
				this.user.name = user.UserAttributes.find(prop => prop.Name==='name').Value
				this.user.address = user.UserAttributes.find(prop => prop.Name==='address').Value
				this.user.phone_number = user.UserAttributes.find(prop => prop.Name==='phone_number').Value
				
				let order = this.order
				
				order.product = this.product
				order.user = this.user
				this.loading = false

				this.$store.commit(ADD_TO_ORDERS, order)
				*/

				// if user not found
			},
			// async setStatus(status) {
			// 	await API.graphql({
			// 		query: updateOrder,
			// 		variables: {input:  {id: this.order.id, status: status}}
			// 	});
			// },
			// subscribe() {
			// 	API.graphql({ query: onUpdateOrder })
			// 		.subscribe({
			// 			next: (event) => {
			// 				//DO not modify
			// 				// this.order.status = event.value.data.onUpdateOrder.status
			// 				console.log(event.value.data.onUpdateOrder.status)
			// 			}
			// 		});
			// },
			getOrderDate() {
				return new Date(Date.parse(this.order.createdAt)).toDateString()
			},
			getDeliveryDate() {
				let date = new Date(Date.parse(this.order.createdAt))
				if(date.getHours() > 8 )
					date.setTime(date.getTime() + 24*3600*1000)
				return date.toDateString()
			}
    }
  }
</script>