<template>
  <div v-for="item in optionsRadio" :key="item">
    <input type="radio" :id="item" :value="item" v-model="radioValue">
    <label :for="item">{{ item }}</label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radioValue: ''
    }
  },
  props: {
    modelValueRadio: {
      type: String,
      default: null
    },
    optionsRadio: {
      type: Array
    }
  },
  watch: {
    modelValueRadio: {
      handler () {
        this.radioValue = this.modelValueRadio
      }
    },
    radioValue: {
      handler () {
        this.$emit('update:modelValueRadio', this.radioValue)
      }
    }
  }
}
</script>

<style scoped>
div {
  margin: auto 0;
}
div input {
  margin: auto 10px;
}
</style>
