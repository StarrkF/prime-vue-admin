<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useApi from '@/scripts/api'
import AppTextInput from '../../components/AppTextInput.vue';
import AppImageUpload from '../../components/AppImageUpload.vue';

const { show, store, update, errors, laravelFixedUpdate } = useApi()

const route = useRoute();
const router = useRouter();

const postId = route.params.id ?? 0;
const menuId = route.params.menu_id;
const menuRoute = { name: 'posts', params: { menu_id: menuId } };
const post = ref({});
const image = ref();
const loading = ref(false)

const getPost = () => {
    loading.value = true
    show('post', postId)
        .then((response) => {
            post.value = response.data
            loading.value = false
        })
}

const storePost = () => {
    const postData = createPostData()
    console.log(postData)
    store('post', postData, image.value ? true : false)
        .then((response) => {
            if (response) {
                post.value = {}
                router.push(menuRoute)
            }
        })
}

const updatePost = () => {
    const postData = createPostData(true)
    if (image.value) {
        laravelFixedUpdate('post', post.value.id, postData, image.value ? true : false)
        .then((response) => {
            if (response) {
                post.value = {}
                router.push(menuRoute)
            }
        })
    } else {
        update('post', post.value.id, postData)
        .then((response) => {
            if (response) {
                post.value = {}
                router.push(menuRoute)
            }
        })
    }

}

const createPostData = (is_update = false) => {
    post.value.menu_id = menuId
    if (image.value) {
        const formData = new FormData();
        is_update ? formData.append('_method', 'put') : ''
        formData.append('cover_image', image.value);

        for (const [key, value] of Object.entries(post.value)) {
            formData.append(key, value);
        }

        return formData;
    } else {
        return post.value
    }

};

const onSelectedFile = (event) => {
    image.value = event.files[0]
    console.log(image.value)
}


onMounted(() => {
    if (postId) {
        getPost()
    }
})

</script>

<template>
    <Card>
        <template #title>
            <div class="flex justify-content-between">
                <h2>{{ postId == 0 ? 'Add' : 'Edit' }} Post </h2>
                <RouterLink :to="menuRoute">
                    <Button label="Return" severity="danger" />
                </RouterLink>
            </div>

        </template>
        <template #content>

            <ProgressSpinner class="flex justify-center"  v-if="loading"/>

            <form v-else @submit.prevent="postId == 0 ? storePost() : updatePost()" enctype="multipart/form-data">
                <div class="mb-5">
                    <AppTextInput label="Title" v-model="post.title" :error="errors.title" class="w-full" />
                </div>

                <div class="mb-5">
                    <AppTextInput label="Summary" v-model="post.summary" :error="errors.summary" class="w-full" />
                </div>

                <div class="mb-5 flex flex-column gap-2">
                    <label class="font-semibold">Content</label>
                    <InlineMessage class="mt-2" v-if="errors.content">{{ errors.content[0] }}</InlineMessage>
                    <Editor v-model="post.content" :class="{ 'p-invalid': errors.content }" editorStyle="height: 400px" />
                </div>

                <div class="mb-5">
                    <AppTextInput label="Description" v-model="post.description" :error="errors.description"
                        class="w-full" />
                </div>

                <div class="mb-5">
                    <AppTextInput label="Seo Title" v-model="post.seo_title" :error="errors.seo_title" class="w-full" />
                </div>

                <div class="mb-5">
                    <AppTextInput label="Seo Description" v-model="post.seo_description" :error="errors.seo_description"
                        class="w-full" />
                </div>

                <div class="mb-5">
                    <AppImageUpload label="Cover Image" :selectedFunction="onSelectedFile" :imageSrc="post.cover_image" />
                </div>

                <div class="flex justify-content-between">
                    <RouterLink :to="menuRoute">
                        <Button label="Return" severity="danger" />
                    </RouterLink>
                    <Button v-if="postId == 0" type="submit" label="Add" />
                    <Button v-else type="submit" label="Save" severity="info" />
                </div>
            </form>

        </template>
    </Card>
</template>
