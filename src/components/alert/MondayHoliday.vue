<template>
	<div>
		<b-alert variant="danger" :show=show > 
      <h4 class="alert-heading">Monday Holiday!</h4>
      <p>There will be no deliveries in Monday, so no orders will be accepted from Sunday evening. We will back online at around 5:00 PM in Monday evening.</p>
    </b-alert>
	</div>
</template>

<script>
export default {
	data() {
		const date = new Date()

		return {
			show : (date.getDay() == 0 && date.getHours() > 10) || (date.getDay() == 1 && date.getHours() > 15)
		}
	}
}
</script>