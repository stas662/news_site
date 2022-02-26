<template>
  <div>
      <Carousel />
      <Content />
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import Content from '@/components/Content.vue'

export default {
  components: {
    Carousel,
    Content
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
