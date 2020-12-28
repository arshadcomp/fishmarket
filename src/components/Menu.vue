<template>
  <!-- z-index provided for Amplify Auth Toasts -->
  <b-navbar toggleable="md" type="dark" variant="info" fixed="top" sticky style="z-index: 98">
    <b-container>
      <b-navbar-brand :to="'/'">
        <img alt="Fresh Fish Logo" class="bg-white p-1 rounded d-none d-sm-inline" src="https://fishmarket7637fd2abb174525baa11d46db22fe1c71752-dev.s3.ap-south-1.amazonaws.com/logo.svg" height="28">
        FreshFishDevbag
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto mr-3 b-block d-md-none">
        <b-nav-item :to="'/cart'"><b-icon icon="cart3" class="mr-1"></b-icon>
          <b-badge v-if="cartItemCount>0" variant="light">{{cartItemCount}} <span class="sr-only">Cart Items</span></b-badge>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="'/'" :active='$route.name==="Home"'>Home</b-nav-item>
          <b-nav-item :to="'/about'" :active='$route.name==="About"'>About</b-nav-item>
          <b-nav-item :to="'/contact'" :active='$route.name==="Contact"'>Contact Us</b-nav-item>
          <b-nav-item v-if="isAdmin" :to="'/admin'" :active='$route.name==="Admin"'>Admin</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!this.$store.state.authorized" :to="'/login'" class="mr-3">Login</b-nav-item>
          <b-nav-item-dropdown v-else right class="mr-3">
              <template #button-content>
                <b-icon icon="person-circle"></b-icon> {{username}}
              </template>
              <b-dropdown-item :to="'/profile'" class="py-2"><b-icon icon="person-fill" class="mr-2"></b-icon> Profile</b-dropdown-item>
              <b-dropdown-item :to="'/orders'" class="py-2"><b-icon icon="box-seam" class="mr-2"></b-icon> My Orders</b-dropdown-item>
              <b-dropdown-item class="py-2">
                <amplify-sign-out></amplify-sign-out>
              </b-dropdown-item>
          </b-nav-item-dropdown>
           <b-nav-item :to="'/cart'" class="d-none d-md-block"><b-icon icon="cart3" class="mr-1"></b-icon>
            <b-badge v-if="cartItemCount>0" variant="light">{{cartItemCount}} <span class="sr-only">Cart Items</span></b-badge>
          </b-nav-item>
        </b-navbar-nav>
        
      </b-collapse>
      
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name : 'Menu',
  computed : {
    isAdmin() {
      return this.$store.state.authorized &&
        this.$store.state.user.signInUserSession &&
        this.$store.state.user.signInUserSession.accessToken &&
        this.$store.state.user.signInUserSession.accessToken.payload &&
        this.$store.state.user.signInUserSession.accessToken.payload['cognito:groups'] &&
        this.$store.state.user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('admin')!==-1;
    },
    username() {
      if(this.$store.state.authorized)
        return this.$store.state.user.attributes.name
      return ''
    },
    cartItemCount() {
      return this.$store.state.cart.length
    }
  },
	data() {
    return {
      user: this.$store.state.user,
      authorized: this.$store.state.authorized
    }
  }
};
</script>