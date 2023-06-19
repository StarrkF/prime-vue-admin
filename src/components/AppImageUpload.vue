<script setup>
const props = defineProps({
  selectedFunction: {
    type: Function
  },
  label: {
    type: String
  },
  fileSize: {
    type: Number,
    default: 2000000
  },
  imageSrc: {
    type: String
  },
  imageAlt: {
    type: String,
    default: 'Image'
  },
  imageWidth: {
    type: Number,
    default: 300
  },

})

</script>

<template>
  <div class="flex flex-column gap-2">
    <label class="font-semibold">{{ label }}</label>
    <FileUpload @select="selectedFunction" accept="image/*" :maxFileSize="fileSize">
      <template #empty>
        <p v-if="!imageSrc">Drag and drop Image to here to upload.</p>
        <div v-else class="text-center">
          <Image :src="imageSrc" :alt="imageAlt" :width="imageWidth"/>
        </div>
      </template>
    </FileUpload>
  </div>
</template>
