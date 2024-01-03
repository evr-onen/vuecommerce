<template>
  <div class="w-full p-4">
    <SingleComment v-for="comment in commentsData" :key="comment.id" :commentData="comment" />
    <div class="" v-if="commentsData?.length === 0">No comments yet.</div>
    <div class="" v-if="UserStore.getUserID">
      <form class="p-4" @submit.prevent="onSubmit">
        <Field v-slot="{ field, errorMessage, handleChange }" name="rating">
          <Rating
            class=""
            v-model="field.value"
            @change="(e) => handleChange(e.value)"
            :cancel="false"
            size="small"
            :pt="{
              onIcon: { class: '!text-yellow-500 h-6' },
              offIcon: { class: ' h-6' },
              item: { class: 'w-6 ml-1' }
            }"
          />
          <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
        </Field>
        <Field v-slot="{ field, errorMessage, handleChange }" name="comment">
          <label class="block w-full">Your Comment</label>
          <TextArea
            class="w-full"
            autoResize
            rows="3"
            cols="30"
            size="small"
            v-model="field.value"
            @input="(e) => handleChange(e.target.value)"
            :pt="{
              root: {
                class:
                  'w-full font-medium rounded-2xl mt-1 py-2 pl-4 pr-16 focus:!shadow-none border border-formPlaceholder focus:outline-1 focus:border focus:border-info'
              }
            }"
          />
          <p class="text-xs text-red-500 absolute z-0 capitalize">{{ errorMessage }}</p>
        </Field>
        <button class="buttonStyle mt-8 !w-[10%] ml-auto" type="submit">Submit</button>
      </form>
    </div>
    <div class="my-8" v-else>
      <p class="text-center font-thin">
        Please <router-link to="/auth#login" class="font-bold"> Login</router-link> for add your
        comment.
      </p>
    </div>
  </div>
</template>

<script setup>
//NOTE - Defines
const props = defineProps(['commentsData', 'productID'])
const emits = defineEmits(['addCommentHandler'])

//NOTE -  Validate
import * as yup from 'yup'
import { useForm, Field } from 'vee-validate'

//NOTE - Components
import SingleComment from './SingleComment.vue'

//NOTE - Composables
import comments from '@/composables/comment'
const { createComment } = comments()

//NOTE - Stores
import { useUserStore } from '@/stores/UserStore'
const UserStore = useUserStore()

//NOTE -  Form
const schema = yup.object().shape({
  comment: yup.string().required('it must not be empty')
})
const initialData = {
  comment: '',
  rating: 1
}
const { handleSubmit, resetForm } = useForm({
  initialValues: initialData,
  validationSchema: schema,
  validateOnMount: false
})
const onSubmit = handleSubmit((data) => {
  const user_id = Number(UserStore.getUserID)
  const product_id = props.productID
  const tmpData = { ...data, user_id, product_id }
  createComment(tmpData)
  emits('addCommentHandler', { ...tmpData, user: { name: UserStore.getUserName } })
  resetForm()
})
</script>

<style scoped></style>
