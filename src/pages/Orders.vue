<template>
	<b-container class="py-2 px-0">
		<b-row>
			<b-col cols="12" md="8" order-md="1" order="2">
				<h2>My Orders</h2>
				<div v-for="order in orders" :key="order.id">
					<order-item :order="order"></order-item>
				</div>
			</b-col>
			<b-col cols="12" md="4" order-md="2" order="1">
				<div class="text-center">
					<!-- <h3>Scan the QR code below to make payments</h3> -->
					<b-alert variant="success" show>Incase of online payment, compulsorily mention the <strong>ORDER ID</strong> and <strong>DATE</strong> in remarks.</b-alert>
					<b-img class="my-3" src="https://fishmarket7637fd2abb174525baa11d46db22fe1c71752-dev.s3.ap-south-1.amazonaws.com/qr_code.svg" fluid alt="QR Code"></b-img>

					<!-- <b-img :src="require('@/assets/qr_payment.png')" fluid alt="Responsive image"></b-img> -->
					<b-alert variant="secondary"  show>
						<p class="text-center">You can also pay to the account number below</p>
						<p class="clearfix mb-0">
							<span class="float-left">Name</span>
							<!-- <strong class="float-right">10387014917</strong> -->
							<strong class="float-right">Mahima Nandesh Mumbaikar</strong>
						</p>
						<p class="clearfix mb-0">
							<span class="float-left">Account No</span>
							<!-- <strong class="float-right">10387014917</strong> -->
							<strong class="float-right">39874952978</strong>
						</p>
						<p class="clearfix mb-0">
							<span class="float-left">IFSC Code</span>
							<strong class="float-right">SBIN0007905</strong>
						</p>
						<p class="clearfix">
							<span class="float-left">Branch</span>
							<strong class="float-right">SBI Sadashivgad</strong>
						</p>
					</b-alert>
				</div>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import { API } from 'aws-amplify'
// import { listOrders } from '@/graphql/queries'
import { byUserByTime } from '@/graphql/queries'

import OrderItem from '@/components/order/Item'

// import { Storage } from 'aws-amplify'

// Storage.get('qr_code.svg')
// 	.then(data => console.log('images from S3: ', data))
//   .catch(err => console.log('error',err))

// Storage.list('images/')
//   .then(data => console.log('images from S3: ', data))
//   .catch(err => console.log('error',err))

export default {
	async created() {
		// this.getQrCode()
		this.listOrders()
	},
	data()  {
		return {
			orders: [],
			// qrCode: 'Loading'
		}
	},
	components : {
		'order-item' : OrderItem
	},
	methods: {
		async listOrders() {
			const orders = await API.graphql({
				query: byUserByTime,
				variables: {
					userID: this.$store.state.user.attributes.sub
				}
			})

			// const orders = await API.graphql({
			// 	query: listOrders,
			// 	variables: {
			// 		filter: {
			// 			userID: {
			// 				eq: this.$store.state.user.attributes.sub
			// 			}	
			// 		}
			// 	}
			// })
			this.orders = orders.data.byUserByTime.items.reverse()
		},
		// getQrCode() {
		// 	Storage.get('qr_code.svg')
		// 	.then(data => {
		// 		console.log('images from S3: ', data)
		// 		this.qrCode = data
		// 	})
		// 	.catch(err => console.log('error',err))
		// }
	}
}
</script>