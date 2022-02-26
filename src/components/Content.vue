<template>
  <div class="inner-content">
    <div class="sub-inner-content">
      <div>
        <router-link :to="`/news`" class="content-title">Новости</router-link>
        <div class="content-body">
          <div class="content-block"
                v-for="(post, index) in this.$store.getters['posts/newsPosts']"
                :key="post">
            <div class="content-block-element" >
              <slot></slot>
              <router-link :to="`/news/${index + 1}`">
                <img :src="post.img" alt="">
                <div>{{post.title}}</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <router-link :to="`/articles`" class="content-title">Статьи</router-link>
        <div class="content-body">
          <div class="content-block"
                v-for="(post, index) in this.$store.getters['posts/articlesPosts']"
                :key="post">
            <div class="content-block-element" >
              <slot></slot>
              <router-link :to="`/articles/${index + 1}`">
                <img :src="post.img" alt="">
                <div>{{post.title}}</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sub-inner-new-content">
      <Authorization v-if="!this.$store.getters['users/isAuth']" />
      <SmallAccount v-else />
      <Popular class="popular" />
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
      imgUrl: '',
      saveUrl: null
    }
  },
  components: {
    Authorization,
    SmallAccount,
    Popular,
    Recommended
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inner-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.sub-inner-content {
  flex: 65%;
}

.sub-inner-new-content {
  margin-left: 5px;
  flex: 34%;
  display: flex;
  flex-direction: column;
}

.sub-inner-content > div {
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

.content-articlesposts {
  padding: 15px 0 0 0;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-title {
  padding: 5px;
  margin-left: 30px;
  font-size: 30px;
}

.content-title:hover {
  color: #808080;
}

.content-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 15px;
}

.content-block {
  display: flex;
  flex: 45%;
  margin: 10px;
}

.content-block-element {
  padding: 15px;
  font-weight: bold;
  box-shadow: inset 0px 0px 10px #333;
}

.content-block-element:hover {
  background: rgba(51, 51, 51, 0.3);
}

.content-block-element a div {
  padding: 10px 0;
  color: #fff;
  margin-bottom: auto;
  font-size: 25px;
  width: 100%;
}

.content-block-element a img {
  object-fit: cover;
  width: 100%;
}

@media screen and (max-width: 1150px) {
  .sub-inner-content {
    flex: 100%;
  }
  .sub-inner-new-content {
    margin-left: 0px;
  }
  .sub-inner-new-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
  }
  .popular {
    grid-auto-rows: auto;
    height: auto;
    grid-row: 1 / 4;
    grid-column: 2 / 4;
  }
}
@media screen and (max-width: 840px) {
  .sub-inner-new-content {
    display: flex;
  }
  .content-block-element a div {
    font-size: 19px;
  }
}

@media screen and (max-width: 700px) {
  .content-body {
    display: flex;
    flex-direction: column;
  }
  .content-block-element a img {
    width: 100%;
    /* height: 300px; */
  }
  .content-block-element a div {
    width: 100%;
  }
}

</style>
