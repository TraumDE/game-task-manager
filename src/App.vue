<script setup lang="ts">
import { ref } from 'vue'

import AddTaskButton from './components/AddTaskButton.vue'
import AddTaskModal from './components/AddTaskModal.vue'
import CircleProgressBar from './components/CircleProgressBar.vue'

const isTaskModalOpen = ref<boolean>(true)

const handleTaskModalOpen = (isOpen: boolean) => {
  isTaskModalOpen.value = isOpen
}
</script>

<template>
  <header class="header">
    <CircleProgressBar :level="2" :filled="80" />
    <hgroup>
      <h1>Добро пожаловать</h1>
      <p>Текущий опыт: 18 / 20</p>
    </hgroup>
  </header>
  <main class="main"></main>
  <AddTaskButton class="add-task-button" @click="handleTaskModalOpen(true)" />
  <AddTaskModal @open="handleTaskModalOpen" :is-open="isTaskModalOpen" />
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-wrap: nowrap;
  text-align: center;
  gap: 40px;
}

.add-task-button {
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 999;
}
</style>
