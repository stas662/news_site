<template>
  <PostContent titlePost="Новости"
               :array="this.$store.getters['posts/newsPosts']"/>
</template>

<script>
import PostContent from '@/components/PostContent.vue'

export default {
  components: { PostContent }
}
</script>
