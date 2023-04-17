import { createStore } from 'vuex'

export default createStore({

})

// export default createStore({
//   state: {
//     username: 'zs'
//   },
//   getters: {
//     newName (state) {
//       return state.username + '!!!'
//     }
//   },
//   mutations: {
//     updateName (state) {
//       state.username = 'ls'
//     }
//   },
//   actions: {
//     updateName (ctx) {
//       setTimeout(() => {
//         ctx.commit('updateName')
//       }, 1000)
//     }
//   },
//   modules: {
//   }
// })
