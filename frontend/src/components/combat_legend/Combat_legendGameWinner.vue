<template>
    <div class="combat_legend-game-winner">
        <span class="gradient-green">BATTLE WINNER:</span>
        <div v-if="combat_legendGame.state !== 'completed'" class="winner-placeholder"></div>
        <div v-else class="winner-content">
            <div class="content-inner">
                <div class="inner-user" v-bind:class="[
                    'user-' + (combat_legendGame.winner.bot === true ? 'bot' : combat_legendGetRank(combat_legendGame.winner.user)),
                    'user-' + (combat_legendGame.winner.bot === true ? '' : combat_legendGetLevelColor(combat_legendGame.winner.user))
                ]">
                    <div class="user-avatar">
                        <AvatarImage v-bind:image="combat_legendGame.winner.bot ? null : combat_legendGame.winner.user.avatar" />
                    </div>
                    <span v-html="combat_legendGame.winner.bot === true ? combat_legendGetBotName : combat_legendGame.winner.user.username"></span>
                </div>
                <div class="inner-roll">
                    <div class="roll-inner">
                        <span class="gradient-green">{{parseFloat(combat_legendGame.winner.roll / 100).toFixed(2)}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AvatarImage from '@/components/AvatarImage';

    export default {
        name: 'Combat_legendGameWinner',
        props: [
            'combat_legendGame'
        ],
        components: {
            AvatarImage
        },
        methods: {
            combat_legendGetRank(user) {
                let rank = user.rakeback;

                if(user.rank !== 'user') { rank = user.rank; }

                return rank;
            },
            combat_legendGetLevelColor(user) {
                let color = '';

                if(user.level >= 2 && user.level < 26) { color = 'blue'; }
                else if(user.level >= 26 && user.level < 51) { color = 'green'; }
                else if(user.level >= 51 && user.level < 76) { color = 'orange'; }
                else if(user.level >= 76 && user.level < 100) { color = 'red'; }
                else if(user.level >= 100) { color = 'purple'; }

                return color;
            }
        },
        computed: {
            combat_legendGetBotName() {
                const pos = this.combat_legendGame.bets.findIndex((element) => element._id === this.combat_legendGame.winner._id);
                const names = ['Specter', 'Lorenz', 'Gio', 'Cup', 'Dip', 'Fowntain', 'Levrock26', 'Chunkeh', 'Mateheus'];
                
                return names[pos - 1];
            }
        }
    }
</script>

<style scoped>
    .combat_legend-game-winner {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
        font-size: 14px;
        font-weight: 800;
    }

    .combat_legend-game-winner .winner-placeholder,
    .combat_legend-game-winner .winner-content {
        width: 460px;
        height: 78px;
        margin-top: 25px;
        border-radius: 8px;
    }

    .combat_legend-game-winner .winner-placeholder {
        border: 1px solid #0b3354;
    }

    .combat_legend-game-winner .winner-content {
        position: relative;
        padding: 1px;
        z-index: 1;
    }

    .combat_legend-game-winner .winner-content:before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 8px;
        background: linear-gradient(180deg, rgba(255, 0, 0, 0) 0%, #f00 100%);
        z-index: -1;
    }

    .modal-combat_legend-game .winner-content:after {
        content: '';
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        position: absolute;
        top: 1px;
        left: 1px;
        border-radius: 8px;
        background-color: #001c33;
        z-index: -1;
    }

    .modal-combat_legend-game .content-inner {
        width: 100%;
        height:  100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 25px;
        border-radius: 8px;
        background: linear-gradient(255deg, rgba(255, 0, 0, 0.02) 0%, rgba(0, 170, 109, 0.02) 100%), radial-gradient(170% 170% at 50% 50%, rgba(255, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 100%);
        box-shadow: inset 0px 5px 50px rgba(0, 0, 0, 0.25);
        z-index: 1;
    }

    .modal-combat_legend-game .inner-user {
        display: flex;
        align-items: center;
    }

    .modal-combat_legend-game .user-avatar {
        width: 41px;
        height: 41px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-right: 12px;
        border-radius: 50%;
        background-color: #001c33;
        border: 1px solid #9e9e9e;
        overflow: hidden;
    }

    .modal-combat_legend-game .inner-user.user-blue .user-avatar {
        border: 1px solid #559ee4;
    }

    .modal-combat_legend-game .inner-user.user-green .user-avatar {
        border: 1px solid #b8e92d;
    }

    .modal-combat_legend-game .inner-user.user-orange .user-avatar {
        border: 1px solid #fca311;
    }

    .modal-combat_legend-game .inner-user.user-red .user-avatar {
        border: 1px solid #ff4e4e;
    }

    .modal-combat_legend-game .inner-user.user-purple .user-avatar {
        border: 1px solid #6953f1;
    }

    .modal-combat_legend-game .inner-user.user-partner .user-avatar {
        border: 1px solid #eca822;
    }

    .modal-combat_legend-game .inner-user.user-mod .user-avatar {
        border: 1px solid #ffb703;
    }

    .modal-combat_legend-game .inner-user.user-bot .user-avatar,
    .modal-combat_legend-game .inner-user.user-admin .user-avatar {
        border: 1px solid #f00;
    }

    .modal-combat_legend-game .user-avatar .avatar-image {
        width: 31px;
        height: 31px;
    }

    .modal-combat_legend-game .inner-user span {
        width: 100px;
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
    }

    .modal-combat_legend-game .inner-roll {
        width: 70px;
        height: 35px;
        position: relative;
        padding: 1px;
        z-index: 1;
    }

    .modal-combat_legend-game .inner-roll::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(255, 0, 0, 0) 0%, #f00 100%);
        clip-path: polygon(4px 0, calc(100% - 4px) 0, 100% 25%, 100% 75%, calc(100% - 4px) 100%, 4px 100%, 0 75%, 0 25%);
        z-index: -1;
    }

    .modal-combat_legend-game .inner-roll::after {
        content: '';
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        position: absolute;
        top: 1px;
        left: 1px;
        background-color: #001c33;
        clip-path: polygon(4px 0, calc(100% - 4px) 0, 100% 25%, 100% 75%, calc(100% - 4px) 100%, 4px 100%, 0 75%, 0 25%);
        z-index: -1;
    }

    .modal-combat_legend-game .roll-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 800;
        background: radial-gradient(130% 80% at 80% 50%, rgba(255, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(255deg, rgba(255, 0, 0, 0.05) 0%, rgba(0, 170, 109, 0.05) 100%);
        clip-path: polygon(4px 0, calc(100% - 4px) 0, 100% 25%, 100% 75%, calc(100% - 4px) 100%, 4px 100%, 0 75%, 0 25%);
    }

    @media only screen and (max-width: 510px) {

        .combat_legend-game-winner {
            width: 100%;
        }

        .combat_legend-game-winner .winner-placeholder,
        .combat_legend-game-winner .winner-content {
            width: 100%;
        }

    }   
</style>
