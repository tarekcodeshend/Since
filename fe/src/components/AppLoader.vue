<template>
    <div class="app-loader">
        <div class="loader-inner">
            <div class="inner-spinner"></div>
            <img src="@/assets/img/loading.png" alt="logo" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppMaintenance'
}
</script>

<style scoped>
.app-loader {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    background: #16181d;
    z-index: 100;
    opacity: 1;
}

.app-loader .loader-inner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1
}

.app-loader .inner-spinner {
    width: 110px;
    height: 110px;
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(90deg, #D4AF3C 10%, hsla(0, 0%, 100%, 0) 42%);
    animation: spinner-0f7b1104 1.4s linear infinite;
    opacity: .6;
    z-index: -1
}

.app-loader .inner-spinner:before {
    content: "";
    width: 50%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 100% 0 0 0;
    background: #D4AF3C
}

.app-loader .inner-spinner:after {
    content: "";
    width: 94%;
    height: 94%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    border-radius: 50%;
    background: #16181d
}

.app-loader .loader-inner img {
    width: 94px;
    height: 94px;
    opacity: .5
}

@keyframes spinner-0f7b1104 {
    0% {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(1turn)
    }
}
</style>
