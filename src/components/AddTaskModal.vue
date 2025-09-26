<script lang="ts" setup>
import { ref } from 'vue'
import type { FormData } from '@/types'

interface Emits {
  (e: 'open', isOpen: boolean): void
  (e: 'submit', formData: FormData): void
}

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const formData = ref<FormData>({ text: '' })

const handleOpen = (isOpen: boolean): void => {
  emit('open', isOpen)
}

const handleSubmit = (): void => {
  if (!formData.value) return
  formData.value.text = ''
  emit('submit', formData.value)
}
</script>

<template>
  <dialog :open="props.isOpen">
    <article>
      <header>
        <button @click="handleOpen(false)" aria-label="Close" rel="prev"></button>
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
              placeholder="Текс задачи до 60 символов"
              autocomplete="false"
              aria-describedby="symbols-write"
              v-model="formData.text"
            />
            <small id="symbols-write">0/60 символов</small>
          </label>
        </fieldset>
        <fieldset>
          <button @click.prevent="handleSubmit" type="submit">Добавить</button>

          <button @click="handleOpen(false)" type="reset">Отмена</button>
        </fieldset>
      </form>
    </article>
  </dialog>
</template>

<style lang="scss" scoped></style>
