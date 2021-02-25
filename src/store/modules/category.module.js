import axios from '@/axios/db'
import { error } from '@/utils/error'
import { converFirebaseDataToArray } from '@/utils/firebase'

export default {
  namespaced: true,
  state () {
    return {
      categories: []
    }
  },
  mutations: {
    set (state, categories) {
      state.categories = categories
    },
    remove (state, id) {
      const index = state.categories.findIndex(item => item.id === id)
      state.categories.splice(index, 1)
    },
    add (state, category) {
      state.categories.push(category)
    },
    update (state, payload) {
      const item = state.categories.find(item => item.id === payload.id)
      Object.keys(item).forEach((key) => { item[key] = payload[key] })
    }
  },
  actions: {
    async load ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('categories.json')
        if (data) {
          commit('set', converFirebaseDataToArray(data))
        }
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: error('LOAD_CATEGORIES_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    },
    async remove ({ state, commit, dispatch }, id) {
      try {
        await axios.delete(`categories/${id}.json`)
        commit('remove', id)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: error('REMOVE_CATEGORY_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    },
    async add ({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.post('categories.json', payload)
        if (data) {
          commit('add', { id: data.name, ...payload })
        }
      } catch (e) {
        dispatch('setMessage', {
          value: error('ADD_CATEGORY_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    },
    async update ({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.patch(`categories/${payload.id}/.json`, payload)
        if (data) {
          commit('update', payload)
        }
      } catch (e) {
        dispatch('setMessage', {
          value: error('UPDATE_CATEGORY_ERROR'),
          type: 'danger'
        }, { root: true })
      }
    }
  },
  getters: {
    get (state) {
      return state.categories
    },
    getById: (state) => (id) => {
      return state.categories.find(item => item.id === id)
    },
    isEmpty (state) {
      return state.categories.length === 0
    }
  }
}
