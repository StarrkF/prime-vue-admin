<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';
import AppDialog from '@/components/AppDialog.vue';
import useApi from '@/scripts/api'
import { useToast } from 'primevue/usetoast';


const toast = useToast();
const { index, show, store, update, destroy, errors } = useApi()

const route = useRoute();

const posts = ref([])
const menu = ref([]);
const selectedPost = ref()
const params = ref({})
const meta = ref({})
const deleteDialog = ref(false)
const loading = ref(true)
const search = ref()

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

const deletePosts = () => {
    selectedPost.value.map(async item => {
    await destroy('post', item.id)
  })
  selectedPost.value = null
  getPosts()
  deleteDialog.value = false
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Selected Posts deleted successfuly', life: 5000 });
}


const onSort = (event) => {
  params.value.orderBy = event.sortField
  params.value.orderType = event.sortOrder == 1 ? 'asc' : 'desc'
  getPosts()
}

const onPage = (event) => {
  params.value.page = ++event.page
  params.value.perPage = event.rows
  getPosts()
}

const onSearch = () => {
  params.value.search = search.value
  getPosts()
}

onMounted(() => {
    watchEffect(() => {
        params.value.byMenu = route.params.menu_id;
        selectedPost.value = null
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
                <div class="flex align-content-center justify-content-between">
                    <div class="flex gap-2">
                        <RouterLink :to="{ name: 'post_form', params: { menu_id: route.params.id } }">
                        <Button label="Add" icon="pi pi-plus" severity="success" />
                        </RouterLink>
                        <Button label="Delete" icon="pi pi-trash" :disabled="!selectedPost?.length" @click="deleteDialog = true" severity="danger" />
                    </div>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search cursor-pointer"  @click="onSearch" />
                        <InputText v-model="search" placeholder="Search & type enter" @keyup.enter="onSearch" />
                    </span>
                </div>
            </template>

            <template #content>
                <Toast />
                <DataTable scrollHeight="65vh" lazy @page="onPage" :value="posts"  v-model:selection="selectedPost"  @sort="onSort" tableClass="editable-cells-table">
                    <Column selectionMode="multiple" style="width: 3rem"></Column>
                    <Column header="Image">
                        <template #body="slotProps">
                            <div class="w-8rem h-8rem">
                                <img :src="slotProps.data.cover_image" :alt="slotProps.data.title" class="w-full h-full shadow-4 border-round border-2 border-bluegray-200" style="object-fit: cover; object-position: center;" />
                            </div>
                        </template>
                    </Column>
                    <Column field="weight" sortable header="Weight" />
                    <Column field="title" sortable header="Title" />
                    <Column field="summary" header="Summary" />
                    <Column header="Status" field="is_active" sortable>
                        <template #body="slotProps">
                            <InputSwitch v-model="slotProps.data.is_active" @change="updateIsActive(slotProps.data.id, slotProps.data.is_active)" />
                        </template>
                    </Column>
                    <Column header="Action">
                        <template #body="slotProps">
                            <RouterLink :to="{ name: 'post_form', params: { menu_id: route.params.id, id: slotProps.data.id } }">
                                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" />
                            </RouterLink>
                        </template>
                    </Column>
                </DataTable>
            </template>

        </Card>
    </div>
      <!-- Delete Warning Dialog -->
  <AppDialog v-model:showDialog="deleteDialog" :eventFunction="deletePosts">
    Are you sure you want to delete?
  </AppDialog>

</template>
