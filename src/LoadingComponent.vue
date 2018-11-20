<template>
  <div class="loading">
    <p v-if="nbComponents > 0">{{ currentCaption }}...</p>
  </div>
</template>

<script>
import Bus from './Bus'
import _ from 'underscore'

export default {
  data () {
    return {
      nbComponents: 0,
      nbFinished: 0,
      nbFailed: 0,
      isLoading: false,
      components: [],
      currentComponent: null
    }
  },
  computed: {
    currentCaption: function () {
      return !_.isNull(this.currentComponent) ? this.currentComponent.caption : null
    },
    currentId: function () {
      return !_.isNull(this.currentComponent) ? this.currentComponent.id : null
    }
  },
  methods: {
    registerComponent: function (data) {
      this.isLoading = true;
      // data.id and data.caption (caption can be undefined)
      this.components.push(data)
      if (this.currentComponent == null) {
        this.setCurrentComponent();
      }
      this.nbComponents++
    },
    componentEndLoading: function (id) {
      this.nbFinished++
      this.popComponent(id)
    },
    fail (id) {
      this.nbFailed++
      this.popComponent(id)
    },
    setCurrentComponent: function () {
      this.currentComponent = this.components.shift()
    },
    popComponent: function (id) {
      if (this.currentComponent !== null && this.currentComponent.id == id) {
        if (this.components.length > 0) {
          this.setCurrentComponent ()
        }
      } else {
        // remove from array of components
        if (this.components.length > 0) {
          this.components = !_.without(this.components, _.findWhere(this.components, {id}))
        }
      }
    }
  },
  watch: {
    nbFinished: function () {
      if(this.nbComponents > 0) {
        if (this.nbFinished + this.nbFailed == this.nbComponents) {
          this.nbComponents = 0
          this.nbFinished = 0
          this.nbFailed = 0
          this.isLoading = false
          this.currentComponent = null
          this.components = []
        }
      }
    }
  },
  created () {
    Bus.$on('start_loading', this.registerComponent);
    Bus.$on('end_loading', this.componentEndLoading);
    Bus.$on('fail_loading', this.fail);
  }  
}
</script>

