import axios from '@/axios/db'
import { converFirebaseDataToArray } from '@/utils/firebase'
import { error } from '@/utils/error'

export default {
  namespaced: true,
  state () {
    return {
      orders: []
    }
  },
  mutations: {
    setOrders (state, orders) {
      state.orders = orders
    },
    addOrder (state, order) {
      state.orders.push(order)
    }
  },
  actions: {
    async load ({ commit }) {
      const { data } = await axios.get('/orders.json')
      commit('setOrders', converFirebaseDataToArray(data))
    },
    async loadById ({ commit, dispatch }, id) {
      try {
        const { data } = await axios.get(`orders/${id}.json`)
        commit('addOrder', data)
      } catch (e) {
        dispatch('setMessage', {
          value: error('LOAD_ORDER_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    },
    async loadByUserId ({ commit, dispatch }, userId) {
      try {
        const { data } = await axios.get(`/orders.json?orderBy="userId"&equalTo="${userId}"`)
        commit('setOrders', converFirebaseDataToArray(data))
      } catch (e) {
        dispatch('setMessage', {
          value: error('LOAD_ORDERS_BY_USER_ID_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    },
    async add ({ commit, rootGetters }) {
      const cart = rootGetters['cart/getAll']
      const products = rootGetters['product/getAll']
      const order = {
        userId: rootGetters['auth/user'].id,
        email: rootGetters['auth/user'].email,
        totalPrice: 0,
        date: Date.now(),
        items: []
      }
      Object.keys(cart).forEach(id => {
        const product = products.find(p => p.id === id)
        order.items.push({
          name: product.title,
          price: product.price,
          count: cart[id]
        })
        order.totalPrice += product.price * cart[id]
      })

      // TODO контроль и списание остатков нужно осуществлять на сервере при проведении заказа
      await axios.post('/orders.json', order)

      commit('cart/clear', null, { root: true })
    }
  },
  getters: {
    getAll (state) {
      return state.orders
    },
    get: (state) => (id) => {
      return state.orders.find(item => item.id === id)
    }
  }
}
