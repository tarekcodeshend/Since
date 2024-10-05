<template>
    <div class="unbox">
        <div class="unbox-header">
            <SlotsHeaderOverview v-if="unboxGetRouteName === 'SlotsOverview'" />
            <SlotsHeaderBox v-else-if="unboxGetRouteName === 'SlotsBox'" />
        </div>
        <div class="unbox-content">
            <transition name="slide-fade" mode="out-in">
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import SlotsHeaderOverview from '@/components/slots/SlotsHeaderOverview';
    import SlotsHeaderBox from '@/components/slots/SlotsHeaderBox';

    export default {
        name: 'Slots',
        metaInfo: {
            title: 'Slots - BLOXflame.com'
        },
        components: {
            SlotsHeaderOverview,
            SlotsHeaderBox
        },
        methods: {
            ...mapActions([
                'socketConnectSlots', 
                'socketDisconnectSlots'
            ])
        },
        computed: {
            unboxGetRouteName() {
                return this.$route.name;
            }
        },
        created() {
            this.socketConnectSlots();
        },
        beforeRouteLeave(to, from, next) {
            this.socketDisconnectSlots();
            next();
        }
    }
</script>

<style scoped>
    .unbox {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 50px 10px;
    }

    .unbox .unbox-header {
        width: 1250px;
        border-bottom: 1px solid rgba(28, 71, 182, 0.15);
    }

    .unbox .unbox-content {
        width: 1250px;
        margin-top: 25px;
    }

    @media only screen and (max-width: 1270px) {

        .unbox .unbox-header {
            width: 100%;
        }

        .unbox .unbox-content {
            width: 100%;
        }

    }
</style>