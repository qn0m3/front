import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'todos'

export const useTodosStore = defineStore('todos', () => {
    const todos = ref([])
    let nextId = 1

    const loadFromLocalStorage = () => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            todos.value = JSON.parse(stored)
            if (todos.value.length) {
                nextId = Math.max(...todos.value.map(t => t.id)) + 1
            }
        }
    }

    const saveToLocalStorage = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
    }

    const addTodo = (text) => {
        if (!text.trim()) return
        const newTodo = {
            id: nextId++,
            text: text.trim(),
            completed: false
        }
        todos.value.push(newTodo)
        saveToLocalStorage()
        return newTodo
    }

    const deleteTodo = (id) => {
        const index = todos.value.findIndex(t => t.id === id)
        if (index !== -1) {
            todos.value.splice(index, 1)
            saveToLocalStorage()
            return true
        }
        return false
    }

    const toggleComplete = (id) => {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo.completed = !todo.completed
            saveToLocalStorage()
            return true
        }
        return false
    }

    const getTodoById = (id) => {
        return todos.value.find(t => t.id === id)
    }

    loadFromLocalStorage()

    return {
        todos,
        addTodo,
        deleteTodo,
        toggleComplete,
        getTodoById
    }
})