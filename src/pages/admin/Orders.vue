<template>
	<div>
		<div class="mb-3">
			<b-form inline class="mb-3">
				<label for="from-datepicker" class="mb-2 mr-sm-2 mb-sm-0">From</label>
				<b-form-datepicker id="from-datepicker" value-as-date v-model="fromDate" class="mb-2 mr-sm-2 mb-sm-0"></b-form-datepicker>
				<b-form-timepicker v-model="fromTime" locale="en" class="mb-2 mr-sm-2 mb-sm-0"></b-form-timepicker>
			</b-form>
			
			<b-form inline class="mb-3">
				<label for="to-datepicker" class="mb-2 mr-sm-2 mb-sm-0">To</label>
				<b-form-datepicker id="to-datepicker" value-as-date v-model="toDate" class="mb-2 mr-sm-2 mb-sm-0"></b-form-datepicker>
				<b-form-timepicker v-model="toTime" locale="en" class="mb-2 mr-sm-2 mb-sm-0"></b-form-timepicker>
			</b-form>

			<p class="clearfix">
				<span class="float-left">
					<select v-model="orderStatus">
						<option>CONFIRM</option>
						<option>DELIVERED</option>
						<option>CANCELLED</option>
					</select>
				</span>
				<span class="float-right">
					<b-button variant="primary" @click="loadOrders">Fetch Orders</b-button>
				</span>
			</p>
		</div>

		<div>
			<h2>{{orderStatus}} ORDERS</h2>
			<order-list></order-list>
			<print-order-list :status="orderStatus" :date="toDate"></print-order-list>
			<!-- <b-button variant="primary" @click="print">Download PDF</b-button> -->
		</div>
	</div>
</template>

<script>
import {API} from 'aws-amplify'
import { byStatusByUser } from '@/graphql/queries'
import OrderList from '@/components/admin/OrderList.vue'
import PrintOrderList from '@/components/admin/PrintOrderList.vue'
import { ALL_ORDERS } from '@/store/mutation-types'


export default {
	data()  {
		let toTimestamp = new Date()
		toTimestamp.setHours(10,0,0)
		let fromTimestamp = new Date(toTimestamp.getTime() - 1*24*3600*1000)

		return {
			fromDate: fromTimestamp,
			fromTime: '16:00:00',
			toDate: toTimestamp,
			toTime: '09:00:00',
			
			orders: [],
			orderStatus: 'CONFIRM',
		}
	},
	components : {
		OrderList,
		PrintOrderList
	},
	methods: {
		loadOrders() {
			let time = this.fromTime.split(':')
			this.fromDate.setHours(time[0],time[1])
			time = this.toTime.split(':')
			this.toDate.setHours(time[0],time[1])

			// console.log('FROM', this.fromDate, 'TO', this.toDate)
			// console.log('FROM', this.fromDate.getTime(), 'TO', this.toDate.getTime())

			this.listOrders()
		},
		async listOrders() {
			const orders = await API.graphql({
				query: byStatusByUser,
				variables: {
					status: this.orderStatus,
					filter: {
						time: {
							between: [Math.floor(this.fromDate.getTime()/1000), Math.floor(this.toDate.getTime()/1000)]
						}
					}
				}
			})
			// console.log('ORDERS', orders)
			// this.orders = orders.data.byStatusByUser.items
			this.$store.commit(ALL_ORDERS, orders.data.byStatusByUser.items)
		}
	}
}
</script>