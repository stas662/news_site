<template>
  <div style="margin: 0 15px">
    <div class="account">
      <div class="content-account">
        <div class="content-account___title">Профиль</div>
        <div class="content-account___body">
          <div class="content-account___element">
            <img :src="this.$store.getters['users/getUser'](this.$store.getters['users/userEmail']).img" alt="avatar">
          </div>
          <div class="content-account___setting">
              <div class="content-account___element-title">{{this.$store.getters['users/getUser'](this.$store.getters['users/userEmail']).login}}</div>
            <div class="content-account___element-title">Рейтинг</div>
            <div class="content-account___element-title" v-if="dontInfo">Информация отсутствует</div>
          </div>
        </div>
        <div class="content-account___body">
          <div class="content-account___element">
            <router-link :to="`/account/${this.$store.getters['users/getId'](this.$store.getters['users/userEmail'])}/editing`">
                Редактировать профиль
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dontInfo: true
    }
  }
}
</script>

<style scoped>
.account {
  display: flex;
  flex-direction: column;
}

.content-account {
  width: 100%;
  padding: 15px 0;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-account___title {
  padding: 5px;
  margin: 0 0 0 30px;
  font-size: 30px;
}

.content-account___body {
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px;
}

.content-account___block {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  border-top: 3px solid #151a1e;
}

.content-account___element {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 15px;
  max-width: 300px;
  font-weight: bold;
}

.content-account___element img {
  width: 100%;
}

.content-account___setting {
  display: flex;
  flex-direction: column;
  margin: 15px auto 0 0;
  font-weight: bold;
}

.content-account___element-title {
  font-size: 25px;
  margin: 10px 0;
}

.content-account___element-body {
  display: flex;
  margin: 15px;
}

.content-account___element-button {
  display: flex;
  /* margin-left: 10px */
}

.content-account___element-button div {
  margin: 0 10px;
}

.content-account___element-button div:hover {
  cursor: pointer;
  color: #808080;
}
</style>
