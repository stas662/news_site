<template>
  <div class="sub-articlespost">
    <div class="content-sub-articlespost">
      <div class="content-sub-articlespost___title">
        {{titlePost}}
      </div>
      <div class="content-sub-articlespost___body">
        <div class="content-sub-articlespost___element">
          {{bodyPost}}
          <img style="width: 100%; margin: 15px 15px 0 0;"
                :src="imgPost"
                alt="image">
        </div>
      </div>
    </div>
  </div>
  <div class="sub-articlespost">
    <my-textarea style="margin: 15px 0; box-shadow: 0px 0px 20px #151a1e;"
                  placeholderText='Добавить коментарий'
                  :modelValueTextarea="this.body"
                  @update="value => this.body = value" />
    <my-button style="margin-left: auto;" @click="addComment">Добавить</my-button>
  </div>
  <div>
    <div class="content-sub-articlespost">
      <div class="content-sub-articlespost___title">Коментарии</div>
      <div class="content-sub-articlespost___body">
        <ToDoComment :array="arrayComments" />
      </div>
    </div>
  </div>
</template>

<script>
import MyTextarea from '@/components/ui/MyTextarea.vue'
import MyButton from '@/components/ui/MyButton.vue'
import ToDoComment from '@/components/icp/ToDoComment.vue'

export default {
  data () {
    return {
      body: '',
      bodyComment: '',
      dialogHideComment: false,
      showTextarea: false,
      like: 0,
      userNotFaund: false,
      saveUrl: null
    }
  },
  components: { MyTextarea, MyButton, ToDoComment },
  props: {
    idPost: {
      type: Number,
      default: null
    },
    titlePost: {
      type: String,
      default: null
    },
    bodyPost: {
      type: String,
      default: null
    },
    imgPost: {
      type: String,
      default: null
    },
    arrayComments: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    addComment () {
      if (this.$store.getters['users/isAuth']) {
        this.$store.dispatch('comments/createComment', {
          body: this.body,
          idPost: this.idPost,
          idUser: this.$store.getters['users/getId'](this.$store.getters['users/userEmail']),
          idLogin: this.$store.getters['users/getUser'](this.$store.getters['users/userEmail']).login
        })
        this.body = ''
      }
    },
    changeComment (comment, index) {
      this.showTextarea = true
      const components = document.querySelectorAll('#components')
      components[index].classList.add('reverseActiveChange')
      this.myComment = comment.id
      const commentById = this.$store.getters['comments/commentById']
      const editComment = commentById(this.myComment)
      this.bodyComment = editComment.body
    },
    hideComment (index) {
      this.showTextarea = false
      const components = document.querySelectorAll('#components')
      components[index].classList.remove('reverseActiveChange')
    },
    saveUpdatePost (comment) {
      this.showTextarea = false
      this.$store.dispatch('comments/updateComment', {
        id: comment.id,
        body: this.bodyComment,
        idPost: comment.idPost,
        idUser: comment.idUser,
        idLogin: comment.idLogin,
        likes: comment.likes
      })
    },
    removeComment (comment) {
      this.dialogHideComment = true
      this.myComment = comment.id
    },
    deleteComment (id) {
      this.$store.dispatch('comments/deleteComment', id)
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
        this.$store.dispatch('comments/updateComment', {
          id: comment.id,
          body: comment.body,
          idPost: comment.idPost,
          idUser: comment.idUser,
          idLogin: comment.idLogin,
          likes: this.like,
          arrayUsersLikes: arrayUsers
        })
        this.userNotFaund = false
      } else {
        this.like = comment.likes - 1
        const index = arrayUsers.indexOf('idUser')
        arrayUsers.splice(index, 1)
        this.$store.dispatch('comments/updateComment', {
          id: comment.id,
          body: comment.body,
          idPost: comment.idPost,
          idUser: comment.idUser,
          idLogin: comment.idLogin,
          likes: this.like,
          arrayUsersLikes: arrayUsers
        })
      }
    }
  }
}
</script>

<style>
#components {
  display: none;
}
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
  margin: 15px
}

.content-sub-articlespost___element-body img {
  width: 100px;
  object-fit: cover;
  height: 100px;
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

#components {
  display: none;
}
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
</style>
