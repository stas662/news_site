<template>
  <div class="hamburger" @click="hamburgerShow"><span></span></div>
  <div class="hamburger-menu hamburger-top">
    <span @click="hamburgerClose"></span>
    <router-link @click="hamburgerClose" class="header-menu"
                 :class="{active: this.activePath === '/'}"
                 to="/">
      Главная
    </router-link>
    <router-link @click="hamburgerClose" class="header-menu"
                 :class="{active: this.activePath === '/news'}"
                 to="/news">
      Новости
    </router-link>
    <router-link @click="hamburgerClose" class="header-menu"
                 :class="{active: this.activePath === '/articles'}"
                 to="/articles">
      Статьи
    </router-link>
    <router-link @click="hamburgerClose" class="header-menu"
                 :class="{active: this.activePath === '/science'}"
                 to="/science">
      Наука
    </router-link>
    <router-link @click="hamburgerClose" class="header-menu"
                 :class="{active: this.activePath === '/technics'}"
                 to="/technics">
      Техника
    </router-link>
    <router-link @click="hamburgerClose" class="header-menu"
                 :class="{active: this.activePath === '/space'}"
                 to="/space">
      Космос
    </router-link>
    <router-link @click="hamburgerClose" class="header-menu"
                 :class="{active: this.activePath === '/gadgets'}"
                 to="/gadgets">
      Гаджеты
    </router-link>
    <router-link @click="hamburgerClose" class="header-menu"
                 v-if="$store.getters['users/isAuth']"
                 :class="{active: this.activePath === '/add-post'}"
                 to="/add-post">
      Добавить пост
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activePath: '/'
    }
  },
  watch: {
    $route () {
      this.activePath = this.$route.path
    }
  },
  methods: {
    goto (route) {
      this.$router.push(route)
    },
    hamburgerClose () {
      const close = document.querySelector('.hamburger-menu')
      close.classList.add('hamburger-top')
    },
    hamburgerShow () {
      const show = document.querySelector('.hamburger-top')
      show.classList.remove('hamburger-top')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-menu {
  line-height: 50px;
  text-decoration: none;
  margin-right: 25px;
  color: #EEE;
  font-family: "Gill Sans", sans-serif;
  padding-bottom: 7px;
  border-bottom: 4px solid transparent;
}
.header-menu:hover,
.active {
  border-bottom: 4px solid #EEE;
}
.hamburger {
  display: none;
}

@media screen and (max-width: 1200px) {
  .hamburger-menu {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px 30px 10px 10px;
    width: 160px;
    background: #151a1e;
    margin-right: 10px;
    right: -10px;
    z-index: 25;
    top: -60px;
    transition: 0.5s ease;
    /* display: none; */
  }
  .hamburger-top {
    right: -220px;
    transition: 0.5s ease;
  }
  .header-menu {
    margin-left: 25px;
  }
  .hamburger {
    display: block;
    position: relative;
    cursor: pointer;
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .hamburger::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 10px;
    width: 25px;
    background: #eee;
    border: 2px solid #eee;
  }
  .hamburger::after {
    content: '';
    position: absolute;
    bottom: 12px;
    left: 10px;
    width: 25px;
    background: #eee;
    border: 2px solid #eee;
  }
  .hamburger span::before {
    content: '';
    position: absolute;
    bottom: 23px;
    left: 10px;
    width: 25px;
    background: #eee;
    border: 2px solid #eee;
  }
  .hamburger-menu span {
    position: relative;
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
  .hamburger-menu span::before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    right: -85px;
    top: 32px;
    transform: rotate(0.38turn);
    border-right: 2px solid #eee;
  }
  .hamburger-menu span::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    right: -63px;
    top: 30px;
    transform: rotate(0.38turn);
    border-top: 2px solid #eee;
  }
}

</style>
