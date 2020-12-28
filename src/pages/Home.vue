<template>
  <div>
    <caraousel class="mb-3 mt-n5"></caraousel>
    
    <b-alert variant="info" show>
      <h5>Now OTP will come in your registered email ID</h5>
      <hr>
      If you fail to recieve OTP for login or have trouble logging in, please send a WhatsApp message with mobile no, to <strong>9972707672</strong> and we will take care of the rest. </b-alert>
    <b-row>
      <b-col md="6">
        <b-alert variant="success" show>
          <h4 class="alert-heading">Account Details</h4>
          Name: Mahima Nandesh Mumbaikar <br>
          Account No: 39874952978 <br>
          IFSC Code: SBIN0007905 <br>
          <hr>
          <p class="mb-0">
            For online payments, please use the account number above and mention the <strong>ORDER ID</strong> and <strong>DATE</strong> in remarks.
          </p>
        </b-alert>
      </b-col>
      <b-col class="text-center">
        <b-img class="my-3" style="max-height: 200px" src="https://fishmarket7637fd2abb174525baa11d46db22fe1c71752-dev.s3.ap-south-1.amazonaws.com/qr_code.svg" fluid alt="QR Code"></b-img>
      </b-col>
    </b-row>


    
    
    <monday-holiday></monday-holiday>
    <b-alert v-if="!isOpen" variant="danger" show > 
      <h4 class="alert-heading">Closed for now!</h4>
      <p>We will back online around 5:00 PM in the evening with updated stock.</p>
    </b-alert>
    <b-alert variant="success" show>
      <h4 class="alert-heading">{{msg}}</h4>
      <p>
        To ensure you receive the most fresh product, all orders confirmed before 08:00 AM shall be delivered the same day.
      </p>
      <hr>
      <p class="mb-0">
        Orders after 08:00 AM will be delivered the next day based on stock availability.
      </p>
    </b-alert>
    <product-list></product-list>
  </div>
</template>

<script>
  import Caraousel from '../components/Caraousel.vue'
  import ProductList from '../components/product/ProductList.vue'
  import MondayHoliday from '../components/alert/MondayHoliday.vue'

  export default {
    name: 'home',
    data () {
      return {
        msg: 'Special delivery only for Kaiga Township',
      }
    },
    computed: {
      isOpen() {
        return this.$store.state.open
      }
    },
    components: {
      'caraousel' : Caraousel,
      'product-list': ProductList,
      MondayHoliday
    }
  }
</script>