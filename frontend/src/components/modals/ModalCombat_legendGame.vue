<template>
    <div class="modal-combat_legend-game">
        <div v-if="combat_legendGameData.loading !== true && combat_legendGameData.game !== null" class="game-content">
            <Combat_legendGameHeader v-bind:combat_legendGame="combat_legendGame" />
            <Combat_legendGameStats v-bind:combat_legendGame="combat_legendGame" />
            <Combat_legendGameRoller v-bind:combat_legendGame="combat_legendGame" />
            <Combat_legendGameWinner v-bind:combat_legendGame="combat_legendGame" />
            <!-- <Combat_legendGameFair v-bind:combat_legendGame="combat_legendGame" /> -->
        </div>
        <Combat_legendGameUsers v-if="combat_legendGameData.loading !== true && combat_legendGameData.game !== null" v-bind:combat_legendGame="combat_legendGame" />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Combat_legendGameHeader from '@/components/combat_legend/Combat_legendGameHeader';
    import Combat_legendGameStats from '@/components/combat_legend/Combat_legendGameStats';
    import Combat_legendGameRoller from '@/components/combat_legend/Combat_legendGameRoller';
    import Combat_legendGameWinner from '@/components/combat_legend/Combat_legendGameWinner';
    import Combat_legendGameFair from '@/components/combat_legend/Combat_legendGameFair';
    import Combat_legendGameUsers from '@/components/combat_legend/Combat_legendGameUsers';

    export default {
        name: 'ModalCombat_legendGame',
        components: {
            Combat_legendGameHeader,
            Combat_legendGameStats,
            Combat_legendGameRoller,
            Combat_legendGameWinner,
            Combat_legendGameFair,
            Combat_legendGameUsers
        },
        data() {
            return {
                combat_legendGame: null
            }
        },
        methods: {
            combat_legendStartGame(step) {
                let game = JSON.parse(JSON.stringify(this.combat_legendGameData.game));

                for(let i = 0; i < this.combat_legendGameData.game.bets.length; i++) {
                    if(i > step) {
                        delete game.bets[i].roll;
                    }
                }

                if(step <= this.combat_legendGameData.game.bets.length - 1) {
                    delete game.winner;

                    const left = (new Date(this.combat_legendGameData.game.updatedAt).getTime() + this.generalTimeDiff) + (this.combat_legendFilterAnimation === 'fast' ? 3000 : 5000) * (step + 1) - (new Date().getTime() + this.generalTimeDiff);
                    setTimeout(() => { this.combat_legendStartGame(step + 1); }, left);
                }

                this.combat_legendGame = game;
            }
        },
        computed: {
            ...mapGetters([
                'generalTimeDiff',  
                'combat_legendFilterAnimation',
                'combat_legendGameData'
            ])
        },
        watch: {
            'combat_legendGameData': {
                deep: true,
                handler() {
                    if(this.combat_legendGameData.loading !== true && this.combat_legendGameData.game !== null) {
                        if(this.combat_legendGameData.game.state === 'rolling') {
                            this.combat_legendStartGame(0);
                        } else  {
                            this.combat_legendGame = this.combat_legendGameData.game;
                        }
                    }
                }
            }
        },
        created() {
            if(this.combat_legendGameData.loading !== true && this.combat_legendGameData.game !== null) {
                if(this.combat_legendGameData.game.state === 'rolling') {
                    let step = Math.floor(((new Date().getTime() + this.generalTimeDiff) - (new Date(this.combat_legendGameData.game.updatedAt).getTime() + this.generalTimeDiff)) / (this.combat_legendFilterAnimation === 'fast' ? 3000 : 5000));
                    step = step <= 0 ? 0 : step;

                    this.combat_legendStartGame(step);
                } else  {
                    this.combat_legendGame = this.combat_legendGameData.game;
                }
            }
        }
    }
</script>

<style scoped>
    .modal-combat_legend-game {
        width: 1210px;
        position: relative;
        display: flex;
        align-items: flex-start;
        padding: 12px;
        border-radius: 15px;
        background: radial-gradient(285% 150% at 50% 50%, #001e37 0%, #6a1a1ae1a 100%);
        border: 1px solid #24435e;
        box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.5);
    }

    .modal-combat_legend-game .game-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 13px 325px 13px 13px;
    }

    @media only screen and (max-width: 1230px) {

        .modal-combat_legend-game {
            width: calc(100vw - 20px);
        }

    }

    @media only screen and (max-width: 1050px) {

        .modal-combat_legend-game .game-content {
            width: 100%;
            padding: 8px 0 325px 0;
        }

    }
</style>
