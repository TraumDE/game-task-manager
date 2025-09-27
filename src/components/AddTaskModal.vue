<script lang="ts" setup>
import { ref, watch, defineExpose } from 'vue'
import type { FormData } from '@/types'

interface Emits {
  (e: 'open', isOpen: boolean, formData?: FormData): void
  (e: 'submit', formData: FormData): void
}

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formData = ref<FormData>({ text: '' })
const dataIsInvalid = ref<boolean | undefined>(undefined)
const symbolsCount = ref<number>(0)
const invalidMessage = ref<string>('')
let canSendData: boolean = false

const resetForm = (): void => {
  formData.value.text = ''
  dataIsInvalid.value = undefined
  invalidMessage.value = ''
}

const handleOpen = (isOpen: boolean, formData?: FormData): void => {
  emit('open', isOpen, formData)
}

const formatFormData = (formData: string): string => {
  return formData.trim()
}

const verifyFormData = (newFormData: string, oldFormData: string): void => {
  const newFormatedData = formatFormData(newFormData)
  const oldFormatedData = formatFormData(oldFormData)

  if (newFormatedData.length === oldFormatedData.length) return

  symbolsCount.value = newFormatedData.length

  if (newFormatedData.length > 60) {
    invalidMessage.value = 'Лимит привышен'
    dataIsInvalid.value = true
    canSendData = false
  } else if (newFormatedData.length === 0) {
    canSendData = false
    dataIsInvalid.value = true
    invalidMessage.value = 'Нельзя сделать пустую задачу'
  } else {
    invalidMessage.value = ''
    dataIsInvalid.value = undefined
    canSendData = true
  }
}

watch(() => formData.value.text, verifyFormData)

const handleSubmit = (): void => {
  if (!canSendData) return

  emit('submit', formData.value)

  resetForm()
}

defineExpose({
  resetForm,
})
</script>

<template>
  <dialog :open="props.isOpen">
    <article>
      <header>
        <button @click="handleOpen(false, formData)" aria-label="Close" rel="prev"></button>
        <p>
          <strong> Создание новой задачи </strong>
        </p>
      </header>
      <form action="">
        <fieldset>
          <label for="task">
            Текст задачи
            <input
              id="task"
              type="text"
              placeholder="Текст задачи до 60 символов"
              autocomplete="false"
              aria-describedby="symbols-write"
              :aria-invalid="dataIsInvalid"
              v-model="formData.text"
            />
            <small id="symbols-write"> {{ symbolsCount }}/60 символов. {{ invalidMessage }}</small>
          </label>
        </fieldset>
        <fieldset>
          <button @click.prevent="handleSubmit" type="submit">Добавить</button>

          <button @click.prevent="handleOpen(false, formData)" class="secondary">Отмена</button>
        </fieldset>
      </form>
    </article>
  </dialog>
</template>

<style lang="scss" scoped>
.secondary {
  width: 100%;
}
</style>
