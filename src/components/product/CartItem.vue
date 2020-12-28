<template>
	<b-card class="mb-2">
		<b-row class="mb-1">
			<b-col cols="4">
				<router-link :to="'/product/details/'+product.id" class="product-link">
					<b-card-img
						:src="product.image"
						alt="Product Image"
						class="rounded"
					>
					</b-card-img>
				</router-link>
      </b-col>
			<b-col cols="8">
				<router-link :to="'/product/details/'+product.id" class="product-link">
					<b-card-title :title="product.name"></b-card-title>
				</router-link>

				<small class="text-secondary"> Seller: FishKart</small>
				<p><strong>₹ {{ product.price }}</strong> <span class="text-secondary"> per {{product.unit}}</span></p>

			</b-col>
		</b-row>
		<b-row>
			<b-col cols="4">
				<b-input-group>
					<b-input-group-prepend>
						<b-button size="sm" text="Button" variant="secondary" @click="decrement"><b-icon icon="file-minus"></b-icon></b-button>
					</b-input-group-prepend>
					<b-form-input v-model="product.quantity" class="text-center"></b-form-input>
					<b-input-group-append>
						<b-button size="sm" text="Button" variant="secondary" @click="increment"><b-icon icon="plus-square"></b-icon></b-button>
					</b-input-group-append>
				</b-input-group>
			</b-col>
			<b-col cols="8">
				<b-button @click="remove" variant="danger" small>Remove</b-button>
			</b-col>
		</b-row>
	</b-card>
</template>

<script>
	import {
		// UPDATE_CART,
		INCREMENT_CART_QUANTITY,
		DECREMENT_CART_QUANTITY,
    REMOVE_FROM_CART
	} from '../../store/mutation-types'
	
  export default {
		name: 'cart-item',
		created() {
			console.log('ITEM', this.product)
		},
		props: ['product'],
    methods : {
      increment() {
				if(this.product.stock === undefined || this.product.stock === 0 || this.product.quantity === this.product.stock) return
				this.$store.commit(INCREMENT_CART_QUANTITY, this.product.id)
			},
			decrement() {
				if(this.product.quantity === 1) return
				this.$store.commit(DECREMENT_CART_QUANTITY, this.product.id)
			},
			remove() {
				this.$store.commit(REMOVE_FROM_CART, this.product.id)
			}
    }
  }
</script>