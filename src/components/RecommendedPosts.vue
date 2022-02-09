<template>
  <div class="content-recommendedposts" :key="slidesLen">
    <div @click="prev" class="content-recommendedposts__prev">
      <img src="~@/assets/left.png" alt="left">
    </div>
    <div v-for="(post, index) in this.$store.getters['posts/recommendedPosts']"
         :key="post"
         style="position: relative; margin: auto 0">
      <carousel-slide style="left: 50%" class="content-recommendedposts__block"
                      :index="index - 1"
                      :visibleSlide="visibleSlide"
                      :direction="direction">
        <div class="content-recommendedposts__element">
          <router-link :style="`background: url(${post.img}) center no-repeat;`"
                       :to="`/${index + 1}`">
            {{post.title}}
          </router-link>
        </div>
      </carousel-slide>
      <carousel-slide class="content-recommendedposts__block"
          :index="index"
          :visibleSlide="visibleSlide"
          :direction="direction"
        >
        <div class="content-recommendedposts__element">
          <router-link :style="`background: url(${post.img}) center no-repeat;`"
                       :to="`/${index + 1}`">
            {{post.title}}
          </router-link>
        </div>
      </carousel-slide>
      <carousel-slide style="left: 50%" class="content-recommendedposts__block"
          :index="index + slidesLen - 1"
          :visibleSlide="visibleSlide"
          :direction="direction"
        >
        <div class="content-recommendedposts__element">
          <router-link :style="`background: url(${post.img}) center no-repeat;`"
                       :to="`/${index + 1}`">
            {{post.title}}
          </router-link>
        </div>
      </carousel-slide>
    </div>
    <div @click="next" class="content-recommendedposts__next">
      <img src="~@/assets/right.png" alt="right">
    </div>
  </div>
</template>

<script>
import CarouselSlide from '@/components/CarouselSlide.vue'

export default {
  components: { CarouselSlide },
  data () {
    return {
      visibleSlide: 0,
      direction: 'left'
    }
  },
  computed: {
    slidesLen () {
      return this.$store.getters['posts/recommendedPosts'].length
    }
  },
  methods: {
    next () {
      if (this.visibleSlide >= this.slidesLen - 1) {
        this.visibleSlide = 0
      } else {
        this.visibleSlide++
      }
      this.direction = 'left'
    },
    prev () {
      if (this.visibleSlide <= 0) {
        this.visibleSlide = this.slidesLen - 1
      } else {
        this.visibleSlide--
      }
      this.direction = 'right'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.content-recommendedposts {
  /* display: flex; */
  overflow: hidden;
  justify-content: space-around;
  /* flex-wrap: wrap; */
  height: 300px;
  margin: 0 auto;
  position: relative;
  padding: 15px 40px;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-recommendedposts__prev,
.content-recommendedposts__next {
  position: absolute;
  top: 50%;
  font-size: 10px;
  text-decoration: none;
  color: #EEE;
  z-index: 5;
  cursor: pointer;
}

.content-recommendedposts__prev {
  left: -17px;
  transform: translate(50%, -50%);
}

.content-recommendedposts__next {
  right: -17px;
  transform: translate(-51%, -51%);
}

.content-recommendedposts__prev img,
.content-recommendedposts__next img {
  height: 55px;
}

.content-recommendedposts__prev:hover,
.content-recommendedposts__next:hover {
  filter: invert(1);
}

.content-recommendedposts__block {
  /* display: flex; */
  min-width: 350px;
  width: 100%;
  margin: 5px;
}
.content-recommendedposts__element {
  display: flex;
  width: 50%;
  height: 300px;
  font-weight: bold;
}
.content-recommendedposts__element a {
  width: 100%;
  color: #000;
  margin: 17px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 35px;
  text-decoration: none;
  font-size: 36px;
}
.content-recommendedposts__element a img {
  width: 100%;
  height: 100%;
}
.content-recommendedposts__element a:hover {
  box-shadow: inset 0px 0px 10px #333;
}
</style>
