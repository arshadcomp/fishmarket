<template>
	<b-container class="p-3">
		<b-row>
			<b-col cols="1">
				<b-icon icon="check2-square" variant="info"></b-icon>
			</b-col>
			<b-col cols="9">
				<h6 class="text-secondary">DELIVERY ADDRESS</h6>
				{{user.address}}, Kaiga Township<br>
				Mallapur, Karwar <br>
				Uttara Kannada, Karnataka <br>
				PIN: 581400 <br>
			</b-col>
			<b-col cols="2">
				<b-button :to="'/profile'" variant="outline-info" size="sm" class="float-right">CHANGE</b-button>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
export default {
	data() {
		return {
			user: this.$store.state.user.attributes
		}
	}
}
</script>