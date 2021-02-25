<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: titleError}">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" @blur="titleBlur">
      <small v-if="titleError">{{titleError}}</small>
    </div>
    <div :class="['form-control', { invalid: typeError }]">
      <label for="img">Тип</label>
      <input type="text" id="img" v-model="type" @blur="typeBlur">
      <small v-if="typeError">{{ typeError }}</small>
    </div>

    <div v-if="$slots.add">
      <button class="btn primary" :disabled="isSubmitting || !meta.valid" >Добавить</button>
    </div>

    <div v-if="$slots.edit">
      <button class="btn danger" @click.prevent="confirmRemove = true" v-if="!changed">Удалить</button>
      <button class="btn" @click.prevent="$emit('close')" v-if="!changed">Закрыть</button>
      <button class="btn" @click.prevent="handleReset" v-if="changed">Отменить изменения</button>
      <button class="btn primary" :disabled="isSubmitting || !meta.valid" v-if="changed">Сохранить изменения</button>
    </div>

  </form>

  <app-confirm-route-leave v-if="confirmRouteLeave"
    :changed="changed"
  />

  <app-confirm-action
    v-model:visible="confirmRemove"
    title="Категория будет удалена. Продолжить?"
    @confirm="remove"
  />

</template>

<script>

import AppConfirmRouteLeave from '@/components/ui/AppConfirmRouteLeave'
import AppConfirmAction from '@/components/ui/AppConfirmAction'

import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useCategories } from '@/use/categories'
import { useCategoryForm } from '@/use/category-form'

export default {
  emits: ['remove', 'add', 'update', 'close'],
  props: {
    id: {
      type: String,
      required: false
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const initialValues = ref({})
    const confirmRemove = ref(false)
    const confirmRouteLeave = ref(true)

    const {
      load: loadCategories,
      category
    } = useCategories(props)

    onMounted(async () => {
      await loadCategories()
      initialValues.value = { ...store.getters['category/getById'](props.id) }
    })

    const submit = async values => {
      if (props.id) {
        await emit('update', { id: props.id, ...values })
        initialValues.value = category.value
      } else {
        await emit('add', values)
      }
    }
    const remove = async () => {
      confirmRouteLeave.value = false
      emit('remove', props.id)
    }

    return {
      confirmRemove,
      confirmRouteLeave,
      category,
      remove,
      ...useCategoryForm(submit, initialValues)
    }
  },
  components: { AppConfirmAction, AppConfirmRouteLeave }
}
</script>
