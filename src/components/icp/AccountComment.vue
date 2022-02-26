<template>
  <div>
    <div class="content-sub-articlespost">
      <div class="content-sub-articlespost___title">Недавняя активность</div>
      <div class="content-sub-articlespost___body">
        <ToDoComment
          :array="this.$store.getters['comments/getCommentsUser'](this.$route.params.id)"
          :img="this.$store.getters['users/getAccount'](this.$route.params.id).img"
          :color="this.color"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ToDoComment from '@/components/icp/ToDoComment.vue'

export default {
  components: { ToDoComment },
  props: {
    color: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.d-none {
  display: none;
}

.reverseActiveChange {
  display: flex !important;
  flex: 100%;
  flex-direction: column;
  min-height: 200px;
}

.reverseActiveChange > div {
  display: flex;
  /* justify-content: end; */
  margin: 10px;
}

.sub-articlespost {
  display: flex;
  flex-direction: column;
}

.content-sub-articlespost {
  width: 100%;
  padding: 15px 0;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-sub-articlespost___title {
  padding: 5px;
  margin: 0 0 15px 30px;
  font-size: 30px;
}

.content-sub-articlespost___body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 15px;
}

.content-sub-articlespost___block {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  border-top: 3px solid #151a1e;
}

.content-sub-articlespost___element {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 15px;
  font-weight: bold;
}

.content-sub-articlespost___element a {
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 35px;
  text-decoration: none;
  font-size: 25px;
}

.content-sub-articlespost___block a:hover {
  color: #808080
}

.content-sub-articlespost___block a {
  margin-right: auto;
}

.content-sub-articlespost___element a:hover {
  box-shadow: inset 0px 0px 10px #333;
}

.content-sub-articlespost___element-body {
  display: flex;
  margin: 15px;
}

.content-sub-articlespost___element-body img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}

.content-sub-articlespost___element-button {
  display: flex;
  /* margin-left: 10px */
}

.content-sub-articlespost___element-button div {
  margin: 0 10px;
}

.content-sub-articlespost___element-button div:hover {
  cursor: pointer;
  color: #808080
}

</style>
