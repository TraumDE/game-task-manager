<script lang="ts" setup>
interface Props {
  text: string
  isCompleted: boolean
}

const props = defineProps<Props>()
</script>
<template>
  <article class="task">
    <header class="task__header">
      <input class="task__chekbox" type="checkbox" :checked="props.isCompleted" />
    </header>
    <strong class="task__text">
      {{ props.text }}
    </strong>
  </article>
</template>

<style lang="scss" scoped></style>
