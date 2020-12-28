<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12" md="4">
          <b-list-group>
            <b-list-group-item><b-link to="/admin/new">New Product</b-link></b-list-group-item>
            <b-list-group-item><b-link to="/admin/products">View Products</b-link></b-list-group-item>
            <b-list-group-item><b-link to="/admin/orders">View Orders</b-link></b-list-group-item>
          </b-list-group>
          <div class="mt-2 p-2">
            <b-form-checkbox @change="toggle" v-model="storeStatus" switch size="lg">
              <span v-if="storeStatus">Booking Open</span>
              <span v-else>Booking Closed</span>
            </b-form-checkbox>
          </div>
        </b-col>
        <b-col cols="12" md="8">
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  data() {
    return {
      storeStatus: this.$store.state.open
    }
  },
  methods: {
    toggle() {
      this.$store.dispatch('setStoreStatus', !this.storeStatus)
    }
  }
}
</script>