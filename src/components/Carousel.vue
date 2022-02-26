<template>
  <div class="content-recommendedposts" :key="slidesLen">
    <div @click="prev" class="content-recommendedposts__prev">
      <img src="~@/assets/left.png" alt="left">
    </div>
    <div v-for="(post, index) in this.$store.getters['posts/carouselPosts']"
         :key="post"
         style="position: relative; margin: auto 0">
      <carousel-slide style="left: 50%" class="content-recommendedposts__block d-none"
                      v-show="index - 1 === this.visibleSlide"
                      :visibleSlide="visibleSlide"
                      :direction="direction">
        <div class="content-recommendedposts__element">
          <router-link style="position: relative;"
                       :to="`/${index + 1}`">
            <img :src="post.img" class="content-recommendedposts__element-img"  alt="postImage">
            <div class="content-recommendedposts__element-title">{{post.title}}</div>
          </router-link>
        </div>
      </carousel-slide>
      <carousel-slide style="right: 50%" class="content-recommendedposts__block"
                      v-show="index === this.visibleSlide"
                      :visibleSlide="visibleSlide"
                      :direction="direction">
        <div class="content-recommendedposts__element">
          <router-link style="position: relative;"
                       :to="`/${index + 1}`">
            <img :src="post.img" class="content-recommendedposts__element-img"  alt="postImage">
            <div class="content-recommendedposts__element-title">{{post.title}}</div>
          </router-link>
        </div>
      </carousel-slide>
      <carousel-slide style="left: 50%" class="content-recommendedposts__block d-none"
          v-show="index + slidesLen - 1 === this.visibleSlide"
          :visibleSlide="visibleSlide"
          :direction="direction"
        >
        <div class="content-recommendedposts__element">
          <router-link style="position: relative;"
                       :to="`/${index + 1}`">
            <img :src="post.img" class="content-recommendedposts__element-img"  alt="postImage">
            <div class="content-recommendedposts__element-title">{{post.title}}</div>
          </router-link>
        </div>
      </carousel-slide>
    </div>
    <div @click="next" class="content-recommendedposts__next">
      <img src="~@/assets/left.png" alt="right">
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
      direction: 'left',
      saveUrl: null
    }
  },
  computed: {
    slidesLen () {
      return this.$store.getters['posts/carouselPosts'].length
    }
  },
  methods: {
    next () {
      if (this.visibleSlide >= this.slidesLen - 1) {
        this.visibleSlide = 0
      } else {
        this.visibleSlide += 1
      }
      this.direction = 'left'
    },
    prev () {
      if (this.visibleSlide <= 0) {
        this.visibleSlide = this.slidesLen - 1
      } else {
        this.visibleSlide -= 1
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
  height: 400px;
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
  transform: translate(-51%, -51%) scale(-1, 1);
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
  /* min-width: 350px; */
  width: 100%;
}
.content-recommendedposts__element {
  display: flex;
  width: 50%;
  height: 400px;
  font-weight: bold;
}
.content-recommendedposts__element a {
  width: 100%;
  color: #000;
  overflow: hidden;
  margin: 17px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-decoration: none;
  text-align: center;
  font-size: 28px;
}
.content-recommendedposts__element-img {
  height: 410px;
  object-fit: cover;
  width: 100%;
  position: absolute;
}
.content-recommendedposts__element-title {
  position: absolute;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 75px;
}

.content-recommendedposts__element:hover > a div {
  color: rgba(255, 255, 255, 0.6);
}

@media screen and (max-width: 1200px) {
  .d-none {
    display: none;
    transition: 0.5s all ease-in-out;
  }
  .content-recommendedposts {
    height: 450px;
    padding: 20px;
  }
  .content-recommendedposts__element-img {
    height: 460px;
  }
  .content-recommendedposts__element {
    width: 100%;
    overflow: hidden;
    height: 450px;
  }
  .content-recommendedposts__element-title,
  .content-recommendedposts__element-img {
    max-width: none;
  }
  .content-recommendedposts__element a {
    margin: 0;
  }
  .content-recommendedposts__element-img {
    top: -10px;
  }
  .content-recommendedposts__element-title {
    bottom: 0px;
  }
  .content-recommendedposts__prev,
  .content-recommendedposts__next {
    filter: invert(1);
  }
  .content-recommendedposts__prev:hover,
  .content-recommendedposts__next:hover {
    filter: grayscale(1);
  }
}

@media screen and (max-width: 850px) {
  .content-recommendedposts__element-title {
    width: auto;
    font-size: 22px;
  }
}

@media screen and (max-width: 760px) {
  .content-recommendedposts {
    max-height: 300px;
  }
  .content-recommendedposts__element-img {
    height: 310px;
  }
  .content-recommendedposts__element-title {
    top: 205px;
  }
}

@media screen and (max-width: 560px) {
  .content-recommendedposts {
    max-height: 250px;
  }
  .content-recommendedposts__element-img {
    height: 260px;
  }
  .content-recommendedposts__element-title {
    top: 165px;
    width: 100%;
    height: 65px;
    font-size: 20px;
  }
}

</style>
