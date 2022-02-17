<template>
  <div class="content-sub-articlespost___block"
      :style="commentStyle" v-for="comment in array"
      :key="comment">
    <div>
      <div class="content-sub-articlespost___element-body">
        <img :style="`border: 3px solid ${this.$store.getters['users/getAccountColor'](comment.idUser)}`"
             :src="this.$store.getters['users/getAccount'](comment.idUser).img" alt="avatar">
        <div style="font-size: 20px;">
          <router-link :style="`color: ${this.$store.getters['users/getAccountColor'](comment.idUser)}`"
                       :to="`/account/${comment.idUser}`">{{comment.idLogin}}</router-link>
          <div style="margin: 10px;">{{comment.body}}</div>
        </div>
      </div>
      <div class="content-sub-articlespost___element-body">
        <div class="content-sub-articlespost___element-button">
          <div @click="addLike(comment)">Лайк {{comment.likes}}</div>
          <div @click="showAddComment(comment)">Комментировать</div>
        </div>
        <div class="content-sub-articlespost___element-button"
            v-if="comment.idUser === this.$store.getters['users/getId'](this.$store.getters['users/userEmail'])">
          <div id="edit" @click="changeComment(comment)">Изменить</div>
          <div @click="removeComment(comment)">Удалить</div>
        </div>
      </div>
      <div :id="`sub-comment-${comment.id}`" style="display: none;">
        <my-textarea :modelValueTextarea="this.subBody" @update="value => this.subBody = value"/>
        <div>
          <my-button @click="addComment(comment)">Сохранить</my-button>
          <my-button @click="hideAddComment(comment)">Отмена</my-button>
        </div>
      </div>
      <div :id="`sub-${comment.id}`" style="display: none;">
        <my-textarea :modelValueTextarea="this.bodyComment" @update="value => this.bodyComment = value"/>
        <div>
          <my-button @click="saveUpdateComment(comment)">Сохранить</my-button>
          <my-button @click="hideUpdateComment(comment)">Отмена</my-button>
        </div>
      </div>
      <ToDoComment v-if="this.$store.getters['comments/getChildComment'](comment.id)"
                   :array="this.$store.getters['comments/getChildComment'](comment.id)"
                   :commentStyle="'margin-left: 5%'"
      />
    </div>
    <my-dialog v-model:show="this.dialogHideComment">
      <div>Вы точно хотите удалить данный комментарий?</div>
      <my-button @click="deleteComment(this.myComment)">Удалить</my-button>
      <my-button @click="this.dialogHideComment = false">Отмена</my-button>
    </my-dialog>
  </div>
</template>

<script>
import MyTextarea from '@/components/ui/MyTextarea.vue'
import MyButton from '@/components/ui/MyButton.vue'
import MyDialog from '@/components/ui/MyDialog.vue'

function addClass (selector, addClass) {
  const element = document.querySelector(selector)
  element.classList.add(addClass)
}

function removeClass (selector, addClass) {
  const element = document.querySelector(selector)
  element.classList.remove(addClass)
}

export default {
  name: 'ToDoComment',
  data () {
    return {
      dontInfo: true,
      subBody: '',
      bodyComment: '',
      dialogHideComment: false,
      showTextarea: false,
      like: 0,
      userNotFaund: false,
      arrayComments: []
    }
  },
  props: {
    array: {
      type: Array,
      default: () => []
    },
    commentStyle: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: null
    }
  },
  components: { MyTextarea, MyButton, MyDialog },
  methods: {
    showAddComment (comment) {
      this.hideUpdateComment(comment)
      addClass(`#sub-comment-${comment.id}`, 'reverseActiveChange')
    },
    hideAddComment (comment) {
      removeClass(`#sub-comment-${comment.id}`, 'reverseActiveChange')
    },
    addComment (comment) {
      if (this.$store.getters['users/isAuth']) {
        if (comment.idParent === undefined) {
          this.$store.dispatch('comments/createNestedComment', {
            body: this.subBody,
            idUser: this.$store.getters['users/getId'](this.$store.getters['users/userEmail']),
            idComment: comment.id,
            idParent: comment.id,
            idLogin: this.$store.getters['users/getUser'](this.$store.getters['users/userEmail']).login
          })
        } else {
          this.$store.dispatch('comments/createNestedComment', {
            body: this.subBody,
            idUser: this.$store.getters['users/getId'](this.$store.getters['users/userEmail']),
            idComment: comment.id,
            idParent: comment.idParent,
            idLogin: this.$store.getters['users/getUser'](this.$store.getters['users/userEmail']).login
          })
        }
        this.subBody = ''
        removeClass(`#sub-comment-${comment.id}`, 'reverseActiveChange')
      }
    },
    changeComment (comment) {
      this.hideAddComment(comment)
      addClass(`#sub-${comment.id}`, 'reverseActiveChange')
      this.myComment = comment.id
      const editComment = this.$store.getters['comments/commentById'](this.myComment)
      this.bodyComment = editComment.body
    },
    hideUpdateComment (comment) {
      removeClass(`#sub-${comment.id}`, 'reverseActiveChange')
    },
    saveUpdateComment (comment) {
      comment.body = this.bodyComment
      this.$store.dispatch('comments/updateNestedComment', comment)
    },
    removeComment (comment) {
      this.dialogHideComment = true
      this.myComment = comment.id
    },
    deleteComment (id) {
      this.$store.dispatch('comments/deleteNestedComment', id)
      this.dialogHideComment = false
    },
    addLike (comment) {
      const arrayUsers = []
      if (comment.likes !== undefined) {
        this.like = comment.likes + 1
      } else {
        this.like += 1
      }
      if (comment.arrayUsersLikes !== undefined) {
        for (const [key, value] of Object.entries(comment.arrayUsersLikes)) {
          if (!key) {
            console.log(key)
          }
          arrayUsers.push(value)
        }
      }
      const idUser = this.$store.getters['users/getUser'](this.$store.getters['users/userEmail']).id
      this.userNotFaund = arrayUsers.find((user) => user === idUser)
      if (this.userNotFaund === undefined) {
        arrayUsers.push(idUser)
        comment.likes = this.like
        comment.arrayUsersLikes = arrayUsers
        this.userNotFaund = false
      } else {
        this.like = comment.likes - 1
        const index = arrayUsers.indexOf('idUser')
        arrayUsers.splice(index, 1)
        comment.likes = this.like
        comment.arrayUsersLikes = arrayUsers
      }
      if (comment.idParent === undefined) {
        this.$store.dispatch('comments/updateComment', comment)
      } else {
        this.$store.dispatch('comments/updateNestedComment', comment)
      }
    }
  }
}
</script>

<style scoped>
.reverseActiveChange {
  display: flex !important;
  flex: 100%;
  flex-direction: column;
  min-height: 200px;
}

.reverseActiveChange > div {
  display: flex;
  /* justify-content: end; */
  margin: 10px;
}

.sub-articlespost {
  display: flex;
  flex-direction: column;
}

.content-sub-articlespost {
  width: 100%;
  padding: 15px 0;
  margin-top: 10px;
  border: 3px solid #151a1e;
  box-shadow: 0px 0px 10px #151a1e;
}

.content-sub-articlespost___title {
  padding: 5px;
  margin: 0 0 15px 30px;
  font-size: 30px;
}

.content-sub-articlespost___body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 15px;
}

.content-sub-articlespost___block {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  border-top: 3px solid #151a1e;
}

.content-sub-articlespost___element {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 15px;
  font-weight: bold;
}

.content-sub-articlespost___element a {
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 35px;
  text-decoration: none;
  font-size: 25px;
}

.content-sub-articlespost___block a:hover {
  color: #808080
}

.content-sub-articlespost___block a {
  margin-right: auto;
}

.content-sub-articlespost___element a:hover {
  box-shadow: inset 0px 0px 10px #333;
}

.content-sub-articlespost___element-body {
  display: flex;
  margin: 15px;
}

.content-sub-articlespost___element-body img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}

.content-sub-articlespost___element-button {
  display: flex;
  /* margin-left: 10px */
}

.content-sub-articlespost___element-button div {
  margin: 0 10px;
}

.content-sub-articlespost___element-button div:hover {
  cursor: pointer;
  color: #808080
}

</style>
