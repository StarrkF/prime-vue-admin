<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watchEffect } from 'vue';
import { useLayout } from '../layout/composables/layout';
import { useAuthStore } from '@/store/authStore'

const { layoutConfig, onMenuToggle, setTheme } = useLayout();
const authStore = useAuthStore()

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const themeIcon = ref()

onMounted(() => {
    setTheme();
    bindOutsideClickListener();
});

watchEffect(() => {
    themeIcon.value = layoutConfig.darkTheme.value ?  'pi pi-moon' : 'pi pi-sun';
})

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});


const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

const changeTheme = () => {
    layoutConfig.darkTheme.value = !layoutConfig.darkTheme.value;
    setTheme()
};

</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>PrimeVue Admin</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>


        <div class="layout-topbar-menu align-items-center" :class="topbarMenuClasses">
            {{ authStore.user.name }}
            <button class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>Profile</span>
            </button>
            <button class="p-link  layout-topbar-button" @click="changeTheme">
                <i :class="themeIcon"></i>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
