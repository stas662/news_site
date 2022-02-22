<template>
  <div style="margin: 0 15px">
    <div class="account" v-if="!this.settings">
      <div class="content-account">
        <div style="display: flex; flex: 65%">
          <div class="content-account___element">
            <img :style="`border: 3px solid ${this.$store.getters['users/getAccount'](this.$route.params.id).color};`"
                 :src="this.$store.getters['users/getAccount'](this.$route.params.id).img" alt="avatar">
          </div>
          <div class="content-account___title">
            <div :style="`color: ${this.$store.getters['users/getAccount'](this.$route.params.id).color};`">
              {{this.$store.getters['users/getAccount'](this.$route.params.id).login}}</div>
            <div class="content-account___title-info" v-if="dontInfo">Информация отсутствует</div>
          </div>
        </div>
        <div class="content-account___body" style="flex: 30%">
          <div class="content-account___element-title">
            Рейтинг
            <span :style="`border: 3px solid ${this.$store.getters['users/getAccount'](this.$route.params.id).color};`">
              {{this.$store.getters['comments/getRatingAccount'](this.$route.params.id)}}
            </span>
          </div>
          <div v-if="this.$route.params.id === this.$store.getters['users/getId'](this.$store.getters['users/userEmail'])" class="content-account___element-body">
            <my-button @click="openSettings"
                       :style="`border: 2px solid ${this.$store.getters['users/getAccount'](this.$route.params.id).color};`"
                       @mouseover="(event) => userColor(event, this.$store.getters['users/getAccount'](this.$route.params.id).color)"
                       @mouseleave="(event) => hideUserColor(event)"
                       class="content-account___element-button">
              Редактировать профиль
            </my-button>
          </div>
        </div>
      </div>
      <AccountComment />
    </div>
    <div class="content-account" v-else>
      <div style="display: flex; flex: 65%">
        <div class="content-account___element">
          <img v-if="this.imageSrc === ''" :style="`border: 3px solid ${this.defaultUserColor};`"
                :src="this.$store.getters['users/getAccount'](this.$route.params.id).img" alt="avatar">
          <img v-else :style="`border: 3px solid ${this.defaultUserColor};`"
                :src="this.imageSrc" alt="avatar">
          <my-input type="file" accept="image/*"
                    @change="onFileChange"
                    :modelValue="this.img"
                    @update="value => this.img = value" />
        </div>
        <div class="content-account___title">
          {{this.$store.getters['users/getAccount'](this.$route.params.id).login}}
          <my-input placeholderText='Настоящее имя'
                    :modelValue="this.name"
                    @update="value => this.name = value" />
          <div style="display: flex; justify-content: space-between;">
            <div class="square" @click="addActive('#eeeeee')" style="background: #eeeeee"></div>
            <div class="square" @click="addActive('#ff073a')" style="background: #ff073a"></div>
            <div class="square" @click="addActive('#ff8000')" style="background: #ff8000"></div>
            <div class="square" @click="addActive('#00ffff')" style="background: #00ffff"></div>
            <div class="square" @click="addActive('#4040ff')" style="background: #4040ff"></div>
            <div class="square" @click="addActive('#be13fe')" style="background: #be13fe"></div>
          </div>
        </div>
      </div>
      <div class="content-account___body" style="flex: 30%">
        <div class="content-account___element-title">
          Рейтинг
          <span :style="`border: 3px solid ${this.defaultUserColor};`">
            {{this.$store.getters['comments/getRatingAccount'](this.$route.params.id)}}
          </span>
        </div>
        <div v-if="this.$route.params.id === this.$store.getters['users/getId'](this.$store.getters['users/userEmail'])" class="content-account___element-body">
          <my-button @click="saveSettingsUser"
                    :style="`border: 2px solid ${this.defaultUserColor};`"
                    @mouseover="(event) => userColor(event, this.defaultUserColor)"
                    @mouseleave="(event) => hideUserColor(event)"
                    class="content-account___element-button">
            Сохранить
          </my-button>
          <my-button @click="cansleSettings"
                    :style="`border: 2px solid ${this.defaultUserColor};`"
                    @mouseover="(event) => userColor(event, this.defaultUserColor)"
                    @mouseleave="(event) => hideUserColor(event)"
                    class="content-account___element-button">
            Отмена
          </my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/ui/MyButton.vue'
import AccountComment from '@/components/icp/AccountComment.vue'
import MyInput from '@/components/ui/MyInput.vue'
// import MyRadioButton from '@/components/ui/MyRadioButton.vue'
// import MyCheckbox from '@/components/ui/MyCheckbox.vue'

function clearActiveClasses (squares) {
  squares.forEach((square) => {
    square.classList.remove('active')
  })
}

export default {
  data () {
    return {
      dontInfo: true,
      settings: false,
      radioNames: '',
      name: '',
      defaultUserColor: '',
      active: null,
      img: '',
      imageSrc: '',
      file: null,
      radioOptions: ['Красный', 'Оранжевый', 'Циан', 'Синий', 'Фиолетовый'],
      checkedNames: [],
      checkedOptions: ['Наука', 'Техника', 'Космос', 'Гаджеты']
    }
  },
  components: { MyButton, MyInput, AccountComment },
  methods: {
    onFileChange (event) {
      var input = event.target
      this.file = event.target.files[0]
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        var vm = this
        reader.onload = function (e) {
          vm.imageSrc = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    openSettings () {
      this.settings = true
      this.defaultUserColor = this.$store.getters['users/getAccount'](this.$route.params.id).color
    },
    // Дожидаемся выполнения загрузки файла и получения на него ссылки перед тем как закрыть настройки пользователя
    async saveSettingsUser () {
      var user = this.$store.getters['users/getUser'](this.$store.getters['users/userEmail'])
      user.color = this.defaultUserColor
      if (this.file !== null) {
        user.file = this.file
      }
      // О
      await this.$store.dispatch('users/updateUser', user)
      this.cansleSettings()
    },
    userColor: (e, color) => {
      e.target.style.boxShadow = `0px 0px 10px ${color}`
      e.target.style.border = `2px solid ${color}`
    },
    hideUserColor: (e) => {
      e.target.style.boxShadow = ''
    },
    cansleSettings () {
      this.settings = false
      this.img = ''
      this.imageSrc = ''
      this.defaultUserColor = this.$store.getters['users/getAccount'](this.$route.params.id).color
    },
    addActive (active) {
      this.defaultUserColor = active
      const squares = document.querySelectorAll('.square')
      for (const square of squares) {
        square.addEventListener('click', () => {
          clearActiveClasses(squares)
          square.classList.add('active')
        })
      }
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
  flex-wrap: wrap;
  padding: 15px 0;
  display: flex;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-account___title {
  padding: 5px;
  margin: 15px;
  font-size: 32px;
  display: flex;
  max-width: 300px;
  width: 100%;
  flex-direction: column;
}

.content-account___title-info {
  margin: auto 0;
  font-size: 18px;
}

.content-account___body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 15px;
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
  max-width: 500px;
  font-weight: bold;
}

.content-account___element img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin: auto 0 auto 15px;
}

.content-account___element input {
  max-width: 270px;
  margin: 10px auto 0 15px;
}

.content-account___setting {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

.content-account___element-title {
  display: flex;
  align-items: center;
  margin: 10px;
  font-size: 24px;
}

.content-account___element-title span {
  padding: 15px;
  border-radius: 50%;
  min-width: 25px;
  text-align: center;
  min-height: 25px;
  margin-left: 10px;
}

.content-account___element-body {
  display: flex;
  flex-direction: column;
  max-width: 350px;
  margin: 30px 10px 10px 10px;
}

.content-account___element-button {
  margin: 15px auto 0 0;
}

.content-articles__title {
  padding: 5px;
  margin: 15px 0 0 15px;
  font-size: 30px;
}

.content-articles__body {
  display: flex;
  flex-wrap: wrap;
}

.content-articles__body div {
  display: flex;
  flex-direction: column;
}

.square {
  width: 30px;
  height: 30px;
  margin: 5px;
  border: 1px solid transparent;
}

.square:hover {
  cursor: pointer;
  border: 1px solid #333;
}

.active {
  border: 1px solid #333;
  box-shadow: 0 0 5px #eee;
}

</style>
