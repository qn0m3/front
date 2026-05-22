<template>
  <div>
    <h1>Список задач</h1>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <router-link :to="`/task/${todo.id}`">
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        </router-link>
        <span> ({{ todo.completed ? '✓ выполнено' : '○ не выполнено' }})</span>
      </li>
    </ul>
    <p v-if="todos.length === 0">Нет задач. <router-link to="/add">Добавьте первую</router-link></p>
  </div>
</template>

<script setup>
import { useTodos } from '../composables/useTodos'

const { todos } = useTodos()
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>