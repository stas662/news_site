<template>
  <div class="wrapper-articlesposts">
    <div class="content-articlesposts">
      <router-link to="/news" class="content-articlesposts__title">Новости</router-link>
      <div class="content-articlesposts__body">
        <div class="content-articlesposts__block"
             v-for="(post, index) in this.$store.getters['posts/articlesPosts']"
             :key="post">
          <div class="content-articlesposts__element" >
            <router-link :to="`/news/${index + 1}`">
              <img :src="post.img" alt="">
              <div>{{post.title}}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      imgUrl: ''
    }
  }
  // Кнопка дозагрузки постов
  // data () {
  //   return {
  //     nextItem: 4
  //   }
  // },
  // mounted () {
  //   const listElm = document.querySelector('#infinity-news-home')
  //   listElm.addEventListener('click', e => {
  //     this.nextItem += 2
  //   })
  // }
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

/* Стили для кнопки дозагрузки */
/* #infinity-news-home {
  margin: 10px auto 0 auto;
  cursor: pointer;
  width: 100%;
  height: 30px;
  color: #eee;
  font-size: 18px;
  border: none;
  border-top: 3px solid #151a1e;
  background: none;
}
#infinity-news-home:hover {
  background: #151a1e;
} */

</style>
