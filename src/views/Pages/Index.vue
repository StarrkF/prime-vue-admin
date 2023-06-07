<script setup>
import { ref, onMounted } from 'vue';
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import { useRoute } from 'vue-router';
import useApi from '@/scripts/api'
const { index, store, update, destroy, errors } = useApi()
const route = useRoute()

const post = ref()
const loading = ref(false)
const params = ref({})
const meta = ref({})

const getPost = () => {
  loading.value = true
  params.value.byMenu = route.params.id
  index('post', params.value).then((response) => {
    post.value = response.data
    meta.value = response.meta
    loading.value = false
  })
}

onMounted(() => {
    getPost()
})
</script>

<template>
      <AppBreadcrumb :items="[{ label: 'Pages'}, { label: 'Page-X'}]" />
    <h1 class="text-center">{{ post }}</h1>
</template>
