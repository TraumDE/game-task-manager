<script setup lang="ts">
import { ref } from 'vue'

import AddTaskButton from './components/AddTaskButton.vue'
import AddTaskModal from './components/AddTaskModal.vue'
import CircleProgressBar from './components/CircleProgressBar.vue'
import TaskCard from './components/TaskCard.vue'

import type { Task } from './types'
import type { FormData } from './types'

const isTaskModalOpen = ref<boolean>(false)
const tasksList = ref<Task[]>([])

let currentTaskId = 0

const handleTaskModalOpen = (isOpen: boolean) => {
  isTaskModalOpen.value = isOpen
}

const handleAddTask = (formData: FormData): void => {
  tasksList.value.push({
    id: currentTaskId++,
    text: formData.text,
    isCompleted: false,
  })
}
</script>

<template>
  <header class="container header">
    <CircleProgressBar :level="2" :filled="80" />
    <hgroup>
      <h1>Добро пожаловать</h1>
      <p>Текущий опыт: 18 / 20</p>
    </hgroup>
  </header>
  <main class="container">
    <TaskCard
      v-for="task in tasksList"
      :key="task.id"
      :text="task.text"
      :is-completed="task.isCompleted"
    />
  </main>
  <AddTaskButton class="add-task-button" @click="handleTaskModalOpen(true)" />
  <AddTaskModal @submit="handleAddTask" @open="handleTaskModalOpen" :is-open="isTaskModalOpen" />
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
