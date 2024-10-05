<template>
    <div class="combat_legend">

        <Combat_legendControls />
        <Combat_legendStats />
        <Combat_legendGames />
        <Bets />

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Bets from '@/components/bets/Bets';
    import Combat_legendControls from '@/components/combat_legend/Combat_legendControls';
    import Combat_legendStats from '@/components/combat_legend/Combat_legendStats';
    import Combat_legendGames from '@/components/combat_legend/Combat_legendGames';

    export default {
        name: 'Combat_legend',
        metaInfo: {
            title: 'Dice Combat_legend - BLOXFlame.com'
        },
        components: {
            Bets,
            Combat_legendControls,
            Combat_legendStats,
            Combat_legendGames
        },
        methods: {
            ...mapActions([
                'socketConnectCombat_legend', 
                'socketDisconnectCombat_legend',
                'combat_legendGetGameDataSocket',
                'modalsSetShow'
            ])
        },
        computed: {
            ...mapGetters([
                'socketCombat_legend'
            ])
        },
        watch: {
            'socketCombat_legend.connected': {
                handler() {
                    if(this.socketCombat_legend.connected && this.$route.query.game !== undefined) {
                        const data = { gameId: this.$route.query.game };
                        this.combat_legendGetGameDataSocket(data);

                        this.modalsSetShow('Combat_legendGame');
                    }
                }
            }
        },
        created() {
            this.socketConnectCombat_legend();
        },
        beforeRouteUpdate(to, from) {
            if(this.socketCombat_legend.connected && this.$route.query.game !== undefined) {
                const data = { gameId: this.$route.query.game };
                this.combat_legendGetGameDataSocket(data);

                this.modalsSetShow('Combat_legendGame');
            }
        },
        beforeRouteLeave(to, from, next) {
            this.socketDisconnectCombat_legend();
            next();
        }
    }
</script>

<style scoped>
    .combat_legend {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 45px 10px;
    }

    @media only screen and (max-width: 1150px) {

        .combat_legend {
            padding: 25px 10px 45px 10px;
        }

    }

    @media only screen and (max-width: 950px) {

        .combat_legend {
            padding: 25px 10px 443px 10px;
        }

    }
</style>
