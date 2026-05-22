<template>
  <div>
    <h1>Задача</h1>
    <div v-if="todo">
      <p><strong>Текст:</strong> {{ todo.text }}</p>
      <p><strong>Статус:</strong> {{ todo.completed ? 'Выполнена' : 'Не выполнена' }}</p>
      <div>
        <button @click="toggleComplete" :disabled="actionDone">Изменить статус</button>
        <button @click="deleteTask" :disabled="actionDone" style="margin-left:10px;">Удалить задачу</button>
      </div>
      <p><router-link to="/">Назад к списку</router-link></p>
    </div>
    <div v-else>
      <p>Задача не найдена</p>
      <router-link to="/">Вернуться на главную</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodosStore } from '../stores/todos'

const route = useRoute()
const router = useRouter()
const todosStore = useTodosStore()

const id = parseInt(route.params.id)
const todo = ref(null)
const actionDone = ref(false)

onMounted(() => {
  todo.value = todosStore.getTodoById(id)
  if (!todo.value) return

  if (route.name === 'delete') {
    todosStore.deleteTodo(id)
    actionDone.value = true
    alert('Task deleted')
    router.push('/')
  } else if (route.name === 'complete') {
    todosStore.toggleComplete(id)
    actionDone.value = true
    alert('Task status has been changed')
    router.push('/')
  }
})

const toggleComplete = () => {
  todosStore.toggleComplete(id)
  alert('Task status has been changed')
  router.push('/')
}

const deleteTask = () => {
  todosStore.deleteTodo(id)
  alert('Task deleted')
  router.push('/')
}
</script>