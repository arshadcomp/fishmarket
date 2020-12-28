<template>
	<b-container class="p-3">
		<b-row>
			<b-col cols="1">
				<b-icon icon="check2-square" variant="info"></b-icon>
			</b-col>
			<b-col cols="9">
				<h6 class="text-secondary">LOGIN</h6>
				<strong>{{user.name}}</strong> <span>{{user.email}}</span>
			</b-col>
			<b-col cols="2">
				<b-button size="sm" variant="outline-info" class="float-right">CHANGE</b-button>
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