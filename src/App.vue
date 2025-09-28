<script setup lang="ts">
import { ref, watch } from 'vue'

import AddTaskButton from './components/AddTaskButton.vue'
import AddTaskModal from './components/AddTaskModal.vue'
import CircleProgressBar from './components/CircleProgressBar.vue'
import TaskCard from './components/TaskCard.vue'
import VerifyModal from './components/ConfirmPopup.vue'

import type { Task } from './types'
import type { FormData } from './types'
import type { PopupData } from './types'
import type { IntRange } from './types'

const isTaskModalOpen = ref<boolean>(false)
const tasksList = ref<Task[]>([])
const isConfirmPopupOpen = ref<boolean>(false)
const confirmPopupData = ref<PopupData>({ title: '', text: '' })
const taskModalRef = ref<InstanceType<typeof AddTaskModal> | null>(null)
const currentXp = ref<number>(0)
const currentMaxXp = ref<number>(20)
const xpFilledPercentage = ref<IntRange<0, 101>>(30)

const savedTasks = localStorage.getItem('tasks')
if (savedTasks) tasksList.value = JSON.parse(savedTasks)

watch(
  tasksList,
  (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  },
  { deep: true },
)

let currentTaskId = 0

const handleCloseConfirmPopup = (answer: boolean): void => {
  isConfirmPopupOpen.value = false
  confirmPopupData.value.text = ''
  confirmPopupData.value.title = ''

  if (answer) {
    isTaskModalOpen.value = false
    taskModalRef.value?.resetForm()
  }
}

const handleOpenConfirmPopup = (popupData: PopupData): void => {
  isConfirmPopupOpen.value = true
  confirmPopupData.value.text = popupData.text
  confirmPopupData.value.title = popupData.title
}

const handleTaskModalOpen = (isOpen: boolean, formData?: FormData) => {
  if (formData || !isOpen) {
    const popupData: PopupData = {
      text: 'Некоторые поля остались заполненны. Закрытие приведет к их потере.',
      title: 'Вы уверены?',
    }

    if (formData?.text !== '') handleOpenConfirmPopup(popupData)
    else isTaskModalOpen.value = false
  } else if (!formData) {
    isTaskModalOpen.value = isOpen
  }
}

const handleAddTask = (formData: FormData): void => {
  isTaskModalOpen.value = false

  tasksList.value.push({
    id: currentTaskId++,
    text: formData.text,
    isCompleted: false,
  })
}

const handleTaskDelete = (taskId: number): void => {
  tasksList.value = tasksList.value.filter((task) => task.id !== taskId)
}
</script>

<template>
  <header class="container header">
    <CircleProgressBar :level="2" :filled="xpFilledPercentage" />
    <hgroup>
      <h1>Добро пожаловать</h1>
      <p>Текущий опыт: {{ currentXp }} / {{ currentMaxXp }}</p>
    </hgroup>
  </header>
  <main class="container">
    <TaskCard
      v-for="task in tasksList"
      :key="task.id"
      :text="task.text"
      :is-completed="task.isCompleted"
      @complete-task="handleTaskDelete(task.id)"
    />
  </main>
  <AddTaskButton class="add-task-button" @click="handleTaskModalOpen(true)" />
  <AddTaskModal
    ref="taskModalRef"
    @submit="handleAddTask"
    @open="handleTaskModalOpen"
    :is-open="isTaskModalOpen"
  />
  <VerifyModal
    :open="isConfirmPopupOpen"
    @answer="handleCloseConfirmPopup"
    :text="confirmPopupData.text"
    :title="confirmPopupData.title"
  />
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
