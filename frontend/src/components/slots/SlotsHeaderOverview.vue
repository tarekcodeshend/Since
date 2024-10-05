<template>
    <div class="unbox-header-overview">
        <div class="overview-title">
            Slots
        </div>

        <div class="overview-filter">
            <UnboxFilterSearch /> 
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import UnboxFilterSearch from '@/components/slots/UnboxFilterSearch';
    import UnboxFilterSort from '@/components/slots/UnboxFilterSort';

    export default {
        name: 'UnboxHeaderOverview',
        components: {
            UnboxFilterSearch,
            UnboxFilterSort
        },
        methods: {
            ...mapActions([
                'unboxSetFilterSelect'
            ])
        },
        computed: {
            ...mapGetters([
                'unboxFilterSelect'
            ])
        }
    }
</script>

<style scoped>
    .unbox-header-overview {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .unbox-header-overview .overview-title {
        display: flex;
        align-items: center;
        padding-bottom: 25px;
        font-size: 16px;
        font-weight: 800;
        color: #ffffff;
    }

    .unbox-header-overview .overview-title svg {
        margin-right: 8px;
    }

    .unbox-header-overview .overview-select {
        width: calc(100% - 625px);
        display: flex;
        align-items: center;
        margin-left: 35px;
        padding-bottom: 25px;
    }

    .unbox-header-overview .overview-select button.button-select {
        height: 45px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-right: 25px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(110, 149, 182, 0.5);
        transition: color 0.3s ease;
    }

    .unbox-header-overview .overview-select button.button-select:last-child {
        margin-right: 0;;
    }

    .unbox-header-overview .overview-select button.button-select.button-active {
        color: #ffffff;
    }

    .unbox-header-overview .overview-select button.button-select.button-active::after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: -27px;
        background: linear-gradient(146deg, #6170f1 0%, #1c47b6 100%);
    }

    .unbox-header-overview .overview-select button.button-select svg {
        margin-bottom: 7px;
        fill: rgba(110, 149, 182, 0.5);
        transition: all 0.3s ease;
    }

    .unbox-header-overview .overview-select button.button-select.button-active svg {
        fill: #6170f1;
        filter: drop-shadow(0px 2px 25px #5267e4);
    }

    .unbox-header-overview .overview-filter  {
        display: flex;
        align-items: flex-end;
        padding-bottom: 15px;
    }

    @media only screen and (max-width: 1150px) {

        .unbox-header-overview {
            display: grid;
            grid-template-rows: auto auto;
        }

        .unbox-header-overview .overview-title {
            grid-row: 1 / 1;
        }

        .unbox-header-overview .overview-select {
            width: auto;
            grid-row: 2 / 2;
            margin-left: 0;
        }

        .unbox-header-overview .overview-filter {
            grid-row: 2 / 2;
        }

    }

    @media only screen and (max-width: 900px) {

        .unbox-header-overview {
            grid-template-rows: auto auto;
            align-items: center;
        }

        .unbox-header-overview .overview-title {
            grid-column: 1 / 1;
            grid-row: 1 / 1;
            padding-bottom: 0;
        }

        .unbox-header-overview .overview-select {
            grid-column: 1 / 3;
            grid-row: 2 / 2;
            margin-top: 25px;
        }

        .unbox-header-overview .overview-filter {
            grid-column: 2 / 2;
            grid-row: 1 / 1;
            padding-bottom: 0;
        }

    }

    @media only screen and (max-width: 700px) {

        .unbox-header-overview {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            align-items: center;
        }

        .unbox-header-overview .overview-title {
            grid-column: 1 / 1;
            grid-row: 1 / 1;
            padding-bottom: 0;
        }

        .unbox-header-overview .overview-select {
            grid-column: 1 / 1;
            grid-row: 3 / 3;
            margin-top: 25px;
        }

        .unbox-header-overview .overview-filter {
            grid-column: 1 / 1;
            grid-row: 2 / 2;
            margin-top: 15px;
        }

    }

    @media only screen and (max-width: 550px) {

        .unbox-header-overview .overview-filter  {
            flex-direction: column;
            align-items: flex-start;
        }

    }
</style>