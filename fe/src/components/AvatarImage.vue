<template>
    <div class="avatar-image">
        <img v-bind:src="avatarImage" @error="avatarImageError()" alt="avatar" />
    </div>
</template>

<script>
export default {
    name: 'AvatarImage',
    props: ['image'],
    data() {
        return {
            avatarImage: null,
            serverUrl: process.env.VUE_APP_BACKEND_URL,
        }
    },
    methods: {
        avatarImageError() {
            this.avatarImage = this.serverUrl + this.image;
            // this.avatarImage = require(`@/assets/img/avatar/${this.image}`);
        }
    },
    created() {
        let botImage = 'hidden.png';
        if (this.image === 'system') {
            this.avatarImage = require(`@/assets/img/avatar/system.png`);
        }
        else {
            this.avatarImage = this.image === '' || this.image === undefined || this.image === null ? require(`@/assets/img/avatar/${botImage}`) : this.image;
        }
    }
}
</script>

<style scoped>
.avatar-image {
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 40.443px;
    border: 0.793px solid #191D26;
    background: #1a1522;
    /* padding: 3px; */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.avatar-image img {
    width: 100% !important;
    height: 100% !important;
}
</style>
