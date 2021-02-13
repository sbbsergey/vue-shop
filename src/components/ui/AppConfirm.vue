<template>
  <app-modal :title="title" @close="$emit('reject')">
    <button class="btn primary" @click="$emit('confirm')">Да</button>
    <button class="btn danger" @click="$emit('reject')">Нет</button>
  </app-modal>
</template>

<script>
import AppModal from '@/components/ui/AppModal'
export default {
  emits: ['confirm', 'reject'],
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: { AppModal }
}
</script>

<style scoped>

</style>
