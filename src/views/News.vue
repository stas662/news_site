<template>
  <div class="wrapper-news">
    <div class="content-news">
      <div class="content-news__title">Новости</div>
      <div class="content-news__body">
        <div class="content-news__body-wrapper"
             v-for="(post, index) in this.$store.getters['posts/newsPosts']"
             :key="post">
          <div class="content-news__body-element" >
            <router-link :style="`background: url(${post.img}) center no-repeat;`"
                         :to="`/news/${index + 1}`">
              {{post.title}}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper-news {
  display: flex;
  flex-wrap: wrap;
}

.content-news {
  width: 100%;
  padding: 15px 0;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-news__title {
  padding: 5px;
  margin-left: 15px;
  font-size: 30px;
}

.content-news__body {
  display: flex;
  flex-wrap: wrap;
}

.content-news__body-wrapper {
  display: flex;
  min-width: 300px;
  width: 33%;
}

.content-news__body-element {
  display: flex;
  flex: 1 1 30%;
  margin: 15px;
  height: 355px;
  font-weight: bold;
}

.content-news__body-element a {
  color: #000;
  display: flex;
  flex: 1 1 30%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 35px;
  text-decoration: none;
  font-size: 25px;
}

.content-news__body-element a:hover {
  box-shadow: inset 0px 0px 10px #333;
}

</style>
