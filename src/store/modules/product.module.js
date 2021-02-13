import axios from '@/axios/product'
import { error } from '@/utils/error'
import { converFirebaseDataToArray } from '@/utils/firebase'

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
    },
    remove (state, id) {
      const index = state.products.findIndex(item => item.id === id)
      state.products.splice(index, 1)
    },
    update (state, payload) {
      const product = state.products.find(item => item.id === payload.id)
      Object.keys(product).forEach((key) => { product[key] = payload[key] })
    }
  },
  actions: {
    async loadAll ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('products.json')
        commit('setProducts', converFirebaseDataToArray(data))
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: error('LOAD_PRODUCTS_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    },
    async loadById ({ commit, dispatch }, id) {
      try {
        const { data } = await axios.get(`products/${id}.json`)
        commit('addProduct', data)
      } catch (e) {
        dispatch('setMessage', {
          value: error('LOAD_PRODUCTS_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    },
    async add ({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.post('products.json', payload)
        if (data) {
          commit('addProduct', { id: data.name, ...payload })
        }
      } catch (e) {
        dispatch('setMessage', {
          value: error('ADD_PRODUCT_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    },
    async update ({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.patch(`products/${payload.id}/.json`, payload)
        if (data) {
          commit('update', payload)
        }
      } catch (e) {
        dispatch('setMessage', {
          value: error('UPDATE_PRODUCT_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    },
    async remove ({ commit, dispatch }, id) {
      try {
        await axios.delete(`products/${id}.json`)
        commit('remove', id)
      } catch (e) {
        dispatch('setMessage', {
          value: error('REMOVE_PRODUCT_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    }
  },
  getters: {
    get: (state) => (id) => {
      return state.products.find(item => item.id === id)
    },
    getAll (state) {
      return state.products
    }
  }
}
