<template>
    <div class="combat_legend-game-fair">
        <div class="fair-hash">
            <span>SERVER SEED HASH:</span>
            {{combat_legendGame.fair.hash}}
        </div>
        <div v-if="combat_legendGame.state === 'completed'" class="fair-server">
            <span>SERVER SEED:</span>
            {{combat_legendGame.fair.seedServer}}
        </div>
        <div v-if="combat_legendGame.state === 'completed'" class="fair-public">
            <span>PUBLIC SEED:</span>
            {{combat_legendGame.fair.seedPublic}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Combat_legendGameFair',
        props: [
            'combat_legendGame'
        ]
    }
</script>

<style scoped>
    .combat_legend-game-fair {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 45px;
    }

    .combat_legend-game-fair .fair-hash,
    .combat_legend-game-fair .fair-server,
    .combat_legend-game-fair .fair-public {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        -ms-word-break: break-all;
        word-break: break-word;
        font-size: 14px;
        font-weight: 600;
        color: #5e768e;
    }

    .combat_legend-game-fair .fair-server,
    .combat_legend-game-fair .fair-public {
        margin-top: 20px;
    }

    .combat_legend-game-fair .fair-hash span,
    .combat_legend-game-fair .fair-server span,
    .combat_legend-game-fair .fair-public span {
        font-weight: 800;
        color: #7a93ac;
    }
</style>
