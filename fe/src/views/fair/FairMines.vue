<template>
    <div class="fair-mines">
        <div class="mines-title">Mines Technical Details</div>
        <div class="mines-text">
            <p>Our system generates the result for each game by using the SHA-256 hash of 3 separate
                inputs:</p>
            <p><span>1 - Server Seed</span> Is a cryptographically secure
                pseudo-randomly generated string.</p>
            <p><span>2 - Nonce</span> A number that is incremented with every user
                bet.</p>
            <p><span>3 - Client Seed</span> Can be changed by the user at any time
                before the user starts a new game.</p>
            <p>Players can replicate any past roll by using the node.js code below. Please note that
                you should use the <span class="text-unhashed">unhashed</span>(not <span>hashed</span>) server seed with
                this script.</p>
        </div>
        <div class="mines-code">
            <pre>                <code>
const crypto = require('crypto');
const ChanceJs = require('chance');

const serverSeed = '4c60603de55e3b85fe67450aa124ec34509cb73b0f1fde15';
const nonce = 1;
const clientSeed = 'customClientSeed';

// Generate and shuffle deck
let deck = fairGenerateMap();
deck = fairShuffleDeck(deck);

// Log deck in console
console.log(deck.toString());

const fairShuffleDeck = (deck) =&gt; {
    const combined = `${serverSeed}-${nonce}-${clientSeed}`;
    const hash = crypto.createHash('sha256').update(combined).digest('hex');

    const chance = new ChanceJs(hash);
    deck = chance.shuffle(deck);

    return deck;
}

const fairGenerateMap = (minesCount) =&gt; {
    let deck = [];

    for(let i = 0; i &lt; 25; i++) {
        if(i &lt; minesCount) {
            deck.push('mine');
        } else {
            deck.push('coin');
        }
    }

    return deck;
}
                </code>
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FairMines'
}
</script>

<style scoped>
.fair-mines {
    width: 100%
}

.fair-mines .mines-title {
    font-size: 18px;
    font-weight: 600;
    color: #a7a3ad
}

.fair-mines .mines-text {
    width: 100%;
    margin-top: 8px
}

.fair-mines .mines-text p {
    font-size: 14px;
    font-weight: 500;
    color: #fff
}

.fair-mines .mines-text p span {
    color: #fd3b31
}

.fair-mines .mines-text p span.text-unhashed {
    color: #596076
}

.fair-mines .mines-code {
    width: 100%;
    margin-top: 20px;
    padding: 5px 0;
    border-radius: 8px;
    background: #1D1826;
    overflow-x: scroll
}

.fair-mines .mines-code::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #1c2029
}

.fair-mines .mines-code::-webkit-scrollbar {
    width: 0;
    height: 8px
}

.fair-mines .mines-code::-webkit-scrollbar-track {
    background: transparent
}

.fair-mines .mines-code pre {
    margin: 0;
    padding: 0 20px
}

.fair-mines .mines-code pre code {
    color: #b6b1be
}
</style>