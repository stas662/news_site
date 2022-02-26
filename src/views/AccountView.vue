<template>
  <div class="wrap">
    <div class="sub-wrap" v-if="!this.settings">
      <div class="inner-account">
        <div class="sub-inner-account">
          <div class="content-account">
            <img :style="`border: 3px solid ${this.$store.getters['users/getAccountColor'](this.$route.params.id)};`"
                :src="this.$store.getters['users/getAccountImage'](this.$route.params.id)" alt="avatar">
            <div v-if="this.$route.params.id === this.$store.getters['users/getId'](this.$store.getters['users/userEmail'])"
                class="content-body-button"
                style="margin-left: 15px;">
              <my-button @click="openSettings"
                          :style="`border: 2px solid ${this.$store.getters['users/getAccount'](this.$route.params.id).color};
                                   margin: 15px auto 0 auto;`"
                          @mouseover="(event) => userColor(event, this.$store.getters['users/getAccount'](this.$route.params.id).color)"
                          @mouseleave="(event) => hideUserColor(event)"
                          class="content-body-button___element">
                Редактировать профиль
              </my-button>
            </div>
          </div>
          <div class="content-account-title">
            <div :style="`color: ${this.$store.getters['users/getAccountColor'](this.$route.params.id)}; font-size: 36px;`">
              {{this.$store.getters['users/getAccount'](this.$route.params.id).login}}
            </div>
            <div v-if="this.$store.getters['users/getAccountName'](this.$route.params.id)"
                 class="content-account-title__element">
              <div style="color: #fff">Пользователь</div>
              <div>{{this.$store.getters['users/getAccountName'](this.$route.params.id)}}</div>
            </div>
            <div v-if="this.$store.getters['users/getAccountInfo'](this.$route.params.id)"
                 id="content-account-title__element"
                 class="content-account-title__element">
              {{this.$store.getters['users/getAccountInfo'](this.$route.params.id)}}
            </div>
            <div v-else id="content-account-title__element"
                 class="content-account-title__element"
                 style="margin: auto 0;">
              Информация отсутствует
            </div>
            <div id="content-account-title__info" class="content-account-title__info">
              <InfoAccount />
            </div>
          </div>
          <div v-if="this.$store.getters['users/getAccountInfo'](this.$route.params.id)"
               class="new-content-account-title__element">
            {{this.$store.getters['users/getAccountInfo'](this.$route.params.id)}}
          </div>
          <div v-else class="new-content-account-title__element">
            Информация отсутствует
          </div>
          <div class="new-content-account-title">
            <div class="content-account-title__info">
              <InfoAccount />
            </div>
          </div>
        </div>
      </div>
      <AccountComment />
    </div>
    <div class="sub-wrap" v-else>
      <div class="inner-account">
        <div class="sub-inner-account">
          <div class="content-account">
            <img v-if="this.imageSrc === ''" :style="`border: 3px solid ${this.defaultUserColor};`"
                  :src="this.$store.getters['users/getAccount'](this.$route.params.id).img" alt="avatar">
            <img v-else :style="`border: 3px solid ${this.defaultUserColor}; `"
                  :src="this.imageSrc" alt="avatar">
            <my-input type="file" accept="image/*"
                      @change="onFileChange"
                      :modelValue="this.img"
                      @update="value => this.img = value"
            />
            <div class="content-square">
              <div class="square"
                  :class="{active: this.$store.getters['users/getAccount'](this.$route.params.id).color === '#eeeeee'}"
                  @click="addActive('#eeeeee', 0)"
                  style="background: #eeeeee"></div>
              <div class="square"
                  :class="{active: this.$store.getters['users/getAccount'](this.$route.params.id).color === '#ff073a'}"
                  @click="addActive('#ff073a', 1)"
                  style="background: #ff073a"></div>
              <div class="square"
                  :class="{active: this.$store.getters['users/getAccount'](this.$route.params.id).color === '#ff8000'}"
                  @click="addActive('#ff8000', 2)"
                  style="background: #ff8000"></div>
              <div class="square"
                  :class="{active: this.$store.getters['users/getAccount'](this.$route.params.id).color === '#00ffff'}"
                  @click="addActive('#00ffff', 3)"
                  style="background: #00ffff"></div>
              <div class="square"
                  :class="{active: this.$store.getters['users/getAccount'](this.$route.params.id).color === '#4040ff'}"
                  @click="addActive('#4040ff', 4)"
                  style="background: #4040ff"></div>
              <div class="square"
                  :class="{active: this.$store.getters['users/getAccount'](this.$route.params.id).color === '#be13fe'}"
                  @click="addActive('#be13fe', 5)"
                  style="background: #be13fe"></div>
            </div>
          </div>
          <div class="content-account-title">
            <div :style="`color: ${this.defaultUserColor}; font-size: 36px;`">
              {{this.$store.getters['users/getAccount'](this.$route.params.id).login}}
            </div>
            <div v-if="this.promptInput" class="prompt">{{this.textInput}}</div>
            <my-input placeholderText='Настоящее имя'
                      :modelValue="this.name"
                      @update="value => this.name = value"
            />
            <div v-if="this.promptTextarea" class="prompt">{{this.textTextarea}}</div>
            <my-textarea placeholderText="Информация о себе"
                        :modelValueTextarea="this.info"
                        @update="value => this.info = value"
                        style="max-height: 150px;"
            />
            <div v-if="this.$route.params.id === this.$store.getters['users/getId'](this.$store.getters['users/userEmail'])"
                class="content-body-button"
                style="margin: 0 15px;">
              <my-button @click="saveSettingsUser"
                        :style="`border: 2px solid ${this.defaultUserColor};
                                  margin-right: 5px;`"
                        @mouseover="(event) => userColor(event, this.defaultUserColor)"
                        @mouseleave="(event) => hideUserColor(event)"
                        class="content-body-button___element">
                Сохранить
              </my-button>
              <my-button @click="cansleSettings"
                        :style="`border: 2px solid ${this.defaultUserColor};
                                  margin-left: 5px;`"
                        @mouseover="(event) => userColor(event, this.defaultUserColor)"
                        @mouseleave="(event) => hideUserColor(event)"
                        class="content-body-button___element">
                Отмена
              </my-button>
            </div>
          </div>
        </div>
      </div>
      <AccountComment :color="this.defaultUserColor" />
    </div>
  </div>
</template>

<script>
import AccountComment from '@/components/icp/AccountComment.vue'
import MyButton from '@/components/ui/MyButton.vue'
import MyInput from '@/components/ui/MyInput.vue'
import MyTextarea from '@/components/ui/MyTextarea.vue'
import InfoAccount from '@/components/icp/InfoAccount.vue'

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
      defaultUserColor: '',
      name: '',
      info: '',
      save: false,
      img: '',
      imageSrc: '',
      file: null,
      promptInput: false,
      promptTextarea: false,
      textInput: '',
      textTextarea: ''
    }
  },
  components: {
    AccountComment,
    MyButton,
    MyInput,
    MyTextarea,
    InfoAccount
  },
  methods: {
    userColor: (e, color) => {
      e.target.style.boxShadow = `0px 0px 10px ${color}`
      e.target.style.border = `2px solid ${color}`
    },
    hideUserColor: (e) => {
      e.target.style.boxShadow = ''
    },
    openSettings () {
      this.settings = true
      const user = this.$store.getters['users/getAccount'](this.$route.params.id)
      this.name = user.name
      this.info = user.info
      this.defaultUserColor = user.color
    },
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
    // Дожидаемся выполнения загрузки файла и получения на него ссылки перед тем как закрыть настройки пользователя
    async saveSettingsUser () {
      this.promptInput = false
      this.textInput = ''
      this.promptTextarea = false
      this.textTextarea = ''
      var re = /^[a-zа-яё]+$/i
      if (this.name === '' && this.info === '') {
        this.save = true
      } else {
        if (re.test(this.name)) {
          if (this.name.length <= 25 && this.info.length < 200) {
            this.save = true
          } else {
            if (this.name.length > 25) {
              this.promptInput = true
              this.textInput = 'Превышено количество символов в строке!'
            }
            if (this.info.length > 200) {
              this.promptTextarea = true
              this.textTextarea = 'Превышено количество символов в строке!'
            }
          }
        } else {
          this.promptInput = true
          this.textInput = 'Имя должно состоять только из букв!'
        }
      }
      setTimeout(() => {
        this.promptInput = false
        this.textInput = ''
        this.promptTextarea = false
        this.textTextarea = ''
      }, 2500)
      if (this.save) {
        var user = this.$store.getters['users/getUser'](this.$store.getters['users/userEmail'])
        user.name = this.name
        user.info = this.info
        user.color = this.defaultUserColor
        if (this.file !== null) {
          user.file = this.file
        }
        await this.$store.dispatch('users/updateUser', user)
        this.cansleSettings()
      }
    },
    cansleSettings () {
      this.settings = false
      this.img = ''
      this.imageSrc = ''
      this.defaultUserColor = this.$store.getters['users/getAccount'](this.$route.params.id).color
    },
    addActive (active, index) {
      this.defaultUserColor = active
      const squares = document.querySelectorAll('.square')
      clearActiveClasses(squares)
      squares[index].classList.add('active')
    }
  }
}
</script>

<style scoped>
.wrap {
  margin: 0 15px;
}

.sub-wrap {
  display: flex;
  flex-direction: column;
}

.inner-account {
  width: 100%;
  flex-wrap: wrap;
  padding: 15px 0;
  display: flex;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.sub-inner-account {
  display: flex;
  flex: 100%;
  flex-wrap: wrap;
}

.content-account {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 15px;
  max-width: 500px;
  font-weight: bold;
}

.content-account img {
  min-width: 250px;
  width: 250px;
  height: 250px;
  object-fit: cover;
  margin: auto 0 auto 15px;
}

.content-account input {
  max-width: 220px;
  margin: 10px 0 0 15px;
}

.content-account-title {
  padding: 5px;
  margin: 15px;
  flex: 40%;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.content-account-title input {
  margin: 10px 0;
}

.content-account-title__element {
  font-size: 19px;
  margin: 10px 0;
}

.content-account-title__info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 18px;
}

.new-content-account-title__element,
.new-content-account-title {
  display: none;
}

.content-account-title__info div {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  text-align: start;
  margin: 10px;
}

.sub-inner-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 15px;
  flex: 30%;
}

.content-body-title {
  display: flex;
  align-items: center;
  margin: 10px;
  font-size: 24px;
}

.content-body-title span {
  padding: 15px;
  border-radius: 50%;
  min-width: 25px;
  text-align: center;
  min-height: 25px;
  margin-left: 10px;
}

.content-body-button {
  display: flex;
}

.content-body-button___element {
  width: 100%;
  max-width: 250px;
  margin: 5px auto 0 auto;
}

.content-square {
  display: flex;
  margin-top: 5px;
  margin-left: 15px;
  justify-content: space-between;
}

.square {
  width: 25px;
  height: 25px;
  margin: 3px;
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

.prompt {
  background: #eee;
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
  color: #333;
  border: 1px solid #333;
  box-shadow: 0 0 5px #333;
}

@media screen and (max-width: 1100px) {
  #content-account-title__info {
    display: none;
  }
  .new-content-account-title {
    padding: 5px;
    margin: 15px;
    flex: 100%;
    font-size: 28px;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (max-width: 700px) {
  .sub-inner-account {
    justify-content: center;
  }
  .content-account-title {
    flex: 100%;
  }
  .content-square {
    margin-left: 0;
  }
  .content-body-button {
    margin: 0 !important;
  }
  .content-account-title__element {
    margin: 10px;
  }
  .content-account img {
    min-width: 375px;
    width: 375px;
    height: 375px;
    margin: 0;
  }
  .content-account input {
    max-width: 350px;
    width: 100%;
    margin: 10px 0;
  }
}

@media screen and (max-width: 650px) {
  .content-account-title__info div {
    flex: 45%;
  }
  #content-account-title__element {
    display: none;
  }
  .new-content-account-title__element {
    display: block;
    font-size: 19px;
    width: 100%;
    margin: 10px 15px;
    text-align: center;
  }
}

@media screen and (max-width: 550px) {
  .content-account img {
    min-width: 250px;
    width: 250px;
    height: 250px;
  }
  .content-account input {
    max-width: 225px;
  }
  .content-account-title__info {
    font-size: 16px;
  }
}

</style>
