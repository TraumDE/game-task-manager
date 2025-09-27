<script lang="ts" setup>
interface Props {
  title: string
  text: string
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
    <article>
      <header>
        <strong>{{ props.title }}</strong>
      </header>
      {{ text }}
      <footer class="confirm-popup__footer" role="group">
        <button @click="handleAnswer(true)" class="secondary">Подтвердить</button>
        <button @click="handleAnswer(false)">Отмена</button>
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
  }
}
</style>
