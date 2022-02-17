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
            {{this.$store.getters['users/getAccount'](this.$route.params.id).login}}
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
            <div>
              Вы можете поменять фон профиля здесь. Или выбрать его на странице редактирования профиля.
            </div>
            <my-button @click="this.settings = true"
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
      <div class="content-articles">
        <div class="content-articles__title">Редактировать профиль</div>
        <div class="content-articles__body">
          <div>
            <my-input :modelValue="this.title"
                      @update="value => this.title = value" />
            <my-input :modelValue="this.title"
                      @update="value => this.title = value" />
            <my-input type="file" accept="image/*"
                      :modelValue="this.title"
                      @update="value => this.title = value" />
            <my-radio-button :optionsRadio="radioOptions"
                             v-model:modelValueRadio="this.radioNames" />
            <my-checkbox :optionsChecked='checkedOptions'
                         v-model:modelValueChecked="this.checkedNames" />
          </div>
          <my-button @click="this.settings = false"
                    :style="`border: 2px solid ${this.$store.getters['users/getAccount'](this.$route.params.id).color};`"
                    @mouseover="(event) => userColor(event, this.$store.getters['users/getAccount'](this.$route.params.id).color)"
                    @mouseleave="(event) => hideUserColor(event)"
                    class="content-account___element-button">
            Сохранить
          </my-button>
          <my-button @click="this.settings = false"
                    :style="`border: 2px solid ${this.$store.getters['users/getAccount'](this.$route.params.id).color};`"
                    @mouseover="(event) => userColor(event, this.$store.getters['users/getAccount'](this.$route.params.id).color)"
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
import MyRadioButton from '@/components/ui/MyRadioButton.vue'
import MyCheckbox from '@/components/ui/MyCheckbox.vue'

export default {
  data () {
    return {
      dontInfo: true,
      settings: false,
      radioNames: '',
      radioOptions: ['Красный', 'Оранжевый', 'Циан', 'Синий', 'Фиолетовый'],
      checkedNames: [],
      checkedOptions: ['Наука', 'Техника', 'Космос', 'Гаджеты']
    }
  },
  components: { MyButton, MyInput, MyRadioButton, MyCheckbox, AccountComment },
  methods: {
    userColor: (e, color) => {
      e.target.style.boxShadow = `0px 0px 10px ${color}`
      e.target.style.border = `2px solid ${color}`
    },
    hideUserColor: (e) => {
      e.target.style.boxShadow = ''
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
  flex-direction: column;
  flex-wrap: wrap;
}

.content-articles__body div {
  display: flex;
  flex-direction: column;
}

</style>
