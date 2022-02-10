<template>
  <div>
      <Carousel />
      <NewsPosts />
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import NewsPosts from '@/components/NewsPosts.vue'

export default {
  name: 'Content',
  components: { Carousel, NewsPosts }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
