<template>
  <div>
    <router-link :to="`/${this.ref}`" class="content-articlesposts__title">{{postName}}</router-link>
    <div class="content-articlesposts__body">
      <div class="content-articlesposts__block"
            v-for="(post, index) in arrayPosts"
            :key="post">
        <div class="content-articlesposts__element" >
          <slot></slot>
          <router-link :to="`/${this.ref}/${index + 1}`">
            <img :src="post.img" alt="">
            <div>{{post.title}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postName: {
      type: String,
      default: null
    },
    ref: {
      type: String,
      default: null
    },
    arrayPosts: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper-articlesposts {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 65%;
}

.content-articlesposts {
  padding: 15px 0 0 0;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-articlesposts__title {
  padding: 5px;
  margin-left: 30px;
  font-size: 30px;
}

.content-articlesposts__title:hover {
  color: #808080;
}

.content-articlesposts__body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 15px;
}

.content-articlesposts__block {
  display: flex;
  width: 100%;
}

.content-articlesposts__element {
  display: flex;
  width: 100%;
  margin: 15px;
  font-weight: bold;
  box-shadow: inset 0px 0px 10px #333;
}

.content-articlesposts__element:hover {
  background: rgba(51, 51, 51, 0.3);
}

.content-articlesposts__element a {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  text-decoration: none;
}

.content-articlesposts__element a div {
  padding: 10px 15px;
  color: #fff;
  margin-bottom: auto;
  font-size: 25px;
}

.content-articlesposts__element a img {
  width: 100%;
  max-width: 400px;
}

</style>
