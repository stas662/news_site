<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
button {
  background: transparent;
  border: 1px solid #EEE;
  padding: 15px 30px;
  cursor: pointer;
  border-radius: 5px;
  max-width: 700px;
}
button:hover {
  background: #d42c2f;
  border: 1px solid #1d2125;
}
</style>
