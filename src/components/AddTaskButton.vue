<script lang="ts" setup>
import AddTaskIcon from './icons/AddTaskIcon.vue'
</script>
<template>
  <button class="add-task-button" type="button">
    <AddTaskIcon class="add-task-button__icon" />
  </button>
</template>
<style lang="scss" scoped>
.add-task-button {
  padding: 12px;
  &__icon {
    width: 24px;
    aspect-ratio: 1/1;
    fill: var(--pico-primary-inverse);
  }
}
</style>
