import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed } from 'vue'

export function useCategoryForm (submit, initialValues) {
  const { isSubmitting, handleSubmit, handleReset, meta, values } = useForm({
    initialValues: initialValues
  })
  const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField(
    'title',
    yup
      .string()
      .trim()
      .required('Введите наименование категории')
  )

  const { value: type, errorMessage: typeError, handleBlur: typeBlur } = useField(
    'type',
    yup
      .string()
      .trim()
      .required('Введите тип категории')
  )

  const changed = computed(() => {
    return Object.keys(values).some((key) => values[key] !== meta.value.initialValues[key])
  })

  const onSubmit = handleSubmit(submit)

  return {
    title,
    titleError,
    titleBlur,
    type,
    typeError,
    typeBlur,
    isSubmitting,
    onSubmit,
    meta,
    changed,
    handleReset
  }
}
