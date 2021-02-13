<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Изображение</th>
      <th>Цена</th>
      <th>Категория</th>
      <th>Количество</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <admin-products-table-item v-for="(product, index) in products" :key="product.id"
                               :product="product"
                               :index="index"
      >
    </admin-products-table-item>
    </tbody>
  </table>
</template>

<script>
import AdminProductsTableItem from '@/components/admin/AdminProductsTableItem'
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  components: { AdminProductsTableItem }
}
</script>
