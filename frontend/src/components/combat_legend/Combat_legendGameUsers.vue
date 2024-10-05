<template>
    <div class="combat_legend-game-users">
        <div class="users-header">
            <div class="header-user">USER</div>
            <div class="header-roll">ROLL</div>
        </div>
        <div class="users-content">
            <div class="content-list">

                <Combat_legendUserElement v-for="index in combat_legendGame.playerCount" v-bind:key="index" v-bind:combat_legendGame="combat_legendGame" v-bind:index="index" v-bind:bet="combat_legendGame.bets[index - 1]" v-bind:id="'element-' + index" />

            </div>
        </div>
    </div>
</template>

<script>
    import Combat_legendUserElement from '@/components/combat_legend/Combat_legendUserElement';

    export default {
        name: 'Combat_legendGameUsers',
        components: {
            Combat_legendUserElement
        },
        props: [
            'combat_legendGame'
        ],
        watch: {
            'combat_legendGame': {
                deep: true,
                handler() {
                    if(this.combat_legendGame.state === 'rolling') {
                        const index = this.combat_legendGame.bets.filter((element) => element.roll !== undefined).length;
                        document.getElementById('element-' + index).scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .combat_legend-game-users {
        width: 300px;
        position: absolute;
        top: 13px;
        bottom: 13px;
        right: 13px;
        padding: 20px 11px 0px 11px;
        border-radius: 8px;
        background: radial-gradient(125% 50% at 50% 50%, rgba(8, 45, 78, 0.5) 0%, rgba(5, 30, 52, 0.5) 100%);
        border: 1px solid #0b3354;
    }

    .combat_legend-game-users .users-header {
        display: flex;
        align-items: center;
    }

    .combat_legend-game-users .header-user {
        width: calc(100% - 70px);
        font-size: 13px;
        font-weight: 700;
        color: #7a93ac;
    }

    .combat_legend-game-users .header-roll {
        width: 70px;
        font-size: 13px;
        font-weight: 700;
        color: #7a93ac;
    }

    .combat_legend-game-users .users-content {
        height: calc(100% - 33px);
        position: relative;
        margin-top: 15px;
    }

    .combat_legend-game-users .users-content::after {
        content: '';
        width: 100%;
        height: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(0, 25, 46, 0) 0%, rgba(0, 25, 46, 0.8) 100%);
    }

    .combat_legend-game-users .content-list {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        padding-bottom: 5px;
    }

    @media only screen and (max-width: 1050px) {

        .combat_legend-game-users {
            width: auto;
            height: 300px;
            top: initial;
            left: 13px;
        }

    }
</style>
