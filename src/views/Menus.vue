<script setup>
import { ref, onMounted } from 'vue';
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';
import useApi from '@/scripts/api'
const { index, store, update, errors } = useApi()

const categories = ref({})
const menus = ref([])
const menu = ref({})
const editMenu = ref({})
const editingRows = ref([]);
const successMessage = ref(false)
const visible = ref(false);
const breadcrumb = ref([
  { label: 'Menu', to: 'menus' },
]);


const getMenus = () => {
  index('menu').then((response) => {
    menus.value = response.data
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


onMounted(() => {
  getMenus(),
    getCategories()
})

</script>

<template>
  <AppBreadcrumb :items="breadcrumb" />
  <h2>Menus</h2>
  <div class="flex flex-wrap justify-content-between gap-4">



    <Card class="col-12">
      <template #title>
        <div class="flex align-content-center gap-5">
          <Button label="Add Menu" icon="pi pi-plus" @click="visible = true" />
        </div>

      </template>
      <template #content>
        <Message v-if="errors && !visible" v-for="error in errors" severity="error">
          {{ error[0] }}
        </Message>
        <Message v-if="successMessage" severity="success">
          Successful
        </Message>
        <DataTable v-model:editingRows="editingRows" :value="menus" @row-edit-save="onRowEditSave"
          tableClass="editable-cells-table" editMode="row" dataKey="id">
          <Column field="id" sortable header="ID"></Column>
          <Column field="category.name" sortable header="Category">
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


      </template>
    </Card>
  </div>
</template>
