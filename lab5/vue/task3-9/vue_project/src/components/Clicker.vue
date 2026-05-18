<template>
  <div style="border: 1px solid #ccc; padding: 10px; margin: 5px; width: 150px;">
    <p>Счётчик: {{ count }}</p>
    <slot :increment="increment"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  amount: { type: Number, default: 1 }
});
const emit = defineEmits(['button-clicked']);

const count = ref(0);

function increment() {
  count.value += props.amount;
  emit('button-clicked');
}
</script>