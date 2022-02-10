<template>
  <div class="content-smallaccount">
    <router-link :to="`/account/${this.$store.getters['users/getId'](this.$store.getters['users/userEmail'])}`" class="content-smallaccount__title">Профиль</router-link>
    <div class="content-smallaccount__body">
        <img :src="this.$store.getters['users/getImage'](this.$store.getters['users/userEmail'])"
             alt="avatar">
        <div class="content-smallaccount__body-link">
            <div>{{this.$store.getters['users/getLogin']}}</div>
            <div >Рейтинг {{this.$store.getters['comments/getRating']}}</div>
            <div class="content-smallaccount__body-link-button">
              Редактировать профиль
            </div>
            <div class="content-smallaccount__body-link-button"
                 @click="dialogLogout">
              Выход
            </div>
        </div>
    </div>
    <my-dialog v-model:show="this.logout">
      <div class="header-nav-dialog__title">Вы точно хотите Выйти?</div>
      <div class="header-nav-dialog__body">
        <my-button class="header-nav-dialog__body-button" @click="doLogout">Да</my-button>
        <my-button class="header-nav-dialog__body-button" @click="this.logout = false">Нет</my-button>
      </div>
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from '@/components/ui/MyDialog.vue'
import MyButton from '@/components/ui/MyButton.vue'

export default {
  data () {
    return {
      logout: false,
      user: ''
    }
  },
  components: { MyDialog, MyButton },
  methods: {
    dialogLogout () {
      this.logout = true
    },
    doLogout () {
      this.logout = false
      this.$store.dispatch('users/logout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-smallaccount {
  padding: 15px 0;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}
.content-smallaccount__title {
  padding: 5px;
  margin-left: 15px;
  font-size: 30px;
}

.content-smallaccount__title:hover {
  color:#808080;
}

.content-smallaccount__body {
  display: flex;
  max-width: 700px;
  margin: auto;
  padding: 20px 15px 0 15px;
}
.content-smallaccount__body img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: auto 10px auto 0;
}
.content-smallaccount__body-link {
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.content-smallaccount__body-link-button {
  margin-right: auto;
}

.content-smallaccount__body-link-button:hover {
  cursor: pointer;
  color: #808080;
}
</style>
