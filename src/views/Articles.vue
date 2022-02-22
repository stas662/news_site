<template>
  <PostContent titlePost="Статьи"
               :array="this.$store.getters['posts/articlesPosts']"/>
</template>

<script>
import PostContent from '@/components/PostContent.vue'

export default {
  components: { PostContent }
}
</script>
