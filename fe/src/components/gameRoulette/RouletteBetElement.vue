<template>
    <div class="roulette-bet-element">
        <div class="element-user">
            <AvatarImage v-bind:image="bet.user.avatar" />
            <div v-html="bet.user.username" class="user-username"></div>
        </div>
        <div class="element-amount">
            <img src="@/assets/img/coins.8ad8b473.png" alt="icons-image" />
            <div class="amount-value">
                <span>{{rouletteValidateInput(bet.amount).split('.')[0]}}</span>.{{rouletteValidateInput(bet.amount).split('.')[1]}}
            </div>
        </div>
    </div>
</template>

<script>
    // import mixins from '@/mixins';
    import AvatarImage from '@/components/AvatarImage';

    export default {
        name: 'RouletteBetElement',
        components: {
            AvatarImage
        },
        // mixins: [
        //     mixins
        // ],
        props: [
            'bet'
        ],
        methods: {
            rouletteValidateInput(value) {
                return parseFloat(Math.floor(value / 10) / 100).toFixed(2);         
            },
        }
    }
</script>

<style scoped>
    .roulette-bet-element {
        width: 100%;
        height: 42px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 8px;
        border-radius: 6px;
        background: #1D1826;
        margin-bottom: 4px;
    }

    .roulette-bet-element:first-child {
        margin-top: 0;
    }

    .roulette-bet-element .element-user {
        display: flex;
        align-items: center;
    }

    .roulette-bet-element .element-user .avatar-image {
        width: 25px;
        height: 25px;
        margin-right: 6px;
        border-radius: 5px;
    }

    .roulette-bet-element .user-username {
        width: 100px;
        font-size: 13px;
        font-weight: 500;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .roulette-bet-element .element-amount {
        display: flex;
        align-items: center;
    }

    .roulette-bet-element .element-amount img {
        width: 16px;
        margin-right: 7px;
    }

    .roulette-bet-element .amount-value {
        font-size: 12px;
        font-weight: 700;
        color: #bbbbbb;
        transition: color 0.3s ease;
    }

    .roulette-bet-element .amount-value span {
        font-size: 15px;
        font-weight: 700;
        color: #ffffff;
        transition: color 0.3s ease;
    }

    .bets-section.section-lose .roulette-bet-element .amount-value,
    .bets-section.section-lose .roulette-bet-element .amount-value span {
        color: #fd3b31;
    }

    .bets-section.section-won .roulette-bet-element .amount-value,
    .bets-section.section-won .roulette-bet-element .amount-value span {
        color: #00c74d;
    }
</style>