<template>
  <div class="w-full pt-8 h-full px-16">
    <div
      class="bg-primary/60 rounded-3xl text-white px-4 py-1 absolute top-0 z-[100]"
      v-if="fetchErrors.length"
    >
      <p v-for="error in fetchErrors" :key="error">{{ error }}</p>
    </div>
    <form class="p-4" @submit.prevent="onSubmit">
      <div class="name">
        <label for="register_email" class="text-sm"> Email Address * </label>
        <Field v-slot="{ field, errorMessage, handleChange }" name="email">
          <input
            name="email"
            v-model="field.value"
            @input="(e) => handleChange(e.target.value)"
            id="register_email"
            class="w-full rounded-2xl mt-2 border border-formPlaceholder py-3 pl-4 pr-16 focus-visible:outline-info focus-visible:outline-8"
            type="text"
            autocomplete="off"
          />
          <p class="text-xs text-red-500">{{ errorMessage }}</p>
        </Field>
      </div>
      <div class="password mt-6">
        <label for="register_password" class="text-sm"> Password * </label>
        <Field v-slot="{ field, errorMessage, handleChange }" name="password">
          <input
            name="password"
            v-model="field.value"
            @input="(e) => handleChange(e.target.value)"
            id="register_password"
            class="w-full rounded-2xl mt-2 border border-formPlaceholder py-3 pl-4 pr-16 focus-visible:outline-info focus-visible:outline-8"
            type="password"
            autocomplete="off"
          />
          <p class="text-xs text-red-500">{{ errorMessage }}</p>
        </Field>
      </div>
      <div class="password mt-6">
        <label for="register_passConf" class="text-sm"> Password Confirmation * </label>
        <Field v-slot="{ field, errorMessage, handleChange }" name="password_confirmation">
          <input
            name="password_confirmation"
            v-model="field.value"
            @input="(e) => handleChange(e.target.value)"
            id="register_passConf"
            class="w-full rounded-2xl mt-2 border border-formPlaceholder py-3 pl-4 pr-16 focus-visible:outline-info focus-visible:outline-8"
            type="password"
            autocomplete="off"
          />
          <p class="text-xs text-red-500">{{ errorMessage }}</p>
        </Field>
      </div>
      <div class="button mt-8">
        <button class="buttonStyle py-3">register</button>
      </div>
    </form>
  </div>
</template>

<script setup>
//NOTE - Cores
import {} from 'vue'
import { useRouter } from 'vue-router'
import { useForm, configure, Field } from 'vee-validate'
import * as yup from 'yup'

//NOTE - Hooks
const router = useRouter()

//NOTE - Composables
import auth from '@/composables/auth'
const { registerAuth, fetchErrors } = auth()

//NOTE - Form
const initialData = {
  email: '',
  password: '',
  password_confirmation: ''
}

const schema = yup.object().shape({
  email: yup.string().required('it must not be empty'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),

  password_confirmation: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
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
  console.log(data)
  registerAuth({
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation
  })
  if (fetchErrors.length === 0) router.push({ name: 'home' })
})
</script>

<style scoped></style>
