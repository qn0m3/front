<template>
  <div>
    <h1>100 Clickers</h1>
    <div style="display: flex; flex-wrap: wrap; gap: 20px;">
      <Clicker
          v-for="i in 100"
          :key="i"
          :amount="1"
          @button-clicked="showClickerNumber(i)"
      >
        <template #default="{ increment }">
          <button @click="increment">Кликни</button>
        </template>
      </Clicker>
    </div>
  </div>
</template>

<script setup>
import Clicker from './components/Clicker.vue';

function showClickerNumber(number) {
  alert(`Clicker ${number} clicked!`);
}
</script>