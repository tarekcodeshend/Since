<template>
    <div class="notifications">
        <transition-group name="slide">

            <NotificationsElement v-for="notification in notifications" v-bind:key="notification.id"
                v-bind:notification="notification" />

        </transition-group>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NotificationsElement from '@/components/notifications/NotificationsElement';

export default {
    name: 'Notification',
    components: {
        NotificationsElement
    },
    computed: {
        ...mapGetters(['notifications'])
    }
}
</script>

<style scoped>
.notifications {
    position: fixed;
    right: 30px;
    bottom: 70px;
    z-index: 103;
}

.notifications .slide-enter-active,
.notifications .slide-leave-active {
    transition: all 0.4s;
}

.notifications .slide-enter,
.notifications .slide-leave-to {
    opacity: 0;
    transform: translate(50px, 0);
}

@media only screen and (max-width: 640px) {
    .notifications {
        right: 0px;
        bottom: 10px;        
        display: flex;
        justify-content: flex-end;
    }
}
</style>
