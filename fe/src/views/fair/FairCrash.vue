<template>
    <div class="fair-crash">
        <div class="crash-title">Crash Technical Details</div>
        <div class="crash-text">
            <p>Our system generates the result for each game by using the SHA-256 hash of 3 separate inputs:</p>
            <p><span>1 - Game ID</span> The games unique identifier which is generated when the game is created.</p>
            <p><span>2 - Server Seed</span> Is a list of hashed which is generated from one genesis seed.</p>           
            <p><span>3 - Client Seed</span> Can be changed by the user at any time before the user starts a new game.</p>           
        </div>
        <div class="crash-code">
            <pre>                
            <code>
const crypto = require('crypto');

const gameId = '6443aa99f4290f71b555f4bd';
const serverSeed = '4c60603de55e3b85fe67450aa124ec34509cb73b0f1fde15';

const divisible = (hash, mod) => {
    let val = 0;

    let o = hash.length % 4;
    for (let i = o > 0 ? o - 4 : 0; i < hash.length; i += 4) {
        val = ((val << 16) + parseInt(hash.substring(i, i + 4), 16)) % mod;
    }

    return val === 0;
}

const fairGetCrashOutcome = () => {
    const combined = `${gameId}-${serverSeed}`;
    const hash = crypto.createHash('sha256').update(combined).digest('hex');

    const mod = parseInt(100 / (0.05 * 100));
    if(divisible(hash, mod) === true) {
        return 100;
    }

    const h = parseInt(hash.slice(0, 52 / 4), 16);
    const e = Math.pow(2, 52);
    const roll = Math.floor((100 * e - h) / (e - h));

    console.log(`Outcome: ${roll}`);
}

fairGetCrashOutcome();
                
                </code>
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FairCrash'
}
</script>

<style scoped>
.fair-crash {
    width: 100%
}

.fair-crash .crash-title {
    font-size: 18px;
    font-weight: 600;
    color: #a7a3ad
}

.fair-crash .crash-text {
    width: 100%;
    margin-top: 8px
}

.fair-crash .crash-text p {
    font-size: 14px;
    font-weight: 500;
    color: #fff
}

.fair-crash .crash-text p span {
    color: #fd3b31
}

.fair-crash .crash-text p span.text-unhashed {
    color: #596076
}

.fair-crash .crash-code {
    width: 100%;
    margin-top: 20px;
    padding: 5px 0;
    border-radius: 8px;
    background: #1D1826;
    overflow-x: scroll
}

.fair-crash .crash-code::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #1c2029
}

.fair-crash .crash-code::-webkit-scrollbar {
    width: 0;
    height: 8px
}

.fair-crash .crash-code::-webkit-scrollbar-track {
    background: transparent
}

.fair-crash .crash-code pre {
    margin: 0;
    padding: 0 20px
}

.fair-crash .crash-code pre code {
    color: #b6b1be
}
</style>