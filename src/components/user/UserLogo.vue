<template>
  <div>
    {{ isAdmin ? 'Администратор': 'Покупатель'}}
    <br>
    <div>{{ name }}</div>
  </div>
</template>

<script>
export default {
  props: ['isAdmin', 'name']
}
</script>
