<template>
  <div class="wrapper-newsposts">
    <div class="content-newsposts" style="flex: 65%">
      <router-link to="/news" class="content-newsposts__title">Новости</router-link>
      <div class="content-newsposts__body">
        <div class="content-newsposts__block"
             v-for="(post, index) in this.$store.getters['posts/newsPosts']"
             :key="post">
          <div class="content-newsposts__element" >
            <router-link :style="`background: url(${post.img}) center no-repeat;`"
                         :to="`/news/${index + 1}`">
              {{post.title}}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-left: 5px; flex: 34%; display: flex; flex-direction: column">
      <Authorization v-if="!this.$store.getters['users/isAuth']" />
      <SmallAccount v-else />
      <ArticlesPosts />
    </div>
  </div>
</template>

<script>
import Authorization from '@/components/Authorization.vue'
import ArticlesPosts from '@/components/ArticlesPosts.vue'
import SmallAccount from '@/components/SmallAccount.vue'

export default {
  data () {
    return {
      imgUrl: ''
    }
  },
  components: {
    Authorization,
    ArticlesPosts,
    SmallAccount
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

.content-newsposts {
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
  width: 50%;
}

.content-newsposts__element {
  display: flex;
  width: 100%;
  margin: 15px;
  height: 205px;
  font-weight: bold;
}

.content-newsposts__element a {
  width: 100%;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 35px;
  text-decoration: none;
  font-size: 25px;
}

.content-newsposts__element a:hover {
  box-shadow: inset 0px 0px 10px #333;
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
