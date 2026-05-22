<template>
  <Teleport to="body">
    <div v-if="isOpen" class="popup-overlay" @click.self="close">
      <div class="popup-container">
        <button class="popup-close" @click="close">✖</button>
        <div class="popup-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const open = () => {
  isOpen.value = true;
};
const close = () => {
  isOpen.value = false;
};

defineExpose({ open, close });
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.popup-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 280px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
.popup-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
}
.popup-content {
  margin-top: 10px;
  text-align: center;
  color: #000;
}
.popup-content button {
  margin: 0 8px;
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.popup-content button:last-child {
  background-color: #ccc;
  color: #333;
}
</style>