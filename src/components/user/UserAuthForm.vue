<template>
  <form @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>

    <div :class="['form-control', {invalid: eError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur">
      <small v-if="eError"> {{ eError }}</small>
    </div>

    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur">
      <small v-if="eError"> {{ pError }}</small>
    </div>

    <button class="btn primary" type="submit" @click="submitType='login'">Войти</button>
    <button class="btn" type="submit"  @click="submitType='signUp'">Создать аккаунт</button>

    <div class="text-danger" v-if="isTooManyAttempts"
    >Вы слишком часто пытаетесь войти в систему. Попробуйте позже.</div>

    <hr/>
    <div>Заполнить тестовыми регистрационными данными</div>
    <a href="#" v-for="{name} in testAuthData" :key="name" @click="setTestAuthData(name)">{{ name }} {{ }} </a>

  </form>

</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useField, useForm, useResetForm } from 'vee-validate'
import * as yup from 'yup'

export default {
  emits: ['onSubmit'],
  setup (_, { emit }) {
    const initialValues = ref({ email: '', password: '' })
    const store = useStore()
    const { handleSubmit, isSubmitting, submitCount } = useForm({ initialValues: initialValues })
    const resetForm = useResetForm()
    const submitType = ref('login')

    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
      'email',
      yup
        .string()
        .trim()
        .required('Введите email')
        .email('Введен не корректный email')
    )
    const PASSWORD_MIN_LENGTH = 6
    const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
      'password',
      yup
        .string()
        .trim()
        .required('Введите пароль')
        .min(PASSWORD_MIN_LENGTH, `Пароль не может быть менее ${PASSWORD_MIN_LENGTH} символов`)
    )

    const onSubmit = handleSubmit(async values => {
      const payload = {
        email: email.value,
        password: password.value
      }

      try {
        if (submitType.value === 'login') {
          await store.dispatch('auth/login', payload)
        } else {
          await store.dispatch('auth/signUp', payload)
        }
        emit('onSubmit')
      } catch (e) { console.error(e) }
    })

    const isTooManyAttempts = computed(() => submitCount.value >= 3)

    watch(isTooManyAttempts, value => {
      if (value) {
        setTimeout(() => { submitCount.value = 0 }, 1500)
      }
    })

    const testAuthData = [
      { name: 'Администратор', email: 'admin@shop.ru', password: '123456' },
      { name: 'Покупатель', email: 'sergey@gmail.com', password: '123456' }
    ]

    return {
      submitType,
      email,
      password,
      eError,
      pError,
      eBlur,
      pBlur,
      onSubmit,
      isSubmitting,
      isTooManyAttempts,
      initialValues,
      testAuthData,
      setTestAuthData: (name) => {
        resetForm()
        initialValues.value = testAuthData.find(item => item.name === name)
      }
    }
  }
}
</script>
