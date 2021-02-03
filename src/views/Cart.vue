<template>
  <div class="card" v-if="!loading">
    <h1>Корзина</h1>
    <h3 class="text-center" v-if="productsIsEmpty">В корзине пока ничего нет</h3>
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
        <tr v-for="product in products" :key="product">
          <td>{{ product.title }}</td>
          <td>
            <button class="btn primary" @click="increment(product.id)">+</button>
            {{ product.cartCount }}
            <button class="btn danger" @click="decrement(product.id)">-</button>
          </td>
          <td> {{ product.price }} руб.</td>
        </tr>
        </tbody>
      </table>
      <hr>
      <p class="text-right"><strong>Всего: {{ total }} руб.</strong></p>
      <p class="text-right">
        <button class="btn">Оплатить</button>
      </p>
    </template>
  </div>
</template>

<script>

import { useCartForm } from '@/use/cart-form'

const CART_MODEL = {
  2: 3,
  5: 5,
  8: 1
}

export default {
  setup () {
    return { ...useCartForm(CART_MODEL) }
  }
}
</script>
