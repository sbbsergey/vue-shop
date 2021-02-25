import { computed } from 'vue'
import { useStore } from 'vuex'

export function useUser (props) {
  const store = useStore()

  return {
    isAuth: computed(() => store.getters['auth/isAuthenticated']),
    user: computed(() => store.getters['auth/user']),
    isAdmin: computed(() => store.getters['auth/isAdmin']),
    logout: () => store.commit('auth/logout')
  }
}
