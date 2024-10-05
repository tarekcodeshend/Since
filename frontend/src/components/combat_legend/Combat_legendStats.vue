<template>
    <div class="combat_legend-stats">
        <div class="stats-info">
            <div class="info-buy">
                YOUR BUY IN
                <img src="@/assets/img/icons/coin.svg" alt="icon" />
                <div class="buy-value">
                    <span>{{combat_legendFormatValue(combat_legendGetStats.bet).split('.')[0]}}</span>.{{combat_legendFormatValue(combat_legendGetStats.bet).split('.')[1]}}
                </div>
            </div>
            <div class="info-winnings">
                <span class="gradient-green">POTENTIAL WINNINGS</span>
                <img src="@/assets/img/icons/coin.svg" alt="icon" />
                <div class="winnings-value">
                    <span>{{combat_legendFormatValue(combat_legendGetStats.potential).split('.')[0]}}</span>.{{combat_legendFormatValue(combat_legendGetStats.potential).split('.')[1]}}
                </div>
            </div>
            <div class="info-edge">
                SITE TAKE
                <div class="edge-value">
                    <span>20</span>.00%
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'Combat_legendStats',
        methods: {
            ...mapActions([
                'combat_legendSetFilterAnimation'
            ]),
            combat_legendFormatValue(value) {
                return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        },
        computed: {
            ...mapGetters([
                'authUser', 
                'combat_legendFilterAnimation', 
                'combat_legendGames'
            ]),
            combat_legendGetStats() {
                let stats = { bet: 0, potential: 0 };

                for(const game of this.combat_legendGames) {
                    if(this.authUser.user !== null && game.bets.some((element) => element.user._id === this.authUser.user._id) === true) {
                        let betAmount = 0;
                        let potentialAmount = Math.floor(game.amount * game.playerCount * 0.8);

                        for(const bet of game.bets) {
                            if(this.authUser.user._id === bet.user._id) {
                                betAmount = Math.floor(betAmount + bet.amount);
                                potentialAmount = Math.floor(potentialAmount - bet.amount);
                            }
                        }

                        stats.bet = Math.floor(stats.bet + betAmount);
                        stats.potential = Math.floor(stats.potential + potentialAmount);
                    }
                }

                return stats;
            }
        }
    }
</script>

<style scoped>
    .combat_legend-stats {
        width: 1160px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
    }

    .combat_legend-stats .stats-animation {
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: 700;
        color: #5e768e;
    }

    .combat_legend-stats .animation-toggle {
        width: 45px;
        height: 15px;
        position: relative;
        margin-right: 12px;
        filter: drop-shadow(0px 4px 25px rgba(15, 41, 63, 0.35));
        cursor: pointer;
    }

    .combat_legend-stats .animation-toggle::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #6a1a1ad16;
        clip-path: polygon(4px 0, calc(100% - 4px) 0, 100% 25%, 100% 75%, calc(100% - 4px) 100%, 4px 100%, 0 75%, 0 25%);
    }

    .combat_legend-stats .animation-toggle::after {
        content: '';
        width: 25px;
        height: 19px;
        position: absolute;
        top: -2px;
        left: 0;
        background: #1c5064;
        clip-path: polygon(3px 0, calc(100% - 3px) 0, 100% 25%, 100% 75%, calc(100% - 3px) 100%, 3px 100%, 0 75%, 0 25%);
        transition: all 0.3s ease;
    }

    .combat_legend-stats .animation-toggle.toggle-active::after {
        transform: translate(20px, 0);
        background: linear-gradient(255deg, #f00 0%, #f00 100%);
    }

    .combat_legend-stats .stats-info {
        display: flex;
        align-items: center;
    }

    .combat_legend-stats .info-buy,
    .combat_legend-stats .info-winnings,
    .combat_legend-stats .info-edge {
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: 600;
        color: #5e768e;
    }

    .combat_legend-stats .info-buy,
    .combat_legend-stats .info-winnings {
        position: relative;
        margin-right: 15px;
        padding-right: 15px;
    }

    .combat_legend-stats .info-buy::before,
    .combat_legend-stats .info-winnings::before {
        content: '';
        width: 1px;
        height: 24px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        background-color: #144468;
    }

    .combat_legend-stats .info-winnings span {
        font-weight: 700;
    }

    .combat_legend-stats .info-buy img,
    .combat_legend-stats .info-winnings img {
        width: 19px;
        height: 19px;
        margin-left: 12px;
    }

    .combat_legend-stats .buy-value,
    .combat_legend-stats .winnings-value,
    .combat_legend-stats .edge-value {
        margin-left: 8px;
        font-size: 10px;
        font-weight: 600;
        color: #c1c1c1;
    }

    .combat_legend-stats .edge-value {
        margin-left: 12px;
    }

    .combat_legend-stats .buy-value span,
    .combat_legend-stats .winnings-value span,
    .combat_legend-stats .edge-value span {
        font-size: 14px;
        font-weight: 800;
        color: #ffffff;
    }

    @media only screen and (max-width: 1180px) {

        .combat_legend-stats {
            width: 100%;
        }

    }

    @media only screen and (max-width: 950px) {

        .combat_legend-stats {
            flex-direction: column-reverse;
            align-items: flex-start;
        }

        .combat_legend-stats .stats-animation {
            margin-top: 20px;
        }

    }
</style>
