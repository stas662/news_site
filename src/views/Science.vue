<template>
  <div class="wrapper-science">
    <div class="content-science">
      <div class="content-science__title">Наука</div>
      <div class="content-science__body">
        <div class="content-science__body-wrapper"
             v-for="(post, index) in this.$store.getters['posts/filterPosts']('Наука')"
             :key="post">
          <div class="content-science__body-element">
            <router-link :style="`background: url(${post.img}) center no-repeat;`"
                         :to="`/science/${index + 1}`">
              {{post.title}}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper-science {
  display: flex;
  flex-wrap: wrap;
}

.content-science {
  width: 100%;
  padding: 15px 0;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-science__title {
  padding: 5px;
  margin-left: 15px;
  font-size: 30px;
}

.content-science__body {
  display: flex;
  flex-wrap: wrap;
}

.content-science__body-wrapper {
  display: flex;
  width: 50%;
}

.content-science__body-element {
  display: flex;
  flex: 1 1 30%;
  margin: 15px;
  height: 355px;
  font-weight: bold;
}

.content-science__body-element a {
  color: #000;
  display: flex;
  flex: 1 1 30%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 35px;
  text-decoration: none;
  font-size: 25px;
}

.content-science__body-element a:hover {
  box-shadow: inset 0px 0px 10px #333;
}
</style>
