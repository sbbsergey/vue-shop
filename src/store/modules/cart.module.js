const CART_KEY = 'vue3-shop-cart'

export default {
  namespaced: true,
  state () {
    return {
      cart: JSON.parse(localStorage.getItem(CART_KEY)) ?? {}
    }
  },
  mutations: {
    inc (state, id) {
      if (id in state.cart) {
        state.cart[id]++
      } else {
        state.cart[id] = 1
      }
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart))
    },
    dec (state, id) {
      state.cart[id]--
      if (state.cart[id] === 0) {
        delete state.cart[id]
      }
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart))
    },
    clear (state) {
      state.cart = {}
      localStorage.removeItem(CART_KEY)
    }
  },
  actions: {},
  getters: {
    get: (state) => (id) => {
      return state.cart[id]
    },
    getAll (state) {
      return state.cart
    }
  }
}
