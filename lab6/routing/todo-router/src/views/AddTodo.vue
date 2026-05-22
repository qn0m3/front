<template>
  <div>
    <h1>Добавить задачу</h1>
    <form @submit.prevent="handleAdd">
      <input v-model="newTodoText" placeholder="Что нужно сделать?" autofocus />
      <button type="submit">Добавить</button>
    </form>
    <p><router-link to="/">Назад к списку</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodos } from '../composables/useTodos'
import { useRouter } from 'vue-router'

const newTodoText = ref('')
const { addTodo } = useTodos()
const router = useRouter()

const handleAdd = () => {
  if (newTodoText.value.trim()) {
    addTodo(newTodoText.value)
    router.push('/')
  }
}
</script>

<style scoped>
input, button {
  padding: 8px;
  font-size: 16px;
}
button {
  margin-left: 10px;
}
</style>