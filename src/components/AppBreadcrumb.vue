<script setup>
const props = defineProps({
    items: {
        type: Object
    },
})

const home = {
  icon: 'pi pi-home',
  to: '/',
}


</script>

<template>

      <Breadcrumb :home="home" :model="items" />

</template>
