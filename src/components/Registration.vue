<template>
  <div class="content-registration">
      <div class="content-registration__title">Регистрация</div>
    <div class="content-registration__block">
      <div class="error" v-if='this.loginError'>{{this.messageLoginError}}</div>
      <my-input placeholderText='Логин'
                :modelValue="this.newLogin"
                @update="value => this.newLogin = value" />
      <div class="error" v-if='this.emailError'>{{this.messageEmailError}}</div>
      <my-input type="email"
                placeholderText='Email'
                :modelValue="newEmail"
                @update="value => newEmail = value" />
      <div class="error" v-if='this.passwordError'>{{this.messagePasswordError}}</div>
      <my-input type="password"
                placeholderText='Пароль'
                :modelValue="newPassword"
                @update="value => newPassword = value" />
      <router-link style="width: 100%; height: 100%" to="/">
        <my-button style="width: 100%" @click="closeDialog">
          <i class='fas fa-sign-in-alt'></i>
          Зарегистрироваться
        </my-button>
      </router-link>
      <div class="content-registration__link">
        <div class="content-link" @click="this.$store.getters['users/authDialog']">Войти</div>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/ui/MyButton.vue'
import MyInput from '@/components/ui/MyInput.vue'

export default {
  data () {
    return {
      newLogin: '',
      newEmail: '',
      newPassword: '',
      messageLoginError: '',
      messageEmailError: '',
      messagePasswordError: '',
      loginError: false,
      emailError: false,
      passwordError: false
    }
  },
  components: { MyInput, MyButton },
  methods: {
    closeDialog () {
      this.$store.state.users.dialogReg = false
      this.$store.state.users.active = true
      this.$store.dispatch('users/doCreate', {
        login: this.newLogin,
        email: this.newEmail,
        password: this.newPassword
      }).then((status) => {
        if (status === 'OK') {
          this.$router.push('/')
        } else {
          alert('Ошибка регистрации')
        }
      })
      this.$store.dispatch('users/createUser', {
        login: this.newLogin,
        email: this.newEmail
      })
    }
  }
}
</script>

<style scoped>
.content-registration {
  padding: 15px 0;
  margin: 10px auto 0 auto;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}
.content-registration__title {
  padding: 5px;
  margin-left: 15px;
  font-size: 30px;
}
.content-registration__block {
  display: flex;
  max-width: 700px;
  margin: auto;
  flex-direction: column;
  padding: 20px 15px 0 15px;
}
.content-registration__link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.content-link {
  margin: 0 5px;
  font-size: 17px;
  color: rgba(238, 238, 238, 0.6);
}
.content-link:hover {
  cursor: pointer;
  color: rgba(238, 238, 238, 1);
}

.error {
  padding: 15px;
  max-width: 250px;
  margin-bottom: 10px;
  background: #eee;
  text-align: center;
  color: #000;
  border-radius: 5px;
}
</style>
