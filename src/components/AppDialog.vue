<script setup>
const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false
  },
  eventFunction: {
    type: Function
  },
})

const emits = defineEmits(['update:showDialog']);

</script>

<template>
  <Dialog :visible="showDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span><slot></slot></span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text @click="emits('update:showDialog', false);" />
      <Button label="Yes" icon="pi pi-check" text @click="eventFunction" />
    </template>
  </Dialog>
</template>
