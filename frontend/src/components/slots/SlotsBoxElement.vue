<template>
    <router-link class="slots-box-element" v-bind:to="'/slots/' + box.Id">
        <div class="element-name">
            <div class="name-inner">{{ box.Name }}</div>
        </div>
        <div class="element-image">
            <img height="100%" v-bind:src="slotsImagePath + '/public/img/slots/' + box.Id + '.jpeg'" />
        </div>
        <div class="element-price">
            <img src="@/assets/img/icons/coin.svg" alt="icon" />
            <div class="price-value">
                <span>Mascot</span>
            </div>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'SlotsBoxElement',
        props: [
            'box'
        ],
        data() {
            return {
                slotsImagePath: process.env.VUE_APP_BACKEND_URL
            }
        },
        methods: {
            slotsFormatValue(value) {
                return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        }
    }
</script>

<style scoped>
    .slots-box-element {
        width: calc(14.28% - 7.7px);
        height: 220px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        margin-right: 9px;
        padding: 15px 10px;
        background: linear-gradient(223deg, rgb(66, 107, 252, 0.2) 0%, rgba(31, 99, 153, 0.09) 50%, rgb(66, 107, 252, 0.2) 100%);
        border: 1px solid #5f1c1c;
        z-index: 1;
    }

    .slots-box-element:nth-child(7n) {
        margin-right: 0;
    }

    .slots-box-element .element-name {
        width: 100%;
        height: 32px;
        position: relative;
        padding: 1px;
        z-index: 1;
    }

    .slots-box-element .element-name:before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #5f1c1c;
        clip-path: polygon(6px 0, calc(100% - 6px) 0, 100% 25%, 100% 75%, calc(100% - 6px) 100%, 6px 100%, 0 75%, 0 25%);
        z-index: -1;
    }

    .slots-box-element .element-name:after {
        content: '';
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        position: absolute;
        top: 1px;
        left: 1px;
        background: #6a1a1a000;
        clip-path: polygon(6px 0, calc(100% - 6px) 0, 100% 25%, 100% 75%, calc(100% - 6px) 100%, 6px 100%, 0 75%, 0 25%);
        z-index: -1;
    }

    .slots-box-element .name-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        color: #5e768e;
        background: linear-gradient(0deg, rgba(29, 101, 159, 0.08) 0%, rgba(29, 101, 159, 0.08) 100%), 
                    linear-gradient(223deg, rgb(66, 107, 252, 0.2) 0%, rgba(31, 99, 153, 0.1) 50%, rgb(66, 107, 252, 0.2) 100%);
        clip-path: polygon(6px 0, calc(100% - 6px) 0, 100% 25%, 100% 75%, calc(100% - 6px) 100%, 6px 100%, 0 75%, 0 25%);
    }

    .slots-box-element .element-image {
        height: 104px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .slots-box-element .element-image img {
        width: 130px;
    }

    .slots-box-element .element-price {
        display: flex;
        align-items: center;
    }

    .slots-box-element .element-price img {
        width: 18px;
        height: 18px;
        margin-right: 8px;
    }

    .slots-box-element .price-value {
        font-size: 10px;
        font-weight: 600;
        color: #bbbfd0;
    }

    .slots-box-element .price-value span {
        font-size: 14px;
        font-weight: 800;
        color: #ffffff;
    }

    @media only screen and (max-width: 1200px) {

        .slots-box-element {
            width: calc(16.66% - 7.5px);
        }

        .slots-box-element:nth-child(7n) {
            margin-right: 9px;
        }

        .slots-box-element:nth-child(6n) {
            margin-right: 0;
        }

    }

    @media only screen and (max-width: 1050px) {

        .slots-box-element {
            width: calc(20% - 7.2px);
        }

        .slots-box-element:nth-child(6n) {
            margin-right: 9px;
        }

        .slots-box-element:nth-child(5n) {
            margin-right: 0;
        }

    }

    @media only screen and (max-width: 800px) {

        .slots-box-element {
            width: calc(25% - 6.75px);
        }

        .slots-box-element:nth-child(5n) {
            margin-right: 9px;
        }

        .slots-box-element:nth-child(4n) {
            margin-right: 0;
        }

    }

    @media only screen and (max-width: 650px) {

        .slots-box-element {
            width: calc(33.33% - 6px);
        }

        .slots-box-element:nth-child(4n) {
            margin-right: 9px;
        }

        .slots-box-element:nth-child(3n) {
            margin-right: 0;
        }

    }

    @media only screen and (max-width: 500px) {

        .slots-box-element {
            width: calc(50% - 4.5px);
        }

        .slots-box-element:nth-child(3n) {
            margin-right: 9px;
        }

        .slots-box-element:nth-child(2n) {
            margin-right: 0;
        }

    }
</style>