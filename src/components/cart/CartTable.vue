<template>
    <h3 class="text-center" v-if="isEmpty">В корзине пока ничего нет</h3>
    <template v-else>
      <table class="table">
        <thead>
        <tr>
          <th>Наименование</th>
          <th>Количество</th>
          <th>Цена (шт)</th>
        </tr>
        </thead>
        <tbody>
        <cart-table-item
          v-for="(_,id) in cart"
          :key="id"
          :id="id"
        />
        </tbody>
      </table>
      <hr>
      <p class="text-right"><strong>Всего: {{ currency(totalPrice) }} руб.</strong></p>
      <p class="text-right">
        <button class="btn" v-if="isAuth" @click="onPay">Оплатить</button>
        <button class="btn" v-else
                @click="authForm = true"
        >Авторизоваться</button>
      </p>
      <app-dialog v-model="authForm">
        <user-auth-form @onSubmit="authForm = false"/>
      </app-dialog>
    </template>
</template>

<script>

import { currency } from '@/utils/currency'
import { useCart } from '@/use/cart'
import CartTableItem from '@/components/cart/CartTableItem'
import { ref } from 'vue'
import { useStore } from 'vuex'
import UserAuthForm from '@/components/user/UserAuthForm'
import AppDialog from '@/components/ui/AppDialog'
import { useUser } from '@/use/user'
import { pay } from '@/utils/pay'
import { useRouter } from 'vue-router'

export default {
  props: {
    cart: {
      type: Object,
      required: true
    }
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const authForm = ref(false)
    const { totalPrice, isEmpty } = useCart()
    const { user, isAuth } = useUser()

    const onPay = async () => {
      try {
        await pay({
          description: 'Оплата товаров по заказу',
          amount: totalPrice.value,
          accountId: user.value.email,
          data: {
            test: 1
          }
        })
        await store.dispatch('order/add')
      } catch (e) {
        console.log('Reject pay: ', e)
      }

      await router.push('/orders/' + user.value.id)
    }

    return {
      isEmpty,
      totalPrice,
      currency,
      isAuth,
      authForm,
      onPay
    }
  },
  components: { AppDialog, UserAuthForm, CartTableItem }

}
</script>
