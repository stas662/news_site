<template>
  <div class="wrapper-space">
    <div class="content-space">
      <div class="content-space__title">Космос</div>
      <div class="content-space__body">
        <div class="content-space__body-wrapper"
             v-for="(post, index) in this.$store.getters['posts/filterPosts']('Космос')"
             :key="post">
          <div class="content-space__body-element">
            <router-link :style="`background: url(${post.img}) center no-repeat;`"
                         :to="`/space/${index + 1}`">
              {{post.title}}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper-space {
  display: flex;
  flex-wrap: wrap;
}

.content-space {
  width: 100%;
  padding: 15px 0;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-space__title {
  padding: 5px;
  margin-left: 15px;
  font-size: 30px;
}

.content-space__body {
  display: flex;
  flex-wrap: wrap;
}

.content-space__body-wrapper {
  display: flex;
  width: 50%;
}

.content-space__body-element {
  display: flex;
  flex: 1 1 30%;
  margin: 15px;
  height: 355px;
  font-weight: bold;
}

.content-space__body-element a {
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

.content-space__body-element a:hover {
  box-shadow: inset 0px 0px 10px #333;
}
</style>
