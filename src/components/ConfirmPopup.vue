<script lang="ts" setup>
interface Props {
  title: string
  text: string
  confirmButtonText?: string
  discardButtonText?: string
}

interface Emits {
  (e: 'answer', answer: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleAnswer = (answer: boolean) => {
  emit('answer', answer)
}
</script>

<template>
  <dialog class="confirm-popup">
    <article class="confirm-popup__article">
      <header class="confitm-popup__header">
        <strong>{{ props.title }}</strong>
      </header>
      {{ text }}
      <footer class="confirm-popup__footer" role="group">
        <button class="primary" @click="handleAnswer(false)">
          {{ discardButtonText ? discardButtonText : 'Отмена' }}
        </button>
        <button @click="handleAnswer(true)" class="confirm-popup__button secondary">
          {{ confirmButtonText ? confirmButtonText : 'Подтвердить' }}
        </button>
      </footer>
    </article>
  </dialog>
</template>

<style lang="scss" scoped>
.confirm-popup {
  &__footer {
    padding: 0;
    margin: 0;
    margin-top: 40px;

    @media (width >= 350px) {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
