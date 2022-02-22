<template>
  <PostContent titlePost="Космос"
               :array="this.$store.getters['posts/filterPosts']('Космос')"/>
</template>

<script>
import PostContent from '@/components/PostContent.vue'

export default {
  components: { PostContent }
}
</script>
