import Vue from 'vue';
import App from './App.vue';
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';

import router from "@/router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import store from './store';

Amplify.configure(aws_exports);

Vue.config.productionTip = false;

// Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
