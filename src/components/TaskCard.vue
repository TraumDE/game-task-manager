<script lang="ts" setup>
interface Emits {
  (e: 'completeTask'): void
}

interface Props {
  text: string
  isCompleted: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleCompleteTask = () => {
  emit('completeTask')
}
</script>
<template>
  <article class="task">
    <header class="task__header">
      <input
        class="task__chekbox"
        type="checkbox"
        :checked="props.isCompleted"
        @click="handleCompleteTask"
      />
    </header>
    <strong class="task__text">
      {{ props.text }}
    </strong>
  </article>
</template>

<style lang="scss" scoped></style>
