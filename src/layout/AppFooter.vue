<script setup>
import { useLayout } from '@/layout/composables/layout';
import logoWhite from '/layout/images/logo-white.svg'
import logoDark from '/layout/images/logo-dark.svg'

const { layoutConfig } = useLayout();
</script>

<template>
    <div class="layout-footer">
        <img :src="(layoutConfig.darkTheme.value || false ? logoWhite : logoDark)" alt="Logo" height="20" class="mr-2" />
        by
        <span class="font-medium ml-2">PrimeVue</span>
    </div>
</template>
