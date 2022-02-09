<template>
  <textarea v-model="textareaValue" :placeholder="placeholderText" :style="styleTextarea"></textarea>
</template>

<script>
export default {
  data () {
    return {
      textareaValue: ''
    }
  },
  props: {
    modelValueTextarea: {
      type: String,
      default: null
    },
    placeholderText: {
      type: String,
      default: null
    },
    styleTextarea: {
      type: String,
      default: null
    }
  },
  watch: {
    modelValueTextarea: {
      handler () {
        this.textareaValue = this.modelValueTextarea
      }
    },
    textareaValue: {
      handler () {
        this.$emit('update', this.textareaValue)
      }
    }
  }
}
</script>

<style scoped>
textarea {
  outline:none;
  resize: none;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid transparent;
  color: #eee;
  height: 200px;
  background: #2b2c31;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
textarea:focus {
  border: 1px solid rgba(238, 238, 238, 1);
}
textarea:hover {
  border: 1px solid rgba(238, 238, 238, 0.6);
}
</style>
