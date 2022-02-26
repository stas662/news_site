<template>
  <div class="inner-aside">
    <div>КОММЕНТАРИИ</div>
    <div class="aside-center">{{this.$store.getters['comments/getCountComments'](this.$route.params.id)}}</div>
  </div>
  <div class="inner-aside">
    <div>РЕЙТИНГ</div>
    <div class="aside-center">{{this.$store.getters['comments/getRatingAccount'](this.$route.params.id)}}</div>
  </div>
  <div class="inner-aside">
    <div>РЕГИСТРАЦИЯ</div>
    <div class="aside-center">{{new Date(this.$store.getters['users/getAccountData'](this.$route.params.id)).toLocaleDateString()}}</div>
  </div>
  <div class="inner-aside">
    <div>НАРУШЕНИЯ</div>
    <div class="aside-center">
      {{this.$store.getters['users/getAccountViolations'](this.$route.params.id)}}
    </div>
  </div>
</template>

<style scoped>
.aside-center {
  text-align: center;
  margin: 3px;
  font-size: 19px;
}

@media screen and (max-width: 650px) {
  .inner-aside {
    text-align: center;
    margin-bottom: 10px;
    flex: 45%;
  }
}

</style>
