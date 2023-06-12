<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    label: {
        type: String,
        default: ""
    },
    error: {
        type: Array,
    },
})

</script>

<template>
  <span class="p-float-label">
      <InputText :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :class="{ 'p-invalid': error }" v-bind="$attrs" />
      <label>{{ label }}</label>
  </span>
  <InlineMessage class="mt-2" v-if="error">{{ error[0] }}</InlineMessage>
</template>
