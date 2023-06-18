<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useApi from '@/scripts/api'
import AppTextInput from '../../components/AppTextInput.vue';

const { show, store, update, errors } = useApi()

const route = useRoute();
const router = useRouter();

const postId = route.params.id ?? 0;
const menuId = route.params.menu_id;
const menuRoute = { name: 'posts', params: { menu_id: menuId } };
const post = ref({});
const image = ref();

const getPost = () => {
  show('post', postId)
    .then((response) => {
      post.value = response.data
    })
}

const storePost = () => {
  console.log(post.value);
  const formData = new FormData();
  formData.append('cover_image', image.value);
  Object.entries(post.value).map(([key, value]) => {
  formData.append(key, value);
  });
  store('post', formData, true)
    .then((response) => {
      if (response) {
        post.value = {}
        router.push(menuRoute)
      }
    })
}

const onSelectedFile = (event) => {
  image.value = event.files[0]
  console.log( image.value)
}


onMounted(() => {
  post.value.menu_id = menuId
  if (postId) {
    getPost()
  }
})

</script>

<template>
  <Card>
    <template #title> {{ postId == 0 ? 'Add' : 'Edit' }} Post</template>
    <template #content>

      <form @submit.prevent="storePost"  enctype="multipart/form-data">
        <div class="mb-5">
          <AppTextInput label="Title" v-model="post.title" :error="errors.title" class="w-full" />
        </div>

        <div class="mb-5">
          <AppTextInput label="Summary" v-model="post.summary" :error="errors.summary" class="w-full" />
        </div>

        <div class="mb-5">
          <Editor v-model="post.content" editorStyle="height: 320px" placeholder="Content" />
        </div>

        <div class="mb-5">
          <AppTextInput label="Description" v-model="post.description" :error="errors.description" class="w-full" />
        </div>

        <div class="mb-5">
          <AppTextInput label="Seo Title" v-model="post.seo_title" :error="errors.seo_title" class="w-full" />
        </div>

        <div class="mb-5">
          <AppTextInput label="Seo Description" v-model="post.seo_description" :error="errors.seo_description"
            class="w-full" />
        </div>

        <div class="mb-5">
          <FileUpload @select="onSelectedFile" accept="image/*" :maxFileSize="2000000">
            <template #empty>
              <p>Drag and drop Image to here to upload.</p>
            </template>
          </FileUpload>
        </div>

        <div class="flex justify-content-between">
          <RouterLink :to="menuRoute">
            <Button label="Return" severity="danger" />
          </RouterLink>
          <Button type="submit" label="Add" />
        </div>
      </form>

    </template>
  </Card>
</template>
