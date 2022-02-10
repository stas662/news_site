<template>
  <div class="wrapper-newsposts">
    <div class="content-newsposts" style="flex: 65%">
      <div>
        <router-link to="/news" class="content-newsposts__title">Новости</router-link>
        <div class="content-newsposts__body">
          <div class="content-newsposts__block"
              v-for="(post, index) in this.$store.getters['posts/newsPosts']"
              :key="post">
            <div class="content-newsposts__element" >
              <router-link :to="`/news/${index + 1}`">
                <img :src="post.img" alt="">
                <div>{{post.title}}</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <router-link to="/news" class="content-newsposts__title">Статьи</router-link>
        <div class="content-newsposts__body">
          <div class="content-newsposts__block"
              v-for="(post, index) in this.$store.getters['posts/articlesPosts']"
              :key="post">
            <div class="content-newsposts__element" >
              <router-link :to="`/articles/${index + 1}`">
                <img :src="post.img" alt="">
                <div>{{post.title}}</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-left: 5px; flex: 34%; display: flex; flex-direction: column">
      <Authorization v-if="!this.$store.getters['users/isAuth']" />
      <SmallAccount v-else />
      <Popular />
      <Recommended />
    </div>
  </div>
</template>

<script>
import Authorization from '@/components/Authorization.vue'
import SmallAccount from '@/components/SmallAccount.vue'
import Popular from '@/components/Popular.vue'
import Recommended from '@/components/Recommended.vue'

export default {
  data () {
    return {
      imgUrl: ''
    }
  },
  components: {
    Authorization,
    SmallAccount,
    Popular,
    Recommended
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
.wrapper-newsposts {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.content-newsposts > div {
  padding: 15px 0 0 0;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-newsposts__title {
  padding: 5px;
  margin-left: 30px;
  font-size: 30px;
}

.content-newsposts__title:hover {
  color: #808080;
}

.content-newsposts__body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 15px;
}

.content-newsposts__block {
  display: flex;
  width: 100%;
}

.content-newsposts__element {
  display: flex;
  width: 100%;
  margin: 15px;
  font-weight: bold;
  box-shadow: inset 0px 0px 10px #333;
}

.content-newsposts__element:hover {
  background: rgba(51, 51, 51, 0.3);
}

.content-newsposts__element a {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  text-decoration: none;
}

.content-newsposts__element a div {
  padding: 10px 15px;
  color: #fff;
  margin-bottom: auto;
  font-size: 25px;
}

.content-newsposts__element a img {
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
