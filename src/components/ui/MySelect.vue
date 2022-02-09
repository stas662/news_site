<template>
  <select v-model="selectValue">
      <slot></slot>
  </select>
</template>

<script>
export default {
  data () {
    return {
      selectValue: 'Новость'
    }
  },
  props: {
    modelValueSelect: {
      type: String,
      default: null
    }
  },
  watch: {
    modelValueSelect: {
      handler () {
        this.selectValue = this.modelValueSelect
      }
    },
    selectValue: {
      handler () {
        this.$emit('update', this.selectValue)
      }
    }
  }
}
</script>

<style scoped>
select {
  background: transparent;
  border: 1px solid #EEE;
  padding: 15px 30px;
  cursor: pointer;
  margin: 0 10px;
}
</style>
