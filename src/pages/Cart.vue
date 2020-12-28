<!-- ./src/pages/Cart.vue -->
<template>
  <b-container class="py-3">
    <b-row>
      <b-col cols="12" md="8" shadow>
        <div class="border-bottom">
          <h2>My Cart({{this.$store.state.cart.length}})</h2>
        </div>
        <template v-for="product in cart">
          <cart-item :product="product" :key="product.id"></cart-item>
        </template>

        <div class="py-3 shadow-top">
          <b-button :to="'/checkout'" variant="warning" size="lg" class="float-right"> PLACE ORDER</b-button>
        </div>

      </b-col>
      <b-col cols="12" md="4">
        <div class="shadow-sm p-2">
          <h5 class="border-bottom text-secondary pb-3 mb-3">PRICE DETAILS</h5>
          <template v-for="product in cart">
            <div :product="product" :key="product.id">
              <p class="text-secondary">{{ product.name }}</p>
              <p class="clearfix">
                <span class="float-left">{{ product.price }} X {{ product.quantity }} </span>
                <span class="float-right">&#8377; {{ product.price*product.quantity }}</span>
              </p>
            </div>
          </template>
          <div>
            <p class="clearfix">
              <span class="float-left">Delivery Charges</span>
              <span class="float-right text-success">FREE</span>
            </p>
          </div>
          <div class="border-top border-bottom py-3">
            <p class="clearfix my-0">
              <strong class="float-left">Total Amount</strong>
              <strong class="float-right">&#8377; {{totalAmount()}}</strong>
            </p>
          </div>
          <div class="mt-3">
            <div class="clearfix mb-3">
              <h5 class="float-left">Delivery To: </h5>
              <b-button :to="'/profile'" variant="secondary" size="sm" class="float-right"><b-icon-pencil></b-icon-pencil> Update Address</b-button>
            </div>
            
            <address class="text-secondary">
              <strong>{{this.$store.state.user.name}}</strong><br>
              {{this.$store.state.user.address}}, Kaiga Township <br>
              Mallapur, Karwar <br>
              Karnataka <br>
              PIN: 581400 <br>
              Email: <strong>{{this.$store.state.user.email}}</strong><br>
              Phone No: <strong>{{this.$store.state.user.phone_number}}</strong><br>
            </address>
          </div>

        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import CartItem from '@/components/product/CartItem.vue'
  
  export default {
    name: 'cart',
    created() {
      // console.log('USER_ID', this.$store.state.user.sub)
      console.log('CART_ITEMS', this.$store.state.cart)
    },
    data () {
      return {
        msg: 'Welcome to the Cart Page',
        cart: this.$store.state.cart 
      }
    },
    components: {
      'cart-item': CartItem
    },
    methods : {
      totalAmount(){
        let amount = 0;
        this.cart.forEach(element => {
          amount = amount + element.price*element.quantity
        });
        return amount;
      }
    }
  }
</script>