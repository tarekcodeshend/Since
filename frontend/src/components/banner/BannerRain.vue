<template>
    <img src="./test.png" alt="Test Image" class="image" />
</template>

<script>
export default {
    name: 'ImageComponent'
}
</script>

<style scoped>
.image {
    display: block; /* Ensures the image is displayed as a block element */
    margin: 0 auto; /* Centers the image horizontally */
    max-width: 100%; /* Ensures the image doesn't exceed its natural width */
    max-height: 100vh; /* Limits the height of the image to the viewport height */
    object-fit: contain; /* Ensures the image fits inside the container without distortion */
}
</style>
