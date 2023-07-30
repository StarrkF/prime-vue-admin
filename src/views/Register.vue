<script setup>
import { ref } from 'vue';
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();

const form = ref({})

</script>

<template>
    <form @submit.prevent="authStore.handleRegister(form)">
        <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-column align-items-center justify-content-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                        <div class="text-center mb-5">
                            <div class="text-900 text-3xl font-medium mb-3">REGISTER</div>
                        </div>

                        <div>
                            <label for="name" class="block text-900 text-xl font-medium mb-2">Username</label>
                            <InputText id="name" type="text" placeholder="Username" class="w-full  mb-5" style="padding: 1rem" v-model="form.name" />
                            
                            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email" type="text" placeholder="Email address" class="w-full  mb-5" style="padding: 1rem" v-model="form.email" />

                            <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <InputText id="password" type="password" placeholder="Password" class="w-full mb-5" style="padding: 1rem" v-model="form.password" />

                            <label for="password_confirmation" class="block text-900 font-medium text-xl mb-2">Confirm Password</label>
                            <InputText id="password_confirmation" type="password" placeholder="Password" class="w-full mb-5" style="padding: 1rem" v-model="form.password_confirmation" />

                            <Button type="submit" label="Submit" class="w-full p-3 text-xl"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
