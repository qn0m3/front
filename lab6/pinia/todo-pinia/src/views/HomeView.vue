<template>
  <div>
    <h1>Список задач</h1>
    <ul>
      <li v-for="todo in todosStore.todos" :key="todo.id">
        <router-link :to="`/task/${todo.id}`">
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        </router-link>
        <span> ({{ todo.completed ? '✓ выполнено' : '○ не выполнено' }})</span>
      </li>
    </ul>
    <p v-if="todosStore.todos.length === 0">Нет задач. <router-link to="/add">Добавьте первую</router-link></p>
  </div>
</template>

<script setup>
import { useTodosStore } from '../stores/todos'

const todosStore = useTodosStore()
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>