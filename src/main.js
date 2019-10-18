// @ts-nocheck
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VmBackTop from 'vue-multiple-back-top'

Vue.component(VmBackTop.name, VmBackTop)

Vue.config.productionTip = false

new Vue({
	vuetify,
	render: (h) => h(App),
}).$mount('#app')
