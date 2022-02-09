<template>
  <div class="dialog" v-if="show" @click="hideDialog">
      <div class="dialog-content" @click.stop>
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  name: 'my-dialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>
.dialog {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(#fff, #fff, #fff, 0.6);
}
.dialog-content {
    margin: auto;
    background: #151a1e;
    border: 1px solid #eee;
    border-radius: 12px;
    width: auto;
    height: auto;
    padding: 30px;
}
</style>
