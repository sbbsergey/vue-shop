<template>
  <div class="card">
    <button class="btn" @click="loadProducts">Загрузить продукты</button>
    <button class="btn" @click="loadCategories">Загрузить категории</button>
  </div>
</template>

<script>
import data from '../../../database.json'
import axios from '@/axios/db'
export default {

  setup () {
    const loadProducts = () => {
      const products = data.products
      // products.length = 1

      products.forEach(async (item) => {
        const { data } = await axios.post('products.json', item)
        await axios.patch(`products/${data.name}.json`, { id: data.name })
      })
    }

    const loadCategories = () => {
      const categories = data.categories
      categories.forEach(async (item) => {
        const { data } = await axios.post('categories.json', item)
        await axios.patch(`categories/${data.name}.json`, { id: data.name })
      })
    }

    return {
      loadProducts,
      loadCategories
    }
  }

}
</script>

<style scoped>

</style>
