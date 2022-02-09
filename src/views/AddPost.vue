<template>
  <div>
    <div class="content-addpost__title">Добавление постов</div>
    <form class="content-addpost__form"
          @submit.prevent>
      <my-input class="content-addpost__form-input"
                placeholderText='Название'
                :modelValue="this.title"
                @update="value => this.title = value" />
      <my-textarea placeholderText='Описание'
                   :modelValueTextarea="this.body"
                   @update="value => this.body = value"/>
      <div>
        <my-input class="content-addpost__form-sub-input"
                  placeholderText='Ссылка на картинку'
                  :modelValue="this.img"
                  @update="value => this.img = value" />
        <div>
          <my-select :modelValueSelect="this.selected"
                     @update="value => this.selected = value">
            <option>Новость</option>
            <option>Статья</option>
          </my-select>
          <div class="content-addpost__form-radioButton">
              <my-radio-button :optionsRadio="radioOptions"
                               v-model:modelValueRadio="this.radioNames" />
          </div>
          <div class="content-addpost__form-checkbox">
            <my-checkbox :optionsChecked='checkedOptions'
                         v-model:modelValueChecked="this.checkedNames" />
          </div>
          <my-button @click="createMyPost" v-if="!this.update">Добавить</my-button>
          <div v-else>
            <my-button @click="() => this.saveUpdate = true">Сохранить изменения</my-button>
            <my-dialog v-model:show="this.saveUpdate">
              <div>Вы уверены что хотите сохранить?</div>
              <my-button @click="saveUpdatePost">Да</my-button>
              <my-button @click="this.saveUpdate = false">Нет</my-button>
            </my-dialog>
            <my-button @click="canselUpdatePost">Отмена</my-button>
          </div>
          <my-dialog class="content-addpost__form-dialog" v-model:show="this.addPost">
            <div :key="this.selected">{{this.selected}} добавлена</div>
            <my-button class="content-addpost__form-dialog-button" @click="this.addPost = false">Ок</my-button>
          </my-dialog>
        </div>
      </div>
    </form>
    <div class="content-addpost__form-wrapper"
         v-for="post in this.$store.state.posts.posts"
         :key="post.id">
      <div class="content-addpost__form-body">
        <div style="font-size: 28px; margin: 15px 0;">{{post.title}}</div>
        <div style="display: flex">
          <img :src="post.img" :alt="post.id">
          <div style="font-size: 18px; margin: 0 15px;">{{post.body}}</div>
        </div>
        <div style="font-size: 18px; margin: 15px;">{{post.selected}}</div>
        <div style="font-size: 18px; margin: 15px;">{{post.picked}}</div>
        <div style="font-size: 18px; margin: 15px;">{{post.checkedNames}}</div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <my-button style="margin-bottom: 10px; width: 100%" @click="updatePost(post)">Изменить</my-button>
          <my-button style="margin-bottom: 10px; width: 100%" @click="removePost(post)">Удалить</my-button>
        </div>
        <my-dialog v-model:show="this.dialogHide">
          <div>Вы точно хотите удалить данный пост?</div>
          <my-button @click="deletePost(this.myPost)">Удалить</my-button>
          <my-button @click="this.dialogHide = false">Отмена</my-button>
        </my-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import MyInput from '@/components/ui/MyInput.vue'
import MyTextarea from '@/components/ui/MyTextarea.vue'
import MySelect from '@/components/ui/MySelect.vue'
import MyRadioButton from '@/components/ui/MyRadioButton.vue'
import MyCheckbox from '@/components/ui/MyCheckbox.vue'
import MyButton from '@/components/ui/MyButton.vue'
import MyDialog from '@/components/ui/MyDialog.vue'

export default {
  components: { MyInput, MyTextarea, MySelect, MyRadioButton, MyCheckbox, MyButton, MyDialog },
  data () {
    return {
      title: '',
      body: '',
      img: '',
      selected: 'Новость',
      options: [
        { text: 'Новость', value: 'A' },
        { text: 'Статья', value: 'B' }
      ],
      picked: '',
      radioNames: '',
      radioOptions: ['Поместить в рекомендации', 'Не помещать в рекомендации'],
      checkedNames: [],
      checkedOptions: ['Наука', 'Техника', 'Космос', 'Гаджеты'],
      addPost: false,
      dialogHide: false,
      myPost: '',
      delete: false,
      update: false,
      saveUpdate: false
    }
  },
  methods: {
    clearPost () {
      this.title = ''
      this.body = ''
      this.img = ''
      this.selected = 'Новость'
      this.picked = ''
      this.radioNames = ''
      this.checkedNames = []
    },
    createMyPost () {
      this.update = false
      this.addPost = true
      this.$store.dispatch('posts/createPost', {
        id: Date.now(),
        title: this.title,
        body: this.body,
        img: this.img,
        selected: this.selected,
        radioNames: this.radioNames,
        checkedNames: this.checkedNames
      })
      this.clearPost()
    },
    updatePost (post) {
      this.myPost = post.id
      const postById = this.$store.getters['posts/postById']
      const editPost = postById(this.myPost)
      this.title = editPost.title
      this.body = editPost.body
      this.img = editPost.img
      this.selected = editPost.selected
      this.radioNames = editPost.radioNames
      if (editPost.checkedNames !== undefined) {
        this.checkedNames = editPost.checkedNames
      }
      this.update = true
    },
    saveUpdatePost () {
      this.$store.dispatch('posts/updatePost', {
        id: this.myPost,
        title: this.title,
        body: this.body,
        img: this.img,
        selected: this.selected,
        radioNames: this.radioNames,
        checkedNames: this.checkedNames
      })
      this.update = false
      this.clearPost()
      this.saveUpdate = false
    },
    canselUpdatePost () {
      this.update = false
      this.clearPost()
    },
    removePost (post) {
      this.dialogHide = true
      this.myPost = post.id
    },
    deletePost (id) {
      this.$store.dispatch('posts/deletePost', id)
      this.dialogHide = false
    }
  }
}
</script>

<style scoped>
option {
  color: #000;
}
.content-addpost__title {
  margin: 15px 0 15px 5px;
  font-size: 30px;
}
.content-addpost__form {
  display: flex;
  flex-direction: column;
  padding: 10px 30px;
  background: #151a1e;
}
.content-addpost__form div {
  display: flex;
  justify-content: space-between;
}
.content-addpost__form-input {
  margin-top: 15px;
}
.content-addpost__form-sub-input {
  color: #fff
}
.content-addpost__form-radioButton,
.content-addpost__form-checkbox {
  display: flex;
  flex-direction: column;
}
.content-addpost__form-dialog div {
  font-size: 30px;
  text-align: center;
}
.content-addpost__form-dialog-button {
  display: flex;
  margin: 30px auto 0 auto;
}
.content-addpost__form-wrapper {
  display: flex;
  margin: 15px 0;
  border: 1px solid #333;
}
.content-addpost__form-body {
  width: 100%;
  padding: 15px;
}
.content-addpost__form-body img {
  max-width: 500px;
  width: 100%;
}
.content-addpost__form-settings {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.content-addpost__form-settings div {
  margin-bottom: 15px;
}
</style>
