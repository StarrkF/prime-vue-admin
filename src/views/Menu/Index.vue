<script setup>
import { ref, onMounted } from 'vue';
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';
import AppDialog from '@/components/AppDialog.vue';
import AddMenu from './AddMenu.vue';
import Datatable from './Datatable.vue';
import useApi from '@/scripts/api'
const { index, destroy, errors } = useApi()

const categories = ref({})
const menus = ref([])
const params = ref({});
const meta = ref({})

const search = ref()
const successMessage = ref(false)
const visible = ref(false);
// const deleteDialog = ref(false);
const loading = ref(false)

const getMenus = () => {
  loading.value = true
  index('menu', params.value).then((response) => {
    menus.value = response.data
    meta.value = response.meta
    loading.value = false
  })
}

const getCategories = () => {
  index('categories').then((response) => {
    categories.value = response.data
})
}

// const deleteMenus = () => {
//   selectedMenus.value.map(item => {
//     destroy('menu', item.id)
//   })
//   selectedMenus.value = null
//   getMenus()
//   deleteDialog.value = false
//   successMessage.value = true
// }

const onSearch = () => {
  params.value.search = search.value
  getMenus()
}

onMounted(() => {
  params.value.perPage = 10
  getMenus()
  getCategories()
})

</script>

<template>
  <AppBreadcrumb :items="[{ label: 'Menu', to: 'menu' }]" />
  <h2>Menus</h2>
  <div class="flex flex-wrap justify-content-between gap-4">
    <Card class="col-12">

      <template #title>
        <div class="flex align-content-center justify-content-between">
          <div class="flex gap-2">
            <Button label="New" icon="pi pi-plus" @click="visible = true" severity="success" />
            <!-- <Button label="Delete" icon="pi pi-trash" :disabled="!selectedMenus?.length" @click="deleteDialog = true" severity="danger" /> -->
          </div>
          <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model.lazy="search" placeholder="Search name" @input="onSearch" />
          </span>
        </div>
      </template>

      <template #content>
        <Message v-if="errors && !visible" v-for="error in errors" severity="error">
          {{ error[0] }}
        </Message>
        <Message v-if="successMessage" severity="success">
          Success!
        </Message>
        <Datatable :get-menus="getMenus" :categories="categories" :menus="menus" :params="params" :meta="meta" />
      </template>

    </Card>
  </div>


  <AddMenu :get-menus="getMenus" v-model:visible="visible" :categories="categories"/>
  <!-- Delete Warning Dialog -->
  <!-- <AppDialog v-model:showDialog="deleteDialog"  :eventFunction="deleteMenus">
    Are you sure you want to delete?
  </AppDialog> -->
</template>
