<template>
	<b-container class="px-3">
		<b-row class="bg-info py-2 mb-3">
			<b-col cols="1">
				<b-icon icon="app" variant="white"></b-icon>
			</b-col>
			<b-col cols="11">
				<p class="text-white">PAYMENT OPTIONS</p>
			</b-col>
		</b-row>
        <b-row class="border-bottom mb-3">
            <b-col cols="1">
                <b-icon icon="check2-circle"></b-icon>
            </b-col>
            <b-col cols="11">
                <span>Cash on Delivery</span><br>
                <p class="text-secondary">Either you can pay in cash or transfer it to the UPI address at the time of delivery</p>
            </b-col>
        </b-row>
        <b-row class="border-bottom">
            <b-col cols="1">
                <b-icon icon="circle"></b-icon>
            </b-col>
            <b-col cols="11">
                <span>Other Options</span><br>
                <p class="text-danger">Coming Soon</p>
            </b-col>
        </b-row>
	</b-container>
</template>

<script>
export default {
	// data() {
	// 	return {
	// 		user: this.$store.state.user
	// 	}
	// }
}
</script>