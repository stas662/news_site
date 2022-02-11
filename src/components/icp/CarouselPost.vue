<template>
  <div style="margin: 0 15px;">
    <Post :idPost="this.$store.getters['posts/carouselPosts'][this.$route.params.id - 1].id"
          :titlePost="this.$store.getters['posts/carouselPosts'][this.$route.params.id - 1].title"
          :bodyPost="this.$store.getters['posts/carouselPosts'][this.$route.params.id - 1].body"
          :imgPost="this.$store.getters['posts/carouselPosts'][this.$route.params.id - 1].img"
          :arrayComments="this.$store.getters['comments/getComments'](this.$store.getters['posts/carouselPosts'][this.$route.params.id - 1].id)"
    />
  </div>
</template>

<script>
import Post from '@/components/icp/Post.vue'

export default {
  components: { Post }
}
</script>
