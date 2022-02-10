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
  carouselPosts (state) {
    return state.posts.filter(post => post.radioNames === 'Поместить в слайдер')
  },

  newsPosts (state) {
    const arrayNews = []
    let count = 0
    for (let i = 0; i < state.posts.length; i++) {
      if (state.posts[i].selected === 'Новость' && count < 5) {
        count++
        arrayNews.push(state.posts[i])
      }
    }
    return arrayNews
  },

  articlesPosts (state) {
    const arrayArticles = []
    let count = 0
    for (let i = 0; i < state.posts.length; i++) {
      if (state.posts[i].selected === 'Статья' && count < 3) {
        count++
        arrayArticles.push(state.posts[i])
      }
    }
    return arrayArticles
  },

  // Поиск популярных постов по количеству комментариев
  // Примечание доработать добавив дату и сортировку
  popularPosts (state, getters, rootState, rootGetters) {
    const popularArray = []
    for (let i = 0; i < state.posts.length; i++) {
      if (rootGetters['comments/getComments'](state.posts[i].id).length > 0) {
        popularArray.push(state.posts[i])
      }
    }
    return popularArray
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
