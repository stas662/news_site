<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
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
</style>
