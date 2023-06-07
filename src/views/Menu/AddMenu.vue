<script setup>
import { ref } from 'vue';
import useApi from '@/scripts/api'
const {  store, errors } = useApi()

const menu = ref({})

const props = defineProps({
  getMenus: {
    type: Function,
    required: true
  },
  visible: {
    type: Boolean,
    default: false
  },
  categories: {
    type: Object
  }
})

const emits = defineEmits(['update:visible']);

const storeMenu = () => {
  store('menu', menu.value)
    .then((response) => {
      if (response) {
        emits('update:visible', false)
        menu.value = {}
        props.getMenus()
      }
    })
}


</script>

<template>
    <!-- Create Menu Dialog -->
    <Dialog :visible="visible" @update:visible="emits('update:visible', false)" modal header="Add Menu" :style="{ width: '50vw' }">
    <Card>
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
