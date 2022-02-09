<template>
  <div class="content-authorization">
      <div class="content-authorization__title">Войти</div>
    <div class="content-authorization__block">
      <my-input type="email" placeholderText='Логин'
                :modelValue="this.login"
                @update="value => this.login = value" />
      <my-input type="password"
                placeholderText='Пароль'
                :modelValue="this.password"
                @update="value => this.password = value" />
      <router-link style="width: 100%; height: 100%" to="/">
        <my-button style="width: 100%" @click="closeDialog">
          <i class='fas fa-sign-in-alt'></i>
          Войти
        </my-button>
      </router-link>
      <div class="content-authorization__link">
        <div class="content-link">Забыли пароль </div>|
        <div class="content-link" @click="this.$store.getters['users/regDialog']">
          Зарегистрироваться
        </div>
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
      login: '',
      password: ''
    }
  },
  components: { MyInput, MyButton },
  name: 'Authorization',
  methods: {
    closeDialog () {
      this.$store.state.users.dialogAuth = false
      this.$store.state.users.active = true
      this.$store.dispatch('users/doAuth', {
        login: this.login,
        password: this.password
      }).then((status) => {
        if (status === 'OK') {
          this.$router.push('/')
        } else {
          alert('Ошибка авторизации')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-authorization {
  padding: 15px 0;
  margin: 10px 0 0 0;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}
.content-authorization__title {
  padding: 5px;
  margin-left: 15px;
  font-size: 30px;
}
.content-authorization__block {
  display: flex;
  max-width: 700px;
  margin: auto;
  flex-direction: column;
  padding: 20px 15px 0 15px;
}
.content-authorization__link {
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
</style>
