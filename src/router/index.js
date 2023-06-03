import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { useAuthStore } from '@/store/authStore'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                },
                {
                    path: '/components',
                    name: 'components',
                    component: () => import('@/views/Components.vue')
                },
                {
                    path: '/menu',
                    name: 'menu',
                    component: () => import('@/views/Menu/Index.vue')
                },
                {
                    path: '/page/:id',
                    name: 'page',
                    component: () => import('@/views/Pages/Index.vue')
                }
                }
            ],
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue'),
            meta: {
                hideNavbar: true,
               }
        },

    ]
});

router.beforeEach(async (to, from, next) => {

    const authStore = useAuthStore()

    if (to.meta.requiresAuth) {
        await authStore.getUser()
            .then(() => {
                authStore.user ? next() : next('login')

            })
            .catch(() => {
                next('login')
            })
    } else {
        next()
    }

});

export default router;
