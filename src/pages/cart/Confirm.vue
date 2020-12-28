<template>
	<div class="text-center mt-5">
		<div class="p-3 mb-3 shadow-sm">
			<b-icon icon="box-seam" animation="cylon" scale="8" class="mb-5"></b-icon>
			<h3 class="mt-5 text-success">Congratulations! Your order is confirmed. Expect delivery in a day. </h3>
			<template v-for="product in cart">
				<confirm-item :product="product" :time="time" :key="product.id"></confirm-item>
			</template>
		</div>
	</div>
</template>

<script>
import ConfirmItem from '@/components/cart/ConfirmItem'

export default {
	name: 'order-confirm',
	data() {
		return {
			cart: this.$store.state.cart,
			time: Math.floor((new Date()).getTime()/1000)
		}
	},
	components: {
		'confirm-item' : ConfirmItem
	}
}
</script>