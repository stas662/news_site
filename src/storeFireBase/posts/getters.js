//  Функция для дозагрузки постов
// function getFilterPosts (state, number, string) {
//   const array = []
//   let i = 0
//   if (number === -1) {
//     return state.posts.filter(post => post.selected === string)
//   }
//   state.posts.filter(post => {
//     if (post.selected === string && i < number) {
//       i++
//       array.push(post)
//     }
//   })
//   return array
// }

export default {
  recommendedPosts (state) {
    return state.posts.filter(post => post.radioNames === 'Поместить в рекомендации')
  },

  newsPosts (state) {
    return state.posts.filter(post => post.selected === 'Новость')
  },

  articlesPosts (state) {
    return state.posts.filter(post => post.selected === 'Статья')
  },

  filterPosts: state => string => {
    const sciencesPost = []
    for (let i = 0; i < state.posts.length; i++) {
      if (state.posts[i].checkedNames) {
        for (const [key, value] of Object.entries(state.posts[i].checkedNames)) {
          if (value === string) {
            sciencesPost.push(state.posts[i])
          }
          if (!key) {
            console.log(key)
          }
        }
      }
    }
    return sciencesPost
  },

  postById (state) {
    return (id) => state.posts.find(item => item.id === id)
  }
}
