import axios from '@/axios/product'
import { error } from '@/utils/error'
import { converFirebaseDataToArray } from '@/utils/firebase'

export default {
  namespaced: true,
  state () {
    return {
      categories: {}
    }
  },
  mutations: {
    setCategories (state, categories) {
      // !!!
      // используется двойное преобразование
      // из объекта в массив, потом в объект
      // нужно переделать
      state.categories = categories.reduce((acc, item) => {
        acc[item.type] = item
        return acc
      }, {})
    },
    remove (state, id) {
      console.log(id)
      console.log(state.categories)
      const type = Object.keys(state.categories).find(key => state.categories[key].id === id).type
      //      const type = state.categories.find(item => item.id === id).type
      if (type) {
        delete state.categories[type]
      }
    },
    add (state, category) {
      state.categories[category.type] = category
    }
  },
  actions: {
    async load ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('categories.json')
        commit('setCategories', converFirebaseDataToArray(data))
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
    }
  },
  getters: {
    get (state) {
      return state.categories
    },
    isEmpty (state) {
      return Object.keys(state.categories).length === 0
    }
  }
}
