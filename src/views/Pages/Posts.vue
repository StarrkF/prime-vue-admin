<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';
import useApi from '@/scripts/api'
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const { index, show, store, update, destroy, errors } = useApi()

const route = useRoute();

const posts = ref([])
const menu = ref([]);
const selectedPost = ref({})
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

const getMenu = () => {
    show('menu', route.params.menu_id).then((response) => {
        menu.value = response.data
    })
}

const updateIsActive = (id, data) => {
    update('is_active', id,{is_active: data})
    .then((response) => {
      if (response) {
        toast.add({ severity: 'success', summary: 'Success Message', detail: 'Activity status changed successfuly', life: 5000 });
      } else {
        toast.add({ severity: 'danger', summary: 'Error Message', detail: 'Activity status changed failed', life: 5000 });
      }
    })
}

const rowClass = (data) => {
    return [{ 'bg-gray-300': data.is_active == false }];
};


onMounted(() => {
    watchEffect(() => {
        params.value.byMenu = route.params.menu_id;
        getPosts();
        getMenu();
    });
});


</script>

<template>
    <AppBreadcrumb :items="[{ label: 'Posts' }, { label: menu.name }]" />
    <h2>{{ menu.name }}</h2>
    <div class="flex flex-wrap justify-content-between gap-4">
        <Card class="col-12">

            <template #title>
                <RouterLink :to="{ name: 'post_form', params: { menu_id: route.params.id } }">
                    <Button label="Add" icon="pi pi-plus" severity="success" />
                </RouterLink>
            </template>

            <template #content>
                <Toast />
                <DataTable scrollHeight="50vh" :value="posts" :rowClass="rowClass"  v-model:selection="selectedPost" tableClass="editable-cells-table">
                    <Column selectionMode="multiple" style="width: 3rem"></Column>
                    <Column header="Image">
                        <template #body="slotProps">
                            <img :src="slotProps.data.cover_image" :alt="slotProps.data.title" class="w-6rem h-6rem shadow-4 border-round border-2 border-bluegray-200" />
                        </template>
                    </Column>
                    <Column field="weight" header="Weight" />
                    <Column field="title" header="Title" />
                    <Column field="summary" header="Summary" />
                    <Column header="Status">
                        <template #body="slotProps">
                            <InputSwitch v-model="slotProps.data.is_active" @change="updateIsActive(slotProps.data.id, slotProps.data.is_active)" />
                        </template>
                    </Column>
                    <Column header="Action">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mt-2" @click="" />
                        </template>
                    </Column>
                </DataTable>
            </template>

        </Card>
    </div>
</template>
