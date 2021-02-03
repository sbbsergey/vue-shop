import axios from '@/axios/product'
import { error } from '@/utils/error'

export default {
  namespaced: true,
  state () {
    return {
      products: []
    }
  },
  mutations: {
    setProducts (store, products) {
      store.products = products
    },
    addProduct (store, product) {
      store.products.push(product)
    }
  },
  actions: {
    async loadAll ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('products')
        commit('setProducts', data)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: error('LOAD_PRODUCTS_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    },
    async loadByID ({ commit, dispatch }, id) {
      try {
        const { data } = await axios.get(`products/${id}`)
        commit('addProduct', data)
      } catch (e) {
        dispatch('setMessage', {
          value: error('LOAD_PRODUCTS_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    }
  },
  getters: {
    getByID: (state) => (id) => {
      return state.products.find(item => item.id === id)
    },
    getAll (state) {
      return state.products
    }
  }
}
