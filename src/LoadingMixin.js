import Bus from './Bus'
import Vue from 'vue'

export default {
  methods: {
    startLoading(){
        this.$options.load = true;
        var data = {}
        
        var loadingId = this.$options.loadingId
        if (loadingId) {
          data.id = loadingId
          data.caption = this.$options.loadingCaption
        }

        Bus.$emit('start_loading', data)
    },

    endLoading(){
        this.$options.load = false;
        var loadingId = this.$options.loadingId
        Bus.$emit('end_loading', loadingId);
    },
    failLoading(){
        this.$options.load = false;
        var loadingId = this.$options.loadingId
        Bus.$emit('fail_loading', loadingId);
    }
  },
  beforeCreate(){
    Vue.util.defineReactive(this.$options, 'load', false);
    if(!this.$options.computed){
        this.$options.computed = {}
    }
    this.$options.computed["loading"] = function() {
        return this.$options.load;
    };
  }
}