
export default {
  namespaced: true,
  state () {
    return {
      cart: { }
    }
  },
  mutations: {
    increment (state, id) {
      if (id in state.cart) {
        state.cart[id]++
      } else {
        state.cart[id] = 1
      }
    },
    decrement (state, id) {
      state.cart[id]--
      if (state.cart[id] === 0) {
        delete state.cart[id]
      }
    }
  },
  actions: {
  },
  getters: {
    get: (state) => (id) => {
      return state.cart[id]
    },
    getAll (state) {
      return state.cart
    }
  }
}
