<template>
  <div class="card">
    <h1>Product {{ id }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>
