<template>
  <div id="app" >
    <b-container class="p-0 bg-light" fluid>
      <v-menu />
      <b-container class="py-5 mb-3 bg-white" style="min-height: calc(100vh - 132px)">
        <!-- Route Outlet -->
        <router-view></router-view>
      </b-container>
      <v-footer />
    </b-container>
  </div>
</template>

<script>
import Vue from "vue";
import Menu from "@/components/Menu.vue";
import Footer from "@/components/Footer.vue";

import { Auth } from 'aws-amplify'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
Vue.component("v-menu", Menu);
Vue.component("v-footer", Footer);

export default {
  name: "App",
  created() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        // console.log('USER', user)
        // console.log('AUTH USER', user)
        this.$store.commit('SET_AUTH_STATE', 'signedin')
        this.$store.commit('SET_AUTH_DATA', {attributes: user.attributes, signInUserSession: user.signInUserSession})
      }).catch(err => {
        console.log(err)
        this.$store.commit('SET_AUTH_STATE', 'signedout')
        this.$store.commit('SET_AUTH_DATA', null)
      })

    onAuthUIStateChange((authState, authData) => {
      console.log('AUTH STATE', authState)
      if(authState === 'signedin') {
        this.$store.commit('SET_AUTH_STATE', authState)
        this.$store.commit('SET_AUTH_DATA', authData)
      } else {
        this.$store.commit('SET_AUTH_STATE', 'signedout')
        this.$store.commit('SET_AUTH_DATA', null)
      }
      
      // console.log('AUTHSTATE LOG', authState);
      // console.log('AUTHDATA LOG', authData);

      if(authState === 'signedin' && this.$route.path === '/login' )
        this.$router.push('/')
    })
    this.$store.dispatch('init')
    this.$store.dispatch('allProducts')
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  }
};
</script>



<style>
@import "~bootstrap/dist/css/bootstrap.css";
@import "~bootstrap-vue/dist/bootstrap-vue.css";

</style>