<script lang="ts" setup>
interface Emits {
  (e: 'open', isOpen: boolean): void
}
interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleOpen = (isOpen: boolean): void => {
  emit('open', isOpen)
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
            />
            <small id="symbols-write">0/60 символов</small>
          </label>
        </fieldset>
        <fieldset>
          <button @click.prevent="" type="submit">Добавить</button>

          <button @click="handleOpen(false)" type="reset">Отмена</button>
        </fieldset>
      </form>
    </article>
  </dialog>
</template>

<style lang="scss" scoped>
button[type='reset'] {
  width: 100%;
}
</style>
