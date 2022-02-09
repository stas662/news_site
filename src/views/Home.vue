<template>
  <div>
      <RecommendedPosts />
      <NewsPosts />
  </div>
</template>

<script>
import RecommendedPosts from '@/components/RecommendedPosts.vue'
import NewsPosts from '@/components/NewsPosts.vue'

export default {
  name: 'Content',
  components: { RecommendedPosts, NewsPosts }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
