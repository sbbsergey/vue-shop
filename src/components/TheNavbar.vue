<template>
  <nav class="navbar">
    <h3>Магазин с едой</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Товары</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина  <strong v-if="totalCount">[{{ totalCount }}]</strong> </router-link>
      </li>
      <li v-if="isAuth && !isAdmin">
        <router-link :to="'/orders/' + user.id">Мои заказы</router-link>
      </li>
      <li v-if="isAuth && isAdmin">
        <router-link to="/admin">Админка</router-link>
      </li>
      <li v-if="!isAuth">
        <a href="#" @click.prevent="authForm = true">Войти</a>
      </li>
      <template v-else>
        <li>
          <a href="#" @click.prevent="logout">Выйти</a>
        </li>
        <li>
          <user-logo
            :is-admin="isAdmin"
            :name="user.email"
          />
        </li>
      </template>

    </ul>

  </nav>

  <app-dialog v-model="authForm">
    <user-auth-form @onSubmit="authForm = false"/>
  </app-dialog>

</template>

<script>
import { useCart } from '@/use/cart'
import { useUser } from '@/use/user'
import { ref } from 'vue'
import UserAuthForm from '@/components/user/UserAuthForm'
import AppDialog from '@/components/ui/AppDialog'
import UserLogo from '@/components/user/UserLogo'

export default {
  setup () {
    const authForm = ref(false)

    const { totalCount } = useCart()
    const { isAuth, user, isAdmin, logout } = useUser()

    return {
      totalCount,
      authForm,
      isAuth,
      user,
      isAdmin,
      logout
    }
  },
  components: { UserAuthForm, AppDialog, UserLogo }
}
</script>
