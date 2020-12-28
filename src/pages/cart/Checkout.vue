<template>
	<div>
        <div class="shadow-sm mb-3">
            <login-check></login-check>
        </div>
        <div class="shadow-sm mb-3">
            <address-check></address-check>
        </div>
        <div class="shadow-sm mb-3">
            <order-summary></order-summary>
        </div>
        <div class="shadow-sm mb-3">
            <payment-option></payment-option>
        </div>
        <div class="mb-3">
            <b-button v-if="cart.length > 0" :to="'/cart/confirm'" variant="warning" size="lg" class="float-right"> CONFIRM ORDER</b-button>
        </div>
    </div>
</template>

<script>
import Login from '@/components/profile/Login'
import Address from '@/components/profile/Address'
import Summary from '@/components/cart/Summary'
import Payment from '@/components/cart/Payment'

export default {
    name: 'Checkout',
    data() {
		return {
			cart: this.$store.state.cart
		}
	},
    components: {
        'login-check' : Login,
        'address-check' : Address,
        'order-summary' : Summary,
        'payment-option' : Payment
    }
}
</script>