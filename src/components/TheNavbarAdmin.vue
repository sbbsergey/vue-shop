<template>
  <nav class="navbar">
    <h3>Админка</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/admin/products">Товары</router-link>
      </li>
      <li>
        <router-link to="/admin/categories">Категории</router-link>
      </li>
      <li>
        <router-link to="/admin/orders">Заказы</router-link>
      </li>
      <li>
        <router-link to="/">В магазин</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Выйти</a>
      </li>
      <li>
        <user-logo
          :is-admin="isAdmin"
          :name="user.email"
        />
      </li>
    </ul>

  </nav>
</template>

<script>
import { useUser } from '@/use/user'
import UserLogo from '@/components/user/UserLogo'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()
    const { isAdmin, user, logout: logoutUser } = useUser()

    return {
      isAdmin,
      user,
      logout: () => {
        logoutUser()
        router.push('/')
      }
    }
  },
  components: { UserLogo }
}
</script>
