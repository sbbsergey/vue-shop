<template>
  <teleport to="body" v-if="modelValue">
    <div class="modal-backdrop" @click="close"></div>
    <div class="modal">
      <h3 v-if="title">{{ title }}</h3>

      <slot />
    </div>
  </teleport>
</template>

<script>
export default {
  emits: ['update:modelValue', 'close'],
  props: ['modelValue', 'title'],
  setup (_, { emit }) {
    const close = () => {
      emit('update:modelValue', false)
      emit('close')
    }

    return {
      close
    }
  }
}
</script>
