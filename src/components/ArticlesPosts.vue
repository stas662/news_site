<template>
  <div class="content-articlesposts">
    <router-link to="/articles" class="content-articlesposts__title">Статьи</router-link>
    <div class="content-articlesposts__body">
      <div class="content-articlesposts__block"
           v-for="(post, index) in this.$store.getters['posts/articlesPosts']"
           :key="post.id">
        <div class="content-articlesposts__element">
          <router-link :style="`background: url(${post.img}) center no-repeat;`"
                       :to="`/articles/${index + 1}`">
            {{post.title}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Articles'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-articlesposts {
  flex: 1 1 100%;
  padding: 15px 0 0 0;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-articlesposts__title {
  padding: 5px 0 0 0;
  margin-left: 15px;
  font-size: 30px;
}

.content-articlesposts__title:hover {
  color: #808080;
}

.content-articlesposts__body {
  flex-wrap: wrap;
}

.content-articlesposts__block {
  flex: 40%;
}

.content-articlesposts__element {
  display: flex;
  flex: 40%;
  margin: 15px;
  height: 230px;
  font-weight: bold;
}

.content-articlesposts__element a {
  flex: 40%;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 35px;
  text-decoration: none;
  font-size: 25px;
}

.content-articlesposts__element a:hover {
  box-shadow: inset 0px 0px 10px #333;
}

</style>
