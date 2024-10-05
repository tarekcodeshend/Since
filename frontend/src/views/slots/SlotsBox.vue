<template>
    <div class="slots">
        <div class="slots-container">
            <transition name="fade" mode="out-in">
                <div class="container-data" key="data">
                    <iframe class="slots-iframe" width="100%" height="100%" v-bind:src="slotsBoxData.box.url"></iframe>
                </div>
            </transition>
        </div>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'SlotsBox',
        methods: {
            ...mapActions([
                'slotsSetCount',
                'slotsSetGames',
                'slotsGetBoxDataSocket'
            ])
        },
        computed: {
            ...mapGetters([
                'socketslots',
                'slotsBoxData'
            ])
        },
        watch: {
            'socketslots.connected': {
                handler() {
                    const data = { boxId: this.$route.params.boxId };
                    this.slotsGetBoxDataSocket(data);
                }
            }
        },
        created() {
            const data = { boxId: this.$route.params.boxId };

            this.slotsGetBoxDataSocket(data);


        },
        beforeDestroy() {
            this.slotsSetCount(1);
            this.slotsSetGames([]);
        }
    }
</script>

<style scoped>

    .slots {
        height: 600px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 45px 10px;
    }

    .slots .slots-container {
        width: 1120px;
        border-radius: 25px;
        background: radial-gradient(163.2% 163.2% at 50% -31.45%, rgba(0, 194, 255, 0.2) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(255deg, #07263d 0%, #07243a 100%);
        box-shadow: 0px 4px 10px rgba(7, 26, 41, 0.25);
    }

    .slots .container-loading {
        display: flex;
        justify-content: space-between;
        padding: 15px;
    }

    .slots .loading-element {
        height: 510px;
        position: relative;
        border-radius: 15px;
        background: #051f33;
        overflow: hidden;
    }

    .slots .loading-element:nth-child(1) {
        width: calc(100% - 290px);
    }

    .slots .loading-element:nth-child(2) {
        width: 275px;
    }

    .slots .loading-element::after {
        width: 100%;
        height: 100%;
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        animation-name: loading_animation;
        animation-duration: 1s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        background: linear-gradient(to right, #ffffff00 0%, rgba(255, 255, 255, 0.1) 50%, #ffffff00 100%);
    }

    .slots .container-loading.fade-leave-active {
        transition: opacity 0.5s;
    }

    .slots .container-loading.fade-leave-to {
        opacity: 0;
    }

    .slots .container-data {
        height: 600px;
        flex-direction: column;
        display: flex;
        justify-content: space-between;
        padding: 15px;
    }

    .slots .container-data.fade-enter-active {
        transition: opacity 0.5s;
    }

    .slots .container-data.fade-enter-from {
        opacity: 0;
    }

    .slots .data-left {
        width: calc(100% - 290px);
    }

    @keyframes loading_animation {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
        100% { transform: translateX(100%); }
    }

    @media only screen and (max-width: 1140px) {
        
        .slots .slots-container {
            width: 100%;
        }

    }

    @media only screen and (max-width: 950px) {

        .slots {
            padding: 25px 10px 443px 10px;
        }

        .slots .container-loading,
        .slots .container-data {
            flex-direction: column;
            padding: 10px;
        }

        .slots .loading-element {
            width: 100%!important;
        }

        .slots .loading-element:nth-child(2) {
            height: 200px;
            margin-top: 15px;
        }

        .slots .data-left {
            width: 100%;
        }

    }
</style>
