import { ref, watch } from 'vue'

const STORAGE_KEY = 'todos'
let nextId = 1

const loadTodos = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
        const todos = JSON.parse(stored)
        if (todos.length) {
            nextId = Math.max(...todos.map(t => t.id)) + 1
        }
        return todos
    }
    return []
}

const todos = ref(loadTodos())

watch(todos, (newTodos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
}, { deep: true })

export function useTodos() {
    const addTodo = (text) => {
        if (!text.trim()) return
        const newTodo = {
            id: nextId++,
            text: text.trim(),
            completed: false
        }
        todos.value.push(newTodo)
        return newTodo
    }

    const deleteTodo = (id) => {
        const index = todos.value.findIndex(t => t.id === id)
        if (index !== -1) {
            todos.value.splice(index, 1)
            return true
        }
        return false
    }

    const completeTodo = (id) => {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo.completed = !todo.completed
            return true
        }
        return false
    }

    const getTodo = (id) => {
        return todos.value.find(t => t.id === id)
    }

    return {
        todos,
        addTodo,
        deleteTodo,
        completeTodo,
        getTodo
    }
}