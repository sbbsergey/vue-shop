import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export function useProductForm (fn) {
  const { isSubmitting, handleSubmit } = useForm({
    initialValues: {
      count: 0,
      price: 0
    }
  })

  const { value: category, errorMessage: categoryError, handleBlur: categoryBlur } = useField(
    'category',
    yup
      .string()
      .trim()
      .required('Выберите категорию')
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
  )
  const { value: count, errorMessage: countError, handleBlur: countBlur } = useField(
    'count',
    yup
      .number()
  )

  const onSubmit = handleSubmit(fn)

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
    onSubmit
  }
}
