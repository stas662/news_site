<template>
  <div class="wrapper">
    <div class="content">
      <div class="header">
        <router-link class="header-logo" to="/">
          <img src="@/assets/logo.png" alt="logo">
          Наука и Техника
        </router-link>
        <router-link class="new-header-logo" to="/">
          <img src="@/assets/logo.png" alt="logo">
          Н&Т
        </router-link>
        <div class="header-nav">
          <Navigation />
          <div @click="this.$store.getters['users/authDialog']" v-if="!this.$store.getters['users/isAuth']" class="header-nav__icon">
            <i class='fas fa-sign-in-alt'></i>
            Войти
          </div>
          <div @click="dialogLogout" class="header-nav__icon" v-else>
            <i class='fas fa-sign-in-alt'></i>
            Выйти
          </div>
          <my-dialog v-model:show="this.logout">
            <div class="header-nav-dialog__title">Вы точно хотите Выйти?</div>
            <div class="header-nav-dialog__body">
              <my-button class="header-nav-dialog__body-button" @click="doLogout">Да</my-button>
              <my-button class="header-nav-dialog__body-button" @click="this.logout = false">Нет</my-button>
            </div>
          </my-dialog>
          <div>
            <my-dialog v-model:show="this.$store.state.users.dialogAuth">
              <Authorization />
            </my-dialog>
            <my-dialog v-model:show="this.$store.state.users.dialogReg">
              <Registration />
            </my-dialog>
          </div>
        </div>
      </div>
    </div>
    <div class="content-header__fixed"></div>
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
import Authorization from '@/components/Authorization.vue'
import Registration from '@/components/Registration.vue'
import MyDialog from '@/components/ui/MyDialog.vue'
import MyButton from '@/components/ui/MyButton.vue'

export default {
  data () {
    return {
      logout: false,
      userAuth: false
    }
  },
  components: { Navigation, Footer, Authorization, Registration, MyDialog, MyButton },
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

<style>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
  color: #EEE;
  font-family: "Gill Sans", sans-serif;
}

body {
  background: #1d2125;
}

.wrapper {
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 10px;
}

.content {
  background-color: #212e3c;
  position: fixed;
  left: 0;
  z-index: 10;
  width: 100%;
  max-height: 50px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 15px;
}

.header-logo {
  display: flex;
  text-decoration: none;
  line-height: 50px;
  max-height: 50px;
  font-size: 26px;
  font-family: Cursive;
  color: #EEE;
  min-width: 260px;
  margin-left: 5px;
}

.header-logo img {
  display: block;
  width: 30px;
  height: 30px;
  margin: auto 10px auto 0;
}

.new-header-logo {
  display: none;
}

.header-nav {
  display: flex;
}

.header-nav__icon {
  line-height: 50px;
  font-family: "Gill Sans", sans-serif;
  cursor: pointer;
}

.header-nav-dialog__title {
  margin-top: 20px;
  font-size: 24px;
}

.header-nav-dialog__body {
  text-align: center;
}

.header-nav-dialog__body-button {
  margin: 30px 10px 0 10px;
}

.content-header__fixed {
  height: 50px;
}

@media screen and (max-width: 490px) {
  .header-logo {
    display: none;
  }
  .new-header-logo {
    display: flex;
    text-decoration: none;
    line-height: 50px;
    max-height: 50px;
    font-size: 26px;
    font-family: Cursive;
    color: #EEE;
    margin-left: 5px;
  }

  .new-header-logo img {
    display: block;
    width: 30px;
    height: 30px;
    margin: auto 10px auto 0;
  }
}

</style>
