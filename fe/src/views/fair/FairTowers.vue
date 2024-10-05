<template>
    <div class="fair-towers">
        <div class="towers-title">Towers Technical Details</div>
        <div class="towers-text">
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
        <div class="towers-code">
            <pre>                
                <code >
const crypto = require('crypto');
const ChanceJs = require('chance');

const serverSeed = '4c60603de55e3b85fe67450aa124ec34509cb73b0f1fde15';
const nonce = 1;
const clientSeed = 'customClientSeed';

// Generate and shuffle deck
let deck = fairGenerateDeck('easy');
deck = fairShuffleDeck(deck);

// Log deck in console
console.log(deck.reverse().toString());

const fairShuffleDeck = (deck) =&gt; {
    const combined = `${serverSeed}-${nonce}-${clientSeed}`;
    let shuffled = [];

    for(let rowIndex = 0; rowIndex &lt; 8; rowIndex++) {
        const hash = crypto.createHash('sha256').update(`${combined}-${rowIndex}`).digest('hex');

        const chance = new ChanceJs(hash);
        const shuffledRow = chance.shuffle(deck[rowIndex]);
        shuffled.push(shuffledRow);
    }

    return shuffled;
}

const fairGenerateDeck = (risk) =&gt; {
    let deck = [];

    for(let rowIndex = 0; rowIndex &lt; 8; rowIndex++) {
        const tilesPerRow = risk === 'medium' ? 2 : 3;
        const losePerRow = risk === 'hard' ? 2 : 1;

        deck[rowIndex] = [];
        for(let tileIndex = 0; tileIndex &lt; tilesPerRow; tileIndex++) {
            if(tileIndex &lt; losePerRow) {
                deck[rowIndex].push('lose');
            } else {
                deck[rowIndex].push('coin');
            }
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
    name: 'FairTowers'
}
</script>

<style scoped>
.fair-towers {
    width: 100%
}

.fair-towers .towers-title {
    font-size: 18px;
    font-weight: 600;
    color: #a7a3ad
}

.fair-towers .towers-text {
    width: 100%;
    margin-top: 8px
}

.fair-towers .towers-text p {
    font-size: 14px;
    font-weight: 500;
    color: #fff
}

.fair-towers .towers-text p span {
    color: #fd3b31
}

.fair-towers .towers-text p span.text-unhashed {
    color: #596076
}

.fair-towers .towers-code {
    width: 100%;
    margin-top: 20px;
    padding: 5px 0;
    border-radius: 8px;
    background: #1D1826;
    overflow-x: scroll
}

.fair-towers .towers-code::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #1c2029
}

.fair-towers .towers-code::-webkit-scrollbar {
    width: 0;
    height: 8px
}

.fair-towers .towers-code::-webkit-scrollbar-track {
    background: transparent
}

.fair-towers .towers-code pre {
    margin: 0;
    padding: 0 20px
}

.fair-towers .towers-code pre code {
    color: #b6b1be
}
</style>