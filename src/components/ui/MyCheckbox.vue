<template>
  <div v-for="item in optionsChecked" :key="item">
    <input type="checkbox" :id="item" :value="item" v-model="checkedValue" />
    <label :for="item">{{ item }}</label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedValue: []
    }
  },
  props: {
    modelValueChecked: {
      type: Array,
      default: null
    },
    optionsChecked: {
      type: Array
    }
  },
  watch: {
    modelValueChecked: {
      handler () {
        this.checkedValue = this.modelValueChecked
      }
    },
    checkedValue: {
      handler () {
        this.$emit('update:modelValueChecked', this.checkedValue)
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
