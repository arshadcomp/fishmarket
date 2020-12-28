<template>
	<div>
		<div v-for="order in orders" :key="order.id">
			<order-item :order="order"></order-item>
		</div>
	</div>
</template>

<script>
import OrderItem from '@/components/admin/OrderItem'

export default {
	data()  {
		return {
			orders: this.$store.getters.allOrders
		}
	},
	watch: {
		'$store.state.orders': function() {
			this.orders = this.$store.state.orders
		}
	},
	components : {
		'order-item' : OrderItem,
	}
}
</script>