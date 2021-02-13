import { ref } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

export function useConfirmRouteLeave (hasChanges) {
  const confirmRouteLeave = ref(false)
  const canLeave = ref(false)
  const leaveTo = ref()
  const router = useRouter()

  onBeforeRouteLeave((to) => {
    leaveTo.value = to
    if (canLeave.value) {
      return true
    }
    if (hasChanges.value) {
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
}
