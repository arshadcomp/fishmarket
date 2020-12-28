<template>
	<b-container class="py-3 px-0">
		<b-row>
			<b-col cols="12" md="8">
				<router-view></router-view>
			</b-col>
			<b-col cols="12" md="4">
				<price></price>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import Price from '@/components/cart/Price'

export default {
	name: 'Cart',
	components: {
		'price' : Price
	}
}
</script>