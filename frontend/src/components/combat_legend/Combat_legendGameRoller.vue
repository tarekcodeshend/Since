<template>
    <div class="combat_legend-game-roller">
        <div v-if="
            (combat_legendGame.state === 'completed' || combat_legendGame.winner !== undefined) && 
            (authUser.user === null || combat_legendGame.bets.some((element) => element.user._id === authUser.user._id) === false || (combat_legendGame.winner.bot === false && combat_legendGame.winner.user._id === authUser.user._id))
        " class="roller-won">
            <div class="won-title">
                <span class="gradient-green">
                    CONGRATULATIONS <span v-html="combat_legendGame.winner.bot === true ? combat_legendGetBotName : combat_legendGame.winner.user.username"></span>!
                </span>
            </div>
            <div class="won-info">WINNINGS HAS BEEN CREDITED!</div>
            <div class="won-amount">
                <img src="@/assets/img/icons/coin.svg" alt="icon" />
                <div class="amount-value">
                    <span>{{combat_legendFormatValue(Math.floor(combat_legendGame.amount * combat_legendGame.playerCount * 0.8)).split('.')[0]}}</span>.{{combat_legendFormatValue(Math.floor(combat_legendGame.amount * combat_legendGame.playerCount * 0.8)).split('.')[1]}}
                </div>
            </div>
        </div>
        <div v-else-if="combat_legendGame.state === 'completed' || combat_legendGame.winner !== undefined" class="roller-lost">
            <div class="lost-title">YOU’VE LOST THE BATTLE</div>
            <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.604095 43.4843C-0.0848502 45.0768 0.648072 46.9259 2.23956 47.6127C3.8321 48.3038 5.68011 47.5698 6.36906 45.9773C9.39812 38.9737 16.5567 34.4474 24.6094 34.4474C32.8475 34.4474 40.05 38.9705 42.9565 45.9689C43.4591 47.1772 44.6287 47.9059 45.8589 47.9059C46.261 47.9059 46.6683 47.8295 47.063 47.6661C48.665 46.9992 49.4241 45.1606 48.7592 43.5597C44.8747 34.2076 35.3949 28.1652 24.6104 28.1652C14.0511 28.1673 4.62784 34.1793 0.604095 43.4843ZM46.44 6.49265C46.44 2.90866 43.5324 4.77992e-07 39.9474 7.91406e-07C36.3634 1.10473e-06 33.4558 2.90761 33.4558 6.49265C33.4558 10.0798 36.3634 12.9874 39.9474 12.9874C43.5324 12.9863 46.44 10.0787 46.44 6.49265ZM17.0006 6.49265C17.0006 2.90866 14.0909 3.05185e-06 10.5059 3.36526e-06C6.92189 3.67859e-06 4.01428 2.90761 4.01428 6.49265C4.01428 10.0798 6.92084 12.9874 10.5059 12.9874C14.0909 12.9874 17.0006 10.0787 17.0006 6.49265Z" />
            </svg>
        </div>
        <div v-else class="roller-game">
            <div v-if="combat_legendGame.state === 'created' " class="game-waiting">
                {{combat_legendText}}
            </div>

            <div v-if="combat_legendGame.state === 'countdown'" class="game-joining">
                <div>
                    {{combat_legendText}}
                </div>
                <button v-on:click="combat_legendJoinRobloxButton" >
                    <div class="button-inner">JOIN SEVER</div>
                </button>
            </div>

            <div v-if="combat_legendGame.state === 'rolling' || combat_legendGame.state === 'pending' " class="game-started">
                <div>
                    GAME ALREADY STARTED
                </div>
            </div>

            <div class="game-inner">
                
                <!-- <div class="inner-holder">
                    <div class="holder-inner">
                        <Combat_legendReel v-bind:style="combat_legendReelStyleOne" />
                    </div>
                </div>
                <div class="inner-holder">
                    <div class="holder-inner">
                        <Combat_legendReel v-bind:style="combat_legendReelStyleTwo" />
                    </div>
                </div>
                <div class="inner-seperator"></div>
                <div class="inner-holder">
                    <div class="holder-inner">
                        <Combat_legendReel v-bind:style="combat_legendReelStyleThree" />
                    </div>
                </div>
                <div class="inner-holder">
                    <div class="holder-inner">
                        <Combat_legendReel v-bind:style="combat_legendReelStyleFour" />
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Combat_legendReel from '@/components/combat_legend/Combat_legendReel';

    export default {
        name: 'Combat_legendGameRoller',
        components: {
            Combat_legendReel
        },
        props: [
            'combat_legendGame',
        ],
        data() {
            return {
                combat_legendTimerRepeater: null,
                combat_legendText: 'WAITING FOR PLAYERS',
                combat_legendReelStyleOne: { transform: 'translateY(39px)' },
                combat_legendReelStyleTwo: { transform: 'translateY(39px)' },
                combat_legendReelStyleThree: { transform: 'translateY(39px)' },
                combat_legendReelStyleFour: { transform: 'translateY(39px)' },
            }
        },
        methods: {
            ...mapActions([
                'combat_legendSendJoinRoblox'
            ]),
            combat_legendFormatValue(value) {
                return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
            combat_legendStartTimer() {
                const timeEnding = new Date(this.combat_legendGame.updatedAt).getTime() + (1000 * 120);
                const timeLeft = (timeEnding - (new Date().getTime() + this.generalTimeDiff)) / 1000;

                this.combat_legendText = 'YOU HAVE ' + (timeLeft).toFixed(2) + 's LEFT TO';

                if(timeLeft <= 0) { 
                    this.combat_legendText = 'STARTING GAME'; 
                } else {
                    this.combat_legendTimerRepeater = requestAnimationFrame(this.combat_legendStartTimer);
                }
            },
            combat_legendStartRolling(from, to, time) {
                time = 10;

                from = from.length < 4 ? '0' + from : from;
                to = to.length < 4 ? '0' + to : to;

                this.combat_legendReelStyleOne = { transform: 'translateY(' + (39 - (from.split('')[0] * 130)) + 'px)', transition: 'none' };
                this.combat_legendReelStyleTwo = { transform: 'translateY(' + (39 - (from.split('')[1] * 130)) + 'px)', transition: 'none' };
                this.combat_legendReelStyleThree = { transform: 'translateY(' + (39 - (from.split('')[2] * 130)) + 'px)', transition: 'none' };
                this.combat_legendReelStyleFour = { transform: 'translateY(' + (39 - (from.split('')[3] * 130)) + 'px)', transition: 'none' };

                setTimeout(() => {
                    this.combat_legendReelStyleOne = { transform: 'translateY(' + (39 - 3900 - (to.split('')[0] * 130)) + 'px)', transition: 'transform ' + time + 's cubic-bezier(0.15, 0.8, 0.12, 0.95)' };
                    this.combat_legendReelStyleTwo = { transform: 'translateY(' + (39 - 3900 - (to.split('')[1] * 130)) + 'px)', transition: 'transform ' + time * 0.62 + 's cubic-bezier(0.15, 0.8, 0.12, 0.95)' };
                    this.combat_legendReelStyleThree = { transform: 'translateY(' + (39 - 3900 - (to.split('')[2] * 130)) + 'px)', transition: 'transform ' + time * 0.5 + 's cubic-bezier(0.15, 0.8, 0.12, 0.95)' };
                    this.combat_legendReelStyleFour = { transform: 'translateY(' + (39 - 3900 - (to.split('')[3] * 130)) + 'px)', transition: 'transform ' + time * 0.37 + 's cubic-bezier(0.15, 0.8, 0.12, 0.95)' };
                }, 100);
            },
            combat_legendJoinRobloxButton() {
                if(this.authUser.user === null) {
                    this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                    return;
                }
                
                const data = { 
                    data: {gameId: this.combat_legendGame._id},
                    callback:  (server_roblox_link) => {
                        window.open(server_roblox_link);
                    }
                };
                this.combat_legendSendJoinRoblox(data);
            }
        },
        computed: {
            ...mapGetters([
                'generalTimeDiff', 
                'authUser', 
                'combat_legendFilterAnimation',
                'combat_legendRobloxServerLink'
            ]),
            combat_legendGetBotName() {
                const pos = this.combat_legendGame.bets.findIndex((element) => element._id === this.combat_legendGame.winner._id);
                const names = ['Specter', 'Lorenz', 'Gio', 'Cup', 'Dip', 'Fowntain', 'Levrock26', 'Chunkeh', 'Mateheus'];

                return names[pos - 1];
            },
            combat_legendGetStep() {
                let step = Math.floor((new Date().getTime() - new Date(this.combat_legendGame.updatedAt).getTime() + this.generalTimeDiff) / this.combat_legendGetAnimationTime);
                step = step <= 0 ? 0 : step;

                return step;
            }
        },
        watch: {
            'combat_legendGame': {
                handler(data, oldData) {
                    if(this.combat_legendGame.state === 'countdown') {
                        this.combat_legendStartTimer();
                    } else if(this.combat_legendGame.state === 'rolling') {
                        const index = this.combat_legendGame.bets.filter((element) => element.roll !== undefined).length;

                        const from = index === 1 ? '0000' : this.combat_legendGame.bets[index - 2].roll.toString();
                        const to = this.combat_legendGame.bets[index - 1].roll.toString();

                        let time = ((new Date(this.combat_legendGame.updatedAt).getTime() + this.generalTimeDiff) + (this.combat_legendFilterAnimation === 'fast' ? 3000 : 5000) * index - (new Date().getTime() + this.generalTimeDiff)) / 1000;
                        time = time < 1 ? 0 : time - 1;

                        this.combat_legendStartRolling(from, to, time);
                    }
                },
                deep: true
            }
        },
        beforeDestroy() {
            cancelAnimationFrame(this.combat_legendTimerRepeater);
        },
        created() {
            if(this.combat_legendGame.state === 'countdown') {
                this.combat_legendStartTimer();
            } else if(this.combat_legendGame.state === 'rolling') {
                const index = this.combat_legendGame.bets.filter((element) => element.roll !== undefined).length;

                const from = index === 1 ? '0000' : this.combat_legendGame.bets[index - 2].roll.toString();
                const to = this.combat_legendGame.bets[index - 1].roll.toString();

                let time = ((new Date(this.combat_legendGame.updatedAt).getTime() + this.generalTimeDiff) + (this.combat_legendFilterAnimation === 'fast' ? 3000 : 5000) * index - (new Date().getTime() + this.generalTimeDiff)) / 1000;
                time = time < 1 ? 0 : time - 1;

                this.combat_legendStartRolling(from, to, time);
            }
        }
    }
</script>

<style scoped>
    .combat_legend-game-roller {
        width: 80%;
        height: 400px;
        position: relative;
        margin-top: 35px;
        padding: 15px 0;
    }

    .combat_legend-game-roller::before {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(90deg, rgba(12, 50, 78, 0) 0%, #FFFFFF 50%, rgba(12, 50, 78, 0) 100%);
    }

    .combat_legend-game-roller::after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: linear-gradient(90deg, rgba(12, 50, 78, 0) 0%, #FFFFFF 50%, rgba(12, 50, 78, 0) 100%);
    }

    .combat_legend-game-roller .roller-won,
    .combat_legend-game-roller .roller-lost {
        width: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        top: 15px;
        bottom: 1px;
        left: 0;
        border-radius: 10px;
    }

    .combat_legend-game-roller .roller-won::after,
    .combat_legend-game-roller .roller-lost::after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .combat_legend-game-roller .roller-won {
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
                    radial-gradient(130% 190% at 50% 165%, rgba(1, 208, 147, 0.5) 1.13%, rgba(1, 170, 127, 0.48) 30%, rgba(1, 143, 113, 0.3) 40%, rgba(1, 43, 60, 0.0384193) 85%, rgba(1, 28, 52, 0) 100%),
                    linear-gradient(180deg, #0d2030 0%, #00101f 100%), radial-gradient(85% 85% at 50% 15%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
    }

    .combat_legend-game-roller .roller-won::after {
        background: linear-gradient(90deg, rgba(12, 50, 78, 0) 0%, #01ce91 50%, rgba(12, 50, 78, 0) 100%);
    }

    .combat_legend-game-roller .roller-lost {
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), 
                    linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(245, 80, 70, 0.2) 100%), 
                    linear-gradient(180deg, #0d2030 0%, #00101f 100%), 
                    radial-gradient(85% 85% at 50% 15%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
    }

    .combat_legend-game-roller .roller-lost::after {
        background: linear-gradient(90deg, rgba(12, 50, 78, 0) 0%, #ca6050 50%, rgba(12, 50, 78, 0) 100%);
    }

    .combat_legend-game-roller .roller-lost svg {
        margin-top: 25px;
        fill: #ca6150;
    }

    .combat_legend-game-roller .won-title,
    .combat_legend-game-roller .lost-title {
        text-align: center;
        text-transform: uppercase;
        font-size: 32px;
        font-weight: 800;
    }

    .combat_legend-game-roller .lost-title {
        color: #ca6150;
    }

    .combat_legend-game-roller .won-info {
        margin-top: 10px;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: #7a93ac;
    }

    .combat_legend-game-roller .won-amount {
        display: flex;
        align-items: center;
        margin-top: 15px;
    }

    .combat_legend-game-roller .won-amount img {
        width: 22px;
        height: 22px;
        margin-right: 8px;
    }

    .combat_legend-game-roller .amount-value {
        font-size: 16px;
        font-weight: 600;
        color: #c1c1c1;
    }

    .combat_legend-game-roller .amount-value span {
        font-size: 20px;
        font-weight: 800;
        color: #ffffff;
    }

    .combat_legend-game-roller .roller-game {
        width: 100%;
        height: 100%;
    }

    .combat_legend-game-roller .game-waiting {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 15px;
        bottom: 1px;
        left: 0;
        border-radius: 10px;
        font-size: 24px;
        font-weight: 800;
        color: #ffffff;
        background-color: rgba(0, 21, 39, 0.82);
        backdrop-filter: blur(5px);
        z-index: 1;
    }

    .combat_legend-game-roller .game-joining {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 15px;
        bottom: 1px;
        left: 0;
        border-radius: 10px;
        font-size: 24px;
        font-weight: 800;
        color: #000000;
        backdrop-filter: blur(0.5px);
        z-index: 1;
    }

    .combat_legend-game-roller .game-started {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 15px;
        bottom: 1px;
        left: 0;
        border-radius: 10px;
        font-size: 24px;
        font-weight: 800;
        color: #1aff00;
        backdrop-filter: blur(1px);
        z-index: 1;
    }


    .combat_legend-game-roller .game-joining button {
        width: 80px;
        height: 35px;
        margin-left: 5px;
    }


    .combat_legend-game-roller .game-joining button .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: 800;
        color: #ffffff;
        background: linear-gradient(255deg, #f00 0%, #f00 100%);
        clip-path: polygon(4px 0, calc(100% - 4px) 0, 100% 25%, 100% 75%, calc(100% - 4px) 100%, 4px 100%, 0 75%, 0 25%);
    }

    .combat_legend-game-roller .game-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        background-image: url('~@/assets/img/battle_legend/banner.webp');
    }

    

    .combat_legend-game-roller .inner-holder {
        width: calc(25% - 18px);
        height: 100%;
        padding: 1px;
        border-radius: 8px;
        background: linear-gradient(180deg, rgba(11, 51, 84, 0) 0%, #123B5e 50%, rgba(11, 51, 84, 0) 100%);
    }

    .combat_legend-game-roller .holder-inner {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background: radial-gradient(125% 50% at 50% 50%, rgba(8, 45, 78, 0.5) 0%, rgba(8, 45, 78, 0.5) 0%, rgba(5, 30, 52, 0.5) 100%);
        overflow: hidden;
    }

    .combat_legend-game-roller .inner-seperator {
        width: 7px;
        height: 7px;
        border-radius: 1px;
        background: radial-gradient(155% 90% at 50% 50%, rgba(124, 196, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
    }

    @media only screen and (max-width: 800px) {

        .combat_legend-game-roller .won-title,
        .combat_legend-game-roller .lost-title {
            font-size: 24px;
        }

        .combat_legend-game-roller .won-info {
            font-size: 15px;
        }

        .combat_legend-game-roller .won-amount img {
            width: 19px;
            height: 19px;
        }

        .combat_legend-game-roller .amount-value {
            font-size: 12px;
        }

        .combat_legend-game-roller .amount-value span {
            font-size: 16px;
        }

    }
</style>
