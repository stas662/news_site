<template>
  <div class="content-articles">
    <div class="content-articles__title">Статьи</div>
    <div class="content-articles__body">
      <div class="content-articles__block"
           v-for="(post, index) in this.$store.getters['posts/articlesPosts']"
           :key="post">
        <div class="content-articles__element">
          <router-link :style="`background: url(${post.img}) center no-repeat;`"
                       :to="`/articles/${index + 1}`">
            {{post.title}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-articles {
  /* padding: 15px 0; */
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-articles__title {
  padding: 5px;
  margin: 15px 0 0 15px;
  font-size: 30px;
}

.content-articles__body {
  display: flex;
  flex-wrap: wrap;
}

.content-articles__block {
  display: flex;
  width: 33%;
  min-width: 300px;
}

.content-articles__element {
  display: flex;
  flex: 1 1 auto;
  margin: 15px;
  height: 355px;
  font-weight: bold;
}

.content-articles__element a {
  color: #000;
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
  align-items: center;
  padding: 35px;
  text-decoration: none;
  font-size: 25px;
}

.content-articles__element a:hover {
  box-shadow: inset 0px 0px 10px #333;
}

</style>
