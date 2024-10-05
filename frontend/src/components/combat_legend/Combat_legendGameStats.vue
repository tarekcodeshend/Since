<template>
    <div class="combat_legend-game-stats">
        <div class="stats-buy">
            BUY IN
            <div class="buy-amount">
                <img src="@/assets/img/icons/coin.svg" alt="icon" />
                <div class="amount-value">
                    <span>{{combat_legendFormatValue(combat_legendGame.amount).split('.')[0]}}</span>.{{combat_legendFormatValue(combat_legendGame.amount).split('.')[1]}}
                </div>
            </div>
        </div>
        <div class="stats-winnings">
            <span class="gradient-green">POTENTIAL WINNINGS</span>
            <div class="winnings-amount">
                <img src="@/assets/img/icons/coin.svg" alt="icon" />
                <div class="amount-value">
                    <span>{{combat_legendFormatValue(Math.floor(combat_legendGame.amount * combat_legendGame.playerCount * 0.8)).split('.')[0]}}</span>.{{combat_legendFormatValue(Math.floor(combat_legendGame.amount * combat_legendGame.playerCount * 0.8)).split('.')[1]}}
                </div>
            </div>
        </div>
        <div class="stats-players">
            <IconUserGradient />
            <div class="players-amount">
                PLAYERS:
                <div class="amount-value">
                    <span>{{combat_legendGame.playerCount}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import IconUserGradient from '@/components/icons/IconUserGradient';

    export default {
        name: 'Combat_legendGameStats',
        props: [
            'combat_legendGame'
        ],
        components: {
            IconUserGradient,
        },
        methods: {
            combat_legendFormatValue(value) {
                return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        }
    }
</script>

<style scoped>
    .combat_legend-game-stats {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 35px;
    }

    .combat_legend-game-stats .stats-buy,
    .combat_legend-game-stats .stats-winnings,
    .combat_legend-game-stats .stats-players {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        color: #5e768e;
    }

    .combat_legend-game-stats .stats-winnings {
        font-weight: 700;
    }

    .combat_legend-game-stats .stats-buy,
    .combat_legend-game-stats .stats-winnings {
        position: relative;
        margin-right: 15px;
        padding-right: 15px;
    }

    .combat_legend-game-stats .stats-buy::after,
    .combat_legend-game-stats .stats-winnings::after {
        content: '';
        width: 1px;
        height: 24px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        background-color: #144468;
    }

    .combat_legend-game-stats .buy-amount,
    .combat_legend-game-stats .winnings-amount,
    .combat_legend-game-stats .players-amount {
        display: flex;
        align-items: center;
        margin-left: 12px;
    }

    .combat_legend-game-stats .buy-amount img,
    .combat_legend-game-stats .winnings-amount img {
        width: 20px;
        height: 20px;
    }

    .combat_legend-game-stats .stats-players svg {
        width: 17px;
        height: 19px;
    }

    .combat_legend-game-stats .amount-value {
        margin-left: 8px;
        font-size: 10px;
        font-weight: 600;
        color: #c1c1c1;
    }

    .combat_legend-game-stats .amount-value span {
        font-size: 14px;
        font-weight: 800;
        color: #ffffff;
    }

    @media only screen and (max-width: 700px) {

        .combat_legend-game-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }

        .combat_legend-game-stats .stats-buy {
            display: flex;
            justify-content: flex-end;
            grid-column: 1 / 1;
        }

        .combat_legend-game-stats .stats-players {
            grid-column: 2 / 2;
        }

        .combat_legend-game-stats .stats-winnings {
            width: 100%;
            display: flex;
            justify-content: center;
            grid-column: 1 / 3;
            grid-row: 2 / 2;
            margin-top: 20px;
        }

        .combat_legend-game-stats .stats-winnings::after {
            display: none;
        }

    }
</style>
