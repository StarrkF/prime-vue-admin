<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import useApi from '@/scripts/api'

const { index } = useApi()
const posts = ref()
const postData = ref({})

const getPosts = () => {
  index('menu').then((response) => {
    posts.value = response.data
    getCategories()
  })
}

const getCategories = () => {
  index('categories').then((response) => {
    postData.value = response.data.map((category)=> {
      return {
        label: category.name,
        icon: 'pi pi-th-large',
        items: posts.value.filter((post) => post.category.id === category.id)
        .map((post) => ({
          label: post.name,
          icon: 'pi pi-chevron-right',
          to: { name: 'posts', params: { menu_id: post.id }}
        })),
      }
    });
  });
};

onMounted(() => {
  watchEffect(() => {
    getPosts()
  });
});



const model = computed(() => [
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
  },
  {
    label: 'Pages',
    items: [
      { label: 'Components', icon: 'pi pi-fw pi-table', to: '/components' },
      { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu' },
      {
        label: 'Posts',
        icon: 'pi pi-fw pi-globe',
        items: postData.value
      }
    ]
  },
  {
    label: 'Settings',
    items: [{ label: 'Account', icon: 'pi pi-fw pi-cog', to: '/' }]
  },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>
