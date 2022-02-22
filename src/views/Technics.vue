<template>
  <PostContent titlePost="Техника"
               :array="this.$store.getters['posts/filterPosts']('Техника')"/>
</template>

<script>
import PostContent from '@/components/PostContent.vue'

export default {
  components: { PostContent }
}
</script>
