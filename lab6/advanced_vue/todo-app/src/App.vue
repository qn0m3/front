<template>
  <div class="todo-app">
    <h1>Мои задачи</h1>
    <div class="add-todo">
      <input v-model="newTodoText" @keyup.enter="addTodo" placeholder="Что нужно сделать?" />
      <button @click="addTodo">Добавить</button>
    </div>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
        <input type="checkbox" :checked="todo.completed" @change="toggleComplete(todo)" />
        <span>{{ todo.text }}</span>
        <button @click="requestDelete(todo.id)">✖</button>
      </li>
    </ul>
    <Popup ref="popupConfirm">
      <p>Вы уверены, что хотите удалить задачу?</p>
      <button @click="confirmDelete">Да, удалить</button>
      <button @click="closePopup">Отмена</button>
    </Popup>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Popup from './components/Popup.vue';

const mockApi = {
  async getTodos() {
    return new Promise(resolve => {
      setTimeout(() => {
        const stored = localStorage.getItem('todos');
        const todos = stored ? JSON.parse(stored) : [];
        resolve({ data: todos });
      }, 300);
    });
  },
  async postTodo(todo) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newTodo = { ...todo, id: Date.now() };
        resolve({ data: newTodo });
      }, 300);
    });
  },
  async patchTodo(id, completed) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { id, completed } });
      }, 300);
    });
  },
  async deleteTodo(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { id } });
      }, 300);
    });
  }
};

const newTodoText = ref('');
const todos = ref([]);
const popupConfirm = ref(null);
let pendingDeleteId = null;

const fetchTodos = async () => {
  try {
    const response = await mockApi.getTodos();
    todos.value = response.data;
  } catch (error) {
    console.error('Ошибка загрузки:', error);
  }
};

const saveToLocal = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value));
};

watch(todos, saveToLocal, { deep: true });

const addTodo = async () => {
  if (newTodoText.value.trim() === '') return;
  try {
    const response = await mockApi.postTodo({
      text: newTodoText.value,
      completed: false,
    });
    const newTodo = response.data;
    todos.value.push(newTodo);
    newTodoText.value = '';
  } catch (error) {
    console.error('Ошибка добавления:', error);
    alert('Не удалось добавить задачу');
  }
};

const toggleComplete = async (todo) => {
  const newStatus = !todo.completed;
  try {
    await mockApi.patchTodo(todo.id, newStatus);
    todo.completed = newStatus;
  } catch (error) {
    console.error('Ошибка обновления:', error);
    alert('Не удалось изменить статус');
  }
};

const deleteTodo = async (id) => {
  try {
    await mockApi.deleteTodo(id);
    todos.value = todos.value.filter(todo => todo.id !== id);
  } catch (error) {
    console.error('Ошибка удаления:', error);
    alert('Не удалось удалить задачу');
  }
};

const requestDelete = (id) => {
  pendingDeleteId = id;
  popupConfirm.value.open();
};

const confirmDelete = async () => {
  if (pendingDeleteId !== null) {
    await deleteTodo(pendingDeleteId);
    pendingDeleteId = null;
  }
  closePopup();
};

const closePopup = () => {
  popupConfirm.value.close();
};

onMounted(() => {
  fetchTodos();
});
</script>

<style scoped>
.completed span {
  text-decoration: line-through;
  opacity: 0.6;
}
.todo-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}
.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.add-todo input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
}
.add-todo button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.todo-list {
  list-style: none;
  padding: 0;
}
.todo-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid #eee;
}
.todo-list li button:last-child {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 18px;
}
</style>