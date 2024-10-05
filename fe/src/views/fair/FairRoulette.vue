<template>
    <div class="fair-roulette">
        <div class="roulette-title">Roulette Technical Details</div>
        <div class="roulette-text">
            <p>Our system generates the result for each game by using the SHA-256 hash of 3 separate
                inputs:</p>
            <p><span>1 - Game ID</span> The games unique identifier which is
                generated when the game is created.</p>
            <p><span>2 - Server Seed</span> Is a cryptographically secure
                pseudo-randomly generated string.</p>
            <p><span>3 - Public Seed</span> Is the id of an EOS Block found after
                the game countdown ended.</p>
            <p>Players can replicate any past roll by using the node.js code below. Please note that
                you should use the <span class="text-unhashed">unhashed</span>(not <span>hashed</span>) server seed with
                this script.</p>
        </div>
        <div class="roulette-code">
            <pre>                <code >
const crypto = require('crypto');

const gameId = '6443aa99f4290f71b555f4bd';
const serverSeed = '4c60603de55e3b85fe67450aa124ec34509cb73b0f1fde15';
const publicSeed = '128b71e19b3c4bd9ec01eba9d6840bdda2a8d0972ac918c9d937c7f861879727';

// Get game outcome
let outcome = fairGetOutcome();

// Log game outcome in console
console.log(outcome);

const fairGetOutcome = () =&gt; {
    const combined = `${gameId}-${serverSeed}-${publicSeed}`;
    const hash = crypto.createHash('sha256').update(combined).digest('hex');
    const outcome = Math.abs(parseInt(hash.substr(0, 8), 16)) % 15;

    return outcome;
}
                </code>
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FairRoulette'
}
</script>

<style scoped>
.fair-roulette {
    width: 100%
}

.fair-roulette .roulette-title {
    font-size: 18px;
    font-weight: 600;
    color: #a7a3ad
}

.fair-roulette .roulette-text {
    width: 100%;
    margin-top: 8px
}

.fair-roulette .roulette-text p {
    font-size: 14px;
    font-weight: 500;
    color: #fff
}

.fair-roulette .roulette-text p span {
    color: #fd3b31
}

.fair-roulette .roulette-text p span.text-unhashed {
    color: #596076
}

.fair-roulette .roulette-code {
    width: 100%;
    margin-top: 20px;
    padding: 5px 0;
    border-radius: 8px;
    background: #1D1826;
    overflow-x: scroll
}

.fair-roulette .roulette-code::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #1c2029
}

.fair-roulette .roulette-code::-webkit-scrollbar {
    width: 0;
    height: 8px
}

.fair-roulette .roulette-code::-webkit-scrollbar-track {
    background: transparent
}

.fair-roulette .roulette-code pre {
    margin: 0;
    padding: 0 20px
}

.fair-roulette .roulette-code pre code {
    color: #b6b1be
}
</style>