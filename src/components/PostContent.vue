<template>
  <div class="wrapper-posts">
    <div class="sub-wrapper-posts">
      <div class="post-title">{{titlePost}}</div>
      <div class="post-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titlePost: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
.wrapper-posts {
  display: flex;
  flex-wrap: wrap;
}

.sub-wrapper-posts {
  width: 100%;
  padding: 15px 0;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.post-title {
  padding: 5px;
  margin-left: 15px;
  font-size: 30px;
}

.post-body {
  display: flex;
  flex-wrap: wrap;
}

</style>
