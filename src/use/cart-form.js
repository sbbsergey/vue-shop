import { useStore } from 'vuex'
import { computed, onMounted, reactive, ref } from 'vue'

export function useCartForm (CART_MODEL) {
  const store = useStore()
  const loading = ref(true)
  const cart = reactive(CART_MODEL)

  onMounted(async () => {
    // вариант загрузки всего справочника товаров
    // await store.dispatch('product/loadAll')

    // вариант загрузки только товаров из корзины
    for (const id in CART_MODEL) {
      await store.dispatch('product/loadByID', id)
    }

    loading.value = false
  })

  function increment (id) {
    cart[id]++
  }

  function decrement (id) {
    if (cart[id] > 0) {
      cart[id]--
    }
  }

  const products = computed(() => {
    const products = []
    for (const id in cart) {
      const product = store.getters['product/getByID'](id)
      if (product) {
        if (cart[id] === 0) {
          continue
        }
        products.push({ ...product, cartCount: cart[id] })

        // вариант, при котором не отрабатывает реактивность по событиям increment, decrement
        // уточнить, почему ?

        /*
        products.push({
          title: product.title,
          cartCount: cart[id],
          price: product.price
        })
        */
      }
    }
    return products
  })

  const productsIsEmpty = computed(() => products.value.length === 0)

  const total = computed(() => {
    let result = 0
    for (const id in cart) {
      const product = store.getters['product/getByID'](id)
      if (product) {
        result = result + cart[id] * product.price
      }
    }
    return result
  })

  return {
    loading,
    products,
    productsIsEmpty,
    increment,
    decrement,
    total
  }
}
