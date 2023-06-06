<script setup>
import { ref} from 'vue';
import useApi from '@/scripts/api'
const { index, store, update, errors } = useApi()
const editMenu = ref({})
const editingRows = ref([]);

const loading = ref(false)
const selectedMenus = ref()

const props = defineProps({
  getMenus: {
    type: Function,
    required: true
  },
  menus: {
    type: Object
  },
  params: {
    type: Object
  },
  meta: {
    type: Object
  },
  categories: {
    type: Object
  }
})

// const emits = defineEmits(['update:visible']);

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

// const deleteMenus = () => {
//   selectedMenus.value.map(item => {
//     destroy('menu', item.id)
//   })
//   selectedMenus.value = null
//   getMenus()
//   deleteDialog.value = false
//   successMessage.value = true
// }

const onSort = (event) => {
  props.params.orderBy = event.sortField
  props.params.orderType = event.sortOrder == 1 ? 'asc' : 'desc'
  props.getMenus()
}

const onPage = (event) => {
  props.params.page = ++event.page
  props.params.perPage = event.rows
  props.getMenus()
}


</script>

<template>
  <DataTable :loading="loading" lazy @page="onPage" v-model:selection="selectedMenus" paginator
    :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="meta.total" :rows="meta.per_page" scrollable scrollHeight="50vh"
    @sort="onSort" :customSort="true" v-model:editingRows="editingRows" :value="menus" @row-edit-save="onRowEditSave"
    tableClass="editable-cells-table" editMode="row" dataKey="id">

    <Column selectionMode="multiple" style="width: 3rem"></Column>
    <Column style="width: 3rem">
      <template #body="{ data }">
        <router-link :to="{ name: 'page', params: { id: data.id } }"><i class="pi text-lg pi-link" style="font-size: 2rem"></i></router-link>
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
