<script setup>
import { ref, onMounted } from 'vue';
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';
import AppDialog from '@/components/AppDialog.vue';
import useApi from '@/scripts/api'
const { index, store, update, destroy, errors } = useApi()

const categories = ref({})
const menus = ref([])
const menu = ref({})
const editMenu = ref({})
const editingRows = ref([]);
const params = ref({});
const meta = ref({})
const selectedMenus = ref()
const search = ref()
const successMessage = ref(false)
const visible = ref(false);
const deleteDialog = ref(false);
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
  index('categories').then((response) => [
    categories.value = response.data
  ])
}

const storeMenu = () => {
  store('menu', menu.value)
    .then((response) => {
      if (response) {
        visible.value = false
        successMessage.value = true
        menu.value = {}
        getMenus()
      }

    })
}

const deleteMenus = () => {
  selectedMenus.value.map(item => {
    destroy('menu', item.id)
  })
  selectedMenus.value = null
  getMenus()
  deleteDialog.value = false
  successMessage.value = true
}

const onRowEditSave = (event) => {
  let { newData } = event;

  editMenu.value = newData;

  update('menu', editMenu.value.id, editMenu.value)
    .then((response) => {
      if (response) {
        successMessage.value = true
        getMenus()
      }
    })
}

const onSort = (event) => {
  params.value.orderBy = event.sortField
  params.value.orderType = event.sortOrder == 1 ? 'asc' : 'desc'
  getMenus()
}

const onPage = (event) => {
  params.value.page = ++event.page
  params.value.perPage = event.rows
  getMenus()
}

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
  <AppBreadcrumb :items="[{ label: 'Menu', to: 'menu' },]" />
  <h2>Menus</h2>
  <div class="flex flex-wrap justify-content-between gap-4">
    <Card class="col-12">

      <template #title>
        <div class="flex align-content-center justify-content-between">
          <div class="flex gap-2">
            <Button label="New" icon="pi pi-plus" @click="visible = true" severity="success" />
            <Button label="Delete" icon="pi pi-trash" :disabled="!selectedMenus?.length" @click="deleteDialog = true" severity="danger" />
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
        <Message v-if="successMessage" severity="success">n
          Success!
        </Message>
        <DataTable :loading="loading" lazy @page="onPage" v-model:selection="selectedMenus"  paginator  :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="meta.total" :rows="meta.per_page" scrollable scrollHeight="50vh"   @sort="onSort" :customSort="true" v-model:editingRows="editingRows" :value="menus" @row-edit-save="onRowEditSave"
          tableClass="editable-cells-table" editMode="row" dataKey="id">
          <Column selectionMode="multiple" style="width: 3rem"></Column>
          <Column style="width: 3rem">
            <template #body="{ data }">
              <router-link :to="{ name: 'posts', params: { id: data.id}}"><i class="pi text-lg pi-link" style="font-size: 2rem"></i></router-link>
            </template>
          </Column>
          <Column field="id" sortable header="ID"></Column>
          <Column field="category.name" header="Category">
            <template #editor="{ data }">
              <Dropdown v-model="data['category_id']" :options="categories" optionLabel="name" optionValue="id"
                placeholder="Select Category">
              </Dropdown>
            </template>
          </Column>
          <Column field="name" sortable header="Name">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column field="weight" sortable header="weight">
            <template #editor="{ data, field }">
              <InputNumber v-model="data[field]" />
            </template>
          </Column>
          <Column :rowEditor="true" header="Edit" style="width: 10%; min-width: 8rem"></Column>

        </DataTable>
      </template>

    </Card>
  </div>

  <!-- Create Menu Dialog -->
  <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }">
    <Card>
      <template #title> Add Menu</template>
      <template #content>
        <div class="mb-5">
          <Dropdown v-model="menu.category_id" :options="categories" optionLabel="name" optionValue="id"
            placeholder="Select Category" class="w-full" :class="{ 'p-invalid': errors.category_id }" />
          <InlineMessage class="mt-2" v-if="errors.category_id">{{ errors.category_id[0] }}</InlineMessage>
        </div>

        <div class="mb-5">
          <span class="p-float-label">
            <InputText v-model="menu.name" class="w-full" :class="{ 'p-invalid': errors.name }" />
            <label>Name</label>
          </span>
          <InlineMessage class="mt-2" v-if="errors.name">{{ errors.name[0] }}</InlineMessage>
        </div>

        <div class="mb-5">
          <span class="p-float-label">
            <InputNumber class="w-full" v-model="menu.weight" :class="{ 'p-invalid': errors.weight }" />
            <label>Number</label>
            <InlineMessage v-if="errors.weight">{{ errors.weight[0] }}</InlineMessage>
          </span>
        </div>

        <div class="flex justify-content-end">
          <Button label="Add" @click="storeMenu" />
        </div>


      </template>
    </Card>
  </Dialog>

  <!-- Delete Warning Dialog -->
  <AppDialog v-model:showDialog="deleteDialog"  :eventFunction="deleteMenus">
    Are you sure you want to delete?
  </AppDialog>
</template>
