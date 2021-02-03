<template>
  <div class="card">
    <h1>Product {{ id }}</h1>
    <pre> {{ product }}</pre>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const store = useStore()

    const product = store.dispatch('products/loadById', props.id)
    console.log('product', product)

    onMounted(() => {
      console.log('Component is mounted!')
      console.log(props.id)
    })

    return {
      product
    }
  }
}
</script>
