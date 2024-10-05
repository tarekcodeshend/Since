<template>
    <div class="slots-overview">
        <transition name="fade" mode="out-in">
            <div v-if="socketSlots.connected === false" class="overview-loading" key="loading">

                <div class="loading-placeholder"></div>
                <div class="loading-placeholder"></div>
                <div class="loading-placeholder"></div>
                <div class="loading-placeholder"></div>
                <div class="loading-placeholder"></div>
                <div class="loading-placeholder"></div>
                <div class="loading-placeholder"></div>

            </div>
            <div v-else-if="slotsGetBoxes.length > 0" class="overview-list" key="data">

                <SlotsBoxElement v-for="box of slotsGetBoxes" v-bind:key="box._id" v-bind:box="box" />

            </div>
            <div v-else class="overview-empty" key="empty">There are no slots.</div>
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import SlotsBoxElement from '@/components/slots/SlotsBoxElement';

    export default {
        name: 'SlotsOverview',
        components: {
            SlotsBoxElement
        },
        computed: {
            ...mapGetters([
                'socketSlots',
                'slotsFilterSearch',
                'slotsFilterSort',
                'slotsFilterSelect',
                'slotsBoxes'
            ]),
            slotsGetBoxes() {
                let boxes = [];
                for(const box of this.slotsBoxes) {
                    if(box.Name.toLowerCase().includes(this.slotsFilterSearch.toLowerCase().trim()) === true) {
                        boxes.push(box);
                    }
                }

                return boxes;
            }
        }
    }
</script>

<style scoped>
    .slots-overview {
        width: 100%;
    }

    .slots-overview .overview-loading,
    .slots-overview .overview-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .slots-overview .overview-loading.fade-leave-active {
        transition: opacity 0.5s;
    }

    .slots-overview .overview-loading.fade-leave-to {
        opacity: 0;
    }

    .slots-overview .loading-placeholder {
        width: calc(14.28% - 7.7px);
        height: 220px;
        position: relative;
        margin-bottom: 10px;
        margin-right: 9px;
        background: linear-gradient(223deg, rgb(66, 107, 252, 0.2) 0%, rgba(31, 99, 153, 0.09) 50%, rgb(66, 107, 252, 0.2) 100%);
        border: 1px solid #5f1c1c;
        overflow: hidden;
    }

    .slots-overview .loading-placeholder:after {
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

    .slots-overview .loading-placeholder:nth-child(7n) {
        margin-right: 0;
    }

    .slots-overview .overview-empty {
        width: 100%;
        height: 220px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 600;
        color: #5e768e;
    }

    .slots-overview .overview-list.fade-enter-active,
    .slots-overview .overview-empty.fade-enter-active {
        transition: opacity 0.5s;
    }

    .slots-overview .overview-list.fade-enter-from,
    .slots-overview .overview-empty.fade-enter-from {
        opacity: 0;
    }

    @keyframes loading_animation {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
        100% { transform: translateX(100%); }
    }

    @media only screen and (max-width: 1200px) {

        .slots-overview .loading-placeholder {
            width: calc(16.66% - 7.5px);
        }

        .slots-overview .loading-placeholder:nth-child(7n) {
            margin-right: 9px;
        }

        .slots-overview .loading-placeholder:nth-child(6n) {
            margin-right: 0;
        }

    }

    @media only screen and (max-width: 1050px) {

        .slots-overview .loading-placeholder {
            width: calc(20% - 7.2px);
        }

        .slots-overview .loading-placeholder:nth-child(6n) {
            margin-right: 9px;
        }

        .slots-overview .loading-placeholder:nth-child(5n) {
            margin-right: 0;
        }

    }

    @media only screen and (max-width: 800px) {

        .slots-overview .loading-placeholder {
            width: calc(25% - 6.75px);
        }

        .slots-overview .loading-placeholder:nth-child(5n) {
            margin-right: 9px;
        }

        .slots-overview .loading-placeholder:nth-child(4n) {
            margin-right: 0;
        }

    }

    @media only screen and (max-width: 650px) {

        .slots-overview .loading-placeholder {
            width: calc(33.33% - 6px);
        }

        .slots-overview .loading-placeholder:nth-child(4n) {
            margin-right: 9px;
        }

        .slots-overview .loading-placeholder:nth-child(3n) {
            margin-right: 0;
        }

    }

    @media only screen and (max-width: 500px) {

        .slots-overview .loading-placeholder {
            width: calc(50% - 4.5px);
        }

        .slots-overview .loading-placeholder:nth-child(3n) {
            margin-right: 9px;
        }

        .slots-overview .loading-placeholder:nth-child(2n) {
            margin-right: 0;
        }

    }
</style>