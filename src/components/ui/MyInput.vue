<template>
    <input v-model="inputValue" :placeholder="placeholderText">
</template>

<script>
export default {
  data () {
    return {
      inputValue: ''
    }
  },
  props: {
    modelValue: {
      type: String,
      default: null
    },
    placeholderText: {
      type: String,
      default: null
    }
  },
  watch: {
    modelValue: {
      handler () {
        this.inputValue = this.modelValue
      },
      immediate: true
    },
    inputValue: {
      handler () {
        this.$emit('update', this.inputValue)
      }
    }
  }
}
</script>

<style scoped>
input {
  outline: none;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #eee;
  border-radius: 5px;
  border: 1px solid transparent;
  background: #2b2c31;
  /* max-width: 700px; */
}
input:focus {
  border: 1px solid rgba(238, 238, 238, 1);
}
input:hover {
  border: 1px solid rgba(238, 238, 238, 0.6);
}
</style>
