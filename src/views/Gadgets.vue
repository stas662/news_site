<template>
  <PostContent titlePost="Гаджеты"
               :array="this.$store.getters['posts/filterPosts']('Гаджеты')"/>
</template>

<script>
import PostContent from '@/components/PostContent.vue'

export default {
  components: { PostContent }
}
</script>
