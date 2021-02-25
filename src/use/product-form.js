import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed } from 'vue'

export function useProductForm (submit, initialValues) {
  console.log('initialValues', initialValues)
  const { isSubmitting, handleSubmit, handleReset, meta, values } = useForm({
    initialValues: initialValues
  })

  const { value: category, errorMessage: categoryError, handleBlur: categoryBlur } = useField(
    'category',
    yup
      .string()
      .trim()
      .required('Необходимо выбрать категорию товара')
  )

  const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField(
    'title',
    yup
      .string()
      .trim()
      .required('Введите название товара')
  )
  const { value: img, errorMessage: imgError, handleBlur: imgBlur } = useField(
    'img',
    yup
      .string()
      .trim()
      .required('Введите путь до изображения товара')
  )
  const { value: price, errorMessage: priceError, handleBlur: priceBlur } = useField(
    'price',
    yup
      .number()
      .required('Введите цену товара!')
      .positive('Цена не может быть отрицательной!')

  )
  const { value: count, errorMessage: countError, handleBlur: countBlur } = useField(
    'count',
    yup
      .number()
      .min(0, 'Остаток не может быть отрицательным!')
  )

  const changed = computed(() => {
    return Object.keys(values).some((key) => values[key] !== meta.value.initialValues[key])
  })

  const onSubmit = handleSubmit(submit)

  return {
    category,
    categoryError,
    categoryBlur,
    title,
    titleError,
    titleBlur,
    img,
    imgError,
    imgBlur,
    price,
    priceError,
    priceBlur,
    count,
    countError,
    countBlur,
    isSubmitting,
    onSubmit,
    changed,
    handleReset,
    meta
  }
}
