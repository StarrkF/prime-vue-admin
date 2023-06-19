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
    }
})

</script>

<template>

  <div  class="flex flex-column gap-2">
    <label class="font-semibold">{{ label }}</label>
    <InlineMessage class="mt-2" v-if="error">{{ error[0] }}</InlineMessage>
    <InputText :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :class="{ 'p-invalid': error }" v-bind="$attrs" />
  </div>




</template>
