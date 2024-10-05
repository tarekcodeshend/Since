<template>
    <div class="fair-battles">
        <div class="battles-title">Battles Technical Details</div>
        <div class="battles-text">
            <p>Our system generates the result for each game by using the SHA-256 hash of 5 separate
                inputs:</p>
            <p><span>1 - Game ID</span> The games unique identifier which is
                generated when the game is created.</p>
            <p><span>2 - Server Seed</span> Is a cryptographically secure
                pseudo-randomly generated string.</p>
            <p><span>3 - Public Seed</span> Is the id of an EOS Block found after
                the last user joined the game.</p>
            <p><span>4 - Round</span> The game round number.</p>
            <p><span>5 - Player</span> The users game position.</p>
            <p>Players can replicate any past roll by using the node.js code below. Please note that
                you should use the <span class="text-unhashed">unhashed</span>(not <span>hashed</span>) server seed with
                this script.</p>
        </div>
        <div class="battles-code">
            <pre>                <code >
const crypto = require('crypto');

const roundCount = '2';
const playerCount = '2';
const gameId = '6443aa99f4290f71b555f4bd';
const serverSeed = '4c60603de55e3b85fe67450aa124ec34509cb73b0f1fde15';
const publicSeed = '128b71e19b3c4bd9ec01eba9d6840bdda2a8d0972ac918c9d937c7f861879727';

const fairGetBattlesOutcome = () =&gt; {
    for(round = 0; round &lt; roundCount; round++) {
        for(player = 0; player &lt; playerCount; player++) {
            const combined = `${gameId}-${serverSeed}-${publicSeed}-${round}-${player}`;
            const hash = crypto.createHash('sha256').update(combined).digest('hex');
            const outcome = parseInt(hash.substr(0, 8), 16) % 10000;

            console.log(`Round: ${round + 1} - Player: ${player + 1} - Outcome: ${outcome}`);
        }
    }
}

fairGetBattlesOutcome();
                </code>
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FairBattles'
}
</script>

<style scoped>
.fair-battles {
    width: 100%
}

.fair-battles .battles-title {
    font-size: 18px;
    font-weight: 600;
    color: #a7a3ad
}

.fair-battles .battles-text {
    width: 100%;
    margin-top: 8px
}

.fair-battles .battles-text p {
    font-size: 14px;
    font-weight: 500;
    color: #fff
}

.fair-battles .battles-text p span {
    color: #fd3b31
}

.fair-battles .battles-text p span.text-unhashed {
    color: #596076
}

.fair-battles .battles-code {
    width: 100%;
    margin-top: 20px;
    padding: 5px 0;
    border-radius: 8px;
    background: #1D1826;
    overflow-x: scroll
}

.fair-battles .battles-code::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #1c2029
}

.fair-battles .battles-code::-webkit-scrollbar {
    width: 0;
    height: 8px
}

.fair-battles .battles-code::-webkit-scrollbar-track {
    background: transparent
}

.fair-battles .battles-code pre {
    margin: 0;
    padding: 0 20px
}

.fair-battles .battles-code pre code {
    color: #b6b1be
}
</style>