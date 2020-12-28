<template>
	<div class="shadow-sm">
		<h2 class="px-2 py-3 border-bottom">My Cart</h2>
		<div class="p-0 mb-3 border-bottom">
				<h5 v-if="cart.length === 0" class="p-3"><b-icon icon="exclamation-triangle" variant="danger"></b-icon> Sorry, Your Cart is Empty</h5>
				<template v-else v-for="product in cart">
						<item :product="product" :key="product.id"></item>
				</template>
		</div>
		<div class="mb-3">
				<b-button v-if="cart.length > 0 && stockAvailable" :to="'/cart/checkout'" variant="warning" size="lg" class="float-right"> PLACE ORDER</b-button>
				<b-button v-else-if="cart.length > 0 && !stockAvailable" disabled variant="warning" size="lg" class="float-right"> PLACE ORDER</b-button>
		</div>
	</div>
</template>

<script>
import Item from '@/components/cart/Item'

export default {
	data(){
		return {
			cart: this.$store.state.cart
		}
	},
	computed: {
		stockAvailable() {
			return this.cart.every(element => element.quantity > 0 );
		}
	},
	components : {
		'item': Item
	}
}
</script>