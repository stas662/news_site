<template>
  <PostContent titlePost="Гаджеты">
    <div class="posts-container"
          v-for="(post, index) in this.$store.getters['posts/filterPosts']('Гаджеты')"
          :key="post">
      <div class="post-content" >
        <router-link :style="`background: url(${post.img}) center no-repeat;`"
                      :to="`/gadgets/${index + 1}`">
          {{post.title}}
        </router-link>
      </div>
    </div>
  </PostContent>
</template>

<script>
import PostContent from '@/components/PostContent.vue'

export default {
  components: { PostContent }
}
</script>

<style scoped>
.posts-container {
  display: flex;
  min-width: 300px;
  width: 33%;
}

.post-content {
  display: flex;
  flex: 1 1 30%;
  margin: 15px;
  height: 355px;
  font-weight: bold;
}

.post-content a {
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

.post-content a:hover {
  box-shadow: inset 0px 0px 10px #333;
}
</style>
