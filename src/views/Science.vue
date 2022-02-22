<template>
  <PostContent titlePost="Наука"
               :array="this.$store.getters['posts/filterPosts']('Наука')"/>
</template>

<script>
import PostContent from '@/components/PostContent.vue'

export default {
  components: { PostContent }
}
</script>
