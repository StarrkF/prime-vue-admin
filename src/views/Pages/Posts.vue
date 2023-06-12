<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';
import useApi from '@/scripts/api'
const { index, store, update, destroy, errors } = useApi()

const route = useRoute();

const posts = ref([])
const params = ref({})
const meta = ref({})

const loading = ref(true)

const getPosts = () => {
      loading.value = true
    index('post', params.value).then((response) => {
        posts.value = response.data
        meta.value = response.meta
        loading.value = false
    })
}

onMounted(() => {
    params.value.byMenu = route.params.id
    getPosts()
})

</script>

<template>
    <AppBreadcrumb :items="[{ label: 'Posts' }, { label: route.params.id }]" />
    <h2>Menus</h2>
    <div class="flex flex-wrap justify-content-between gap-4">
        <Card class="col-12">

            <template #title>
                <RouterLink :to="{ name: 'post_form', params: { menu_id: route.params.id } }">
                    <Button label="Add" icon="pi pi-plus"  severity="success" />
                </RouterLink>
            </template>

            <template #content>
                <DataTable scrollHeight="50vh" :value="posts" tableClass="editable-cells-table">
                    <Column field="name" header="Name" />
                </DataTable>
            </template>

        </Card>
    </div>
</template>
