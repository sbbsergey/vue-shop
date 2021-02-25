<template>
  <app-page title="Авторизация">
    <user-auth-form @onSubmit="$router.push('/')"/>
<!--    <user-auth-form/>-->
  </app-page>
</template>

<script>

import UserAuthForm from '@/components/user/UserAuthForm'
import AppPage from '@/components/ui/AppPage'

import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { watch, reactive } from 'vue'
import { error } from '@/utils/error'

export default {

  setup () {
    const route = useRoute()
    const store = useStore()
    const state = reactive(route)

    const setMessage = r => {
      if (r.query.message) {
        store.commit('setMessage', {
          value: error(route.query.message),
          type: 'warning'
        })
      }
    }

    watch(state, setMessage)

    setMessage(route)
  },

  components: { UserAuthForm, AppPage }

}
</script>
