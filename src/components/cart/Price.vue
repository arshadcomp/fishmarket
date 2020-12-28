<template>
	<div class="shadow-sm">	
		<div v-if="cart.length > 0">
			<h5 class="border-bottom text-secondary p-3 mb-3"><strong>PRICE DETAILS</strong></h5>
			<div class="p-3 mb-3 border-bottom">
				<template v-for="product in cart">
					<div v-if="product.quantity > 0" :product="product" :key="product.id" >
						<p class="text-secondary">{{ product.name }}</p>
						<p class="clearfix">
							<span class="float-left">{{ product.price }} X {{ product.quantity }} </span>
							<span class="float-right">&#8377; {{ product.price*product.quantity }}</span>
						</p>
					</div>
				</template>
			</div>
			
			<div class="px-3 py-1 mb-3 border-bottom">
				<p class="clearfix">
					<span class="float-left">Delivery Charges</span>
					<span class="float-right text-success">FREE</span>
				</p>
			</div>
			<div class="p-3 mb-3">
				<p class="clearfix my-0">
					<strong class="float-left">Total Amount</strong>
					<strong class="float-right">&#8377; {{totalAmount}}</strong>
				</p>
			</div>
		</div>
		<div v-else class="text-center py-5 px-2">
			<p class="mt-3">Goto</p>
			<b-button :to="'/orders'" variant="info" size="lg">MY ORDERS</b-button><br>
			<p class="mt-3">to track your order</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CartPrice',
	data() {
		return {
			cart: this.$store.state.cart
		}
	},
	computed: {
		totalAmount() {
			let amount = 0;
			this.cart.forEach(element => {
				amount = amount + element.price*element.quantity
			});
			return amount;
		}
	}
}
</script>