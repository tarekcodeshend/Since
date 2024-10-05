<template>
    <button v-on:click="modalsSetShow('Login')" class="auth-button">
        <div class="button-inner">
            <IconRoblox />
            SIGN IN
        </div>
    </button>
</template>

<script>
import { mapActions } from 'vuex';
import IconRoblox from '@/components/icons/IconRoblox';

export default {
    name: 'AuthButton',
    components: {
        IconRoblox
    },
    methods: {
        ...mapActions(['modalsSetShow'])
    }
}
</script>

<style scoped>
button.auth-button {
    height: 50px;
    border: none;
    border-radius: 15px; /* Reduced border radius */
    filter: drop-shadow(0px 2px 10px rgba(1, 230, 169, 0.15));
    overflow: hidden;
    padding: 0;
    background: none; /* Remove the background from the button itself */
}

button.auth-button .button-inner {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 22px;
    font-size: 16px;
    font-weight: 800;
    color: #ffffff;
    background: linear-gradient(255deg, #0d0d0d 0%, #1a1a1a 100%); /* Cool black gradient */
    border-radius: 15px; /* Reduced border radius */
}

button.auth-button .button-inner svg {
    margin-right: 11px;
    fill: #ffffff;
}
</style>
