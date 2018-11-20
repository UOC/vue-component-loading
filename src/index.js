import Bus from './Bus'
import LoadingMixin from './LoadingMixin';
import LoadingComponent from './LoadingComponent.vue'

export default {
  install(Vue, config = {}){
    Bus.init(Vue);
    Vue.mixin(LoadingMixin);
    Vue.component('vue-loading-component', LoadingComponent);
  }
}