<template>
    <div class="notifications-element" v-bind:class="'element-' + notification.type">
        <div class="element-content">
            <div class="content-icon" v-on:click="sendNotificationRemove()">
                <svg v-if="notification.type === 'success'" width="13.745" height="10.673" viewBox="0 0 13.745 10.673"
                    xmlns="http://www.w3.org/2000/svg">
                    <path data-v-11aff630=""
                        d="M5.263,10.873a.7.7,0,0,1-.992,0L.308,6.91a1.052,1.052,0,0,1,0-1.488l.5-.5a1.052,1.052,0,0,1,1.489,0L4.767,7.4,11.452.715a1.052,1.052,0,0,1,1.489,0l.5.5a1.052,1.052,0,0,1,0,1.488Zm0,0">
                    </path>
                </svg>
                <svg v-if="notification.type === 'error'" width="12" height="12" viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg">
                    <path data-v-11aff630=""
                        d="M7.98,6l3.712-3.712a1.05,1.05,0,0,0,0-1.485L11.2.308a1.049,1.049,0,0,0-1.485,0L6,4.021,2.288.308A1.05,1.05,0,0,0,.8.308L.308.8a1.05,1.05,0,0,0,0,1.485L4.021,6,.309,9.713a1.049,1.049,0,0,0,0,1.485l.495.495a1.05,1.05,0,0,0,1.485,0L6,7.98l3.712,3.712a1.05,1.05,0,0,0,1.485,0l.495-.495a1.05,1.05,0,0,0,0-1.485Zm0,0">
                    </path>
                </svg>
            </div>
            <span>{{ notification.message }}</span>
        </div>
        <div class="element-timer">
            <div class="timer-progress" v-bind:style="{ width: timerHeight + '%' }"></div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import IconClose from '@/components/icons/IconClose';

export default {
    name: 'NotificationsElement',
    components: {
        IconClose
    },
    props: ['notification'],
    data() {
        return {
            timer: 5000,
            notificationInterval: null
        }
    },
    methods: {
        ...mapActions(['notificationRemove']),
        sendNotificationRemove() {
            this.notificationRemove(this.notification);
        }
    },
    computed: {
        getNotificationType() {
            return this.notification.type.charAt(0).toUpperCase() + this.notification.type.slice(1);
        },
        timerHeight() {
            return (100 / 5000) * this.timer;
        }
    },
    created() {
        let self = this;
        const target = Date.now() + self.timer;

        this.notificationInterval = setInterval(function () {
            self.timer = target - Date.now();

            if (self.timer <= 0) {
                clearInterval(self.notificationInterval);
                self.notificationRemove(self.notification);
            }
        }, 1);
    },
    beforeDestroy() {
        clearInterval(this.notificationInterval);
    }
}
</script>

<style scoped>
.notifications-element {
    width: 305px;
    height: 73px;
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    background: #1a1622;
    border-radius: 7px;
}

.notifications-element:first-of-type {
    margin-top: 0px;
}

.notifications-element button.button-close {
    position: absolute;
    top: 10px;
    right: 12px;
}

.notifications-element button.button-close svg {
    width: 10px;
    height: 9px;
    fill: #75adc2;
}

.notifications-element .element-timer {
    width: 100%;
    height: 2px;
    display: flex;
    align-items: flex-end;
}

.notifications-element.element-success .element-timer {
    background-color: #584919;
}

.notifications-element.element-error .element-timer {
    background-color: #583636;
}

.notifications-element .timer-progress {
    height: 3px;
    width: 100%
}

.notifications-element.element-success .timer-progress {
    background-color: #e7c253;
}

.notifications-element.element-error .timer-progress {
    background-color: #e94848;
}

.notifications-element .element-content {
    width: calc(100%);
    height: calc(100% - 3px);
    display: flex;
    align-items: center;
    padding: 0 27px 0 10px;
    font-size: 12px;
    font-weight: 600;
    color: #CABFDD;
    gap: 10px;
}

.notifications-element .element-content span {
    width: calc(100% - 50px);
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
}

.notifications-element .element-content svg {
    margin-right: 22px;
    cursor: pointer;
}

.notifications-element.element-success .element-content svg {
    fill: #e7c253;
}

.notifications-element.element-error .element-content svg {
    fill: #e94848;
}



.notifications-element .content-icon {
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
}

.notifications-element.element-success .content-icon,
.notifications-element .content-icon {
    background: #4e3f10;
}

.notifications-element.element-error .content-icon {
    background: rgba(253, 59, 49, .12)
}

.notifications-element .content-icon svg {
    width: 13px;
    margin-left: auto;
    margin-right: auto;
    height: auto
}

.notifications-element.element-success .content-icon svg,
.notifications-element .content-icon svg {
    fill: #e7c253
}

.notifications-element.element-error .content-icon svg {
    fill: #fd3b31
}

@media only screen and (max-width: 640px) {
    .notifications-element {
        width: calc(100vw - 50px);
        height: 73px;
        position: relative;
        display: flex;
        flex-direction: column;
        margin-top: 5px;
    }

}
</style>
