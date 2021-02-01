<template>
  <nav class="navbar">
    <h3>Интернет магазин</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина</router-link>
      </li>
      <li>
        <a href="#" @click="logout">Выход</a>
      </li>
    </ul>

  </nav>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/auth')
      }
    }
  }
}
</script>
