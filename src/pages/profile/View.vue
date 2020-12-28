<template>
	<b-card no-body class="overflow-hidden" style="max-width: 540px;">
		<b-row no-gutters>
			<b-col md="3" class="text-center p-3">
				<b-avatar variant="primary" size="lg" class="align-self-center" :text="shortName"></b-avatar>
			</b-col>
			<b-col md="9">
				<b-card-body :title="user.name">
					<b-card-text>
						Email: <strong>{{user.email}}</strong><br>
						Mobile: <strong>{{user.phone_number}}</strong><br>
						<div class="clearfix py-3">
							<span class="float-left">
								<small>Address</small> <br>
								{{user.address}}, Kaiga Township <br>
								Mallapur, Karwar<br>
								Karnataka <br>
								PIN: 581400 <br>
							</span>
							<b-button :to="'/profile/edit'" variant="light" class="float-right"><b-icon-pencil></b-icon-pencil></b-button>
						</div>
					</b-card-text>
				</b-card-body>
			</b-col>
		</b-row>
	</b-card>
</template>

<script>
export default {
	name: 'Profile',
	data() {
		return {
			user: this.$store.state.user
		}
	},
	computed: {
		shortName() {
			return this.user.name.match(/\b(\w)/g).join('')
		}
	}
}
</script>