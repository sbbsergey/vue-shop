<template>
  <teleport to="body">
    <app-confirm
      v-if="confirmRouteLeave"
      title = "Есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?"
      @confirm="navigate"
      @reject="confirmRouteLeave = false"
    ></app-confirm>
  </teleport>
</template>

<script>
import { ref } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import AppConfirm from '@/components/ui/AppConfirm'

export default {
  props: ['changed'],

  setup (props) {
    const confirmRouteLeave = ref(false)
    const canLeave = ref(false)
    const leaveTo = ref()
    const router = useRouter()

    onBeforeRouteLeave((to) => {
      leaveTo.value = to
      if (canLeave.value) {
        return true
      }
      if (props.changed) {
        confirmRouteLeave.value = true
        return false
      }
      return true
    })

    const navigate = () => {
      confirmRouteLeave.value = false
      canLeave.value = true
      router.push(leaveTo.value)
    }

    return {
      confirmRouteLeave, navigate

    }
  },
  components: { AppConfirm }

}
</script>
