<template>
  <div class="w-full pt-8 h-full px-16 relative">
    <form class="p-4" @submit.prevent="onSubmit">
      <div
        class="bg-primary/60 rounded-3xl text-white px-4 py-1 absolute top-0 z-[100]"
        v-if="fetchErrors.length"
      >
        <p v-for="error in fetchErrors" :key="error">{{ error }}</p>
      </div>
      <div class="name">
        <label for="login_email" class="text-sm">Email Address * </label>
        <Field v-slot="{ field, errorMessage, handleChange }" name="email">
          <input
            id="login_email"
            name="email"
            v-model="field.value"
            @input="(e) => handleChange(e.target.value)"
            class="w-full rounded-2xl mt-2 border border-formPlaceholder py-3 pl-4 pr-16 focus-visible:outline-info focus-visible:outline-8"
            type="text"
            autocomplete="off"
          />
          <p class="text-xs text-red-500">{{ errorMessage }}</p>
        </Field>
      </div>
      <div class="password mt-6">
        <label for="login_password" class="text-sm"> Password * </label>
        <Field v-slot="{ field, errorMessage, handleChange }" name="password">
          <input
            id="login_password"
            name="password"
            v-model="field.value"
            @input="(e) => handleChange(e.target.value)"
            class="w-full rounded-2xl mt-2 border border-formPlaceholder py-3 pl-4 pr-16 focus-visible:outline-info focus-visible:outline-8"
            type="password"
            autocomplete="off"
          />
          <p class="text-xs text-red-500">{{ errorMessage }}</p>
        </Field>
      </div>
      <div class="button mt-8">
        <button class="buttonStyle py-3">log in</button>
      </div>
    </form>
  </div>
</template>

<script setup>
//NOTE - Cores
import {} from 'vue'
import { useForm, configure, Field } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

//NOTE - Composables
import auth from '@/composables/auth'
const { loginAuth, fetchErrors } = auth()

//NOTE - Hooks
const router = useRouter()

//NOTE - Form
const initialData = {
  email: 'evren@gmail.com',
  password: '123456'
}

const schema = yup.object().shape({
  email: yup.string().required('it must not be empty'),
  password: yup.string().required('Password is required')
})

const { handleSubmit } = useForm({
  initialValues: initialData,
  validationSchema: schema,
  validateOnMount: false
})

configure({
  bails: false,
  validateOnInput: true
})

const onSubmit = handleSubmit((data) => {
  // console.log(data)
  loginAuth({
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation
  })
  if (fetchErrors.value.length === 0) router.push({ name: 'home' })
})
</script>

<style scoped></style>
