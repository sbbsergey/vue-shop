<template>
  <teleport to="body">
    <app-confirm
      v-if="visible"
      :title=title
      @confirm="confirm"
      @reject="reject"
    ></app-confirm>
  </teleport>
</template>

<script>

import AppConfirm from '@/components/ui/AppConfirm'

export default {
  emits: ['update:visible', 'confirm'],
  props: ['visible', 'title'],
  setup (_, { emit }) {
    const confirm = () => {
      emit('update:visible', false)
      emit('confirm')
    }
    const reject = () => {
      emit('update:visible', false)
    }

    return {
      confirm,
      reject
    }
  },
  components: { AppConfirm }
}
</script>

<style scoped>

</style>
