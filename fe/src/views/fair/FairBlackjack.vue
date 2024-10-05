<template>
    <div class="fair-blackjack">
        <div class="blackjack-title">Blackjack Technical Details</div>
        <div class="blackjack-text">
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
        <div class="blackjack-code">
            <pre>                <code >
const crypto = require('crypto');
const ChanceJs = require('chance');

const cardRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const cardSuits = ['heart', 'spade', 'diamond', 'club'];

const deckCount = 8;
const serverSeed = '4c60603de55e3b85fe67450aa124ec34509cb73b0f1fde15';
const nonce = 1;
const clientSeed = 'customClientSeed';

// Generate and shuffle deck
let deck = fairGenerateDeck();
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

const fairGenerateDeck = () =&gt; {
    let deck = [];

    for(let d =  0; d &lt; deckCount; d++) {
        for(let s = 0; s &lt; cardSuits.length; s++) {
            for(let r = 0; r &lt; cardRanks.length; r++) {
                deck.push({ rank: cardRanks[r], suit: cardSuits[s] });
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
    name: 'FairBlackjack'
}
</script>

<style scoped>
.fair-blackjack {
    width: 100%
}

.fair-blackjack .blackjack-title {
    font-size: 18px;
    font-weight: 600;
    color: #a7a3ad
}

.fair-blackjack .blackjack-text {
    width: 100%;
    margin-top: 8px
}

.fair-blackjack .blackjack-text p {
    font-size: 14px;
    font-weight: 500;
    color: #fff
}

.fair-blackjack .blackjack-text p span {
    color: #fd3b31
}

.fair-blackjack .blackjack-text p span.text-unhashed {
    color: #596076
}

.fair-blackjack .blackjack-code {
    width: 100%;
    margin-top: 20px;
    padding: 5px 0;
    border-radius: 8px;
    background: #1D1826;
    overflow-x: scroll
}

.fair-blackjack .blackjack-code::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #1c2029
}

.fair-blackjack .blackjack-code::-webkit-scrollbar {
    width: 0;
    height: 8px
}

.fair-blackjack .blackjack-code::-webkit-scrollbar-track {
    background: transparent
}

.fair-blackjack .blackjack-code pre {
    margin: 0;
    padding: 0 20px
}

.fair-blackjack .blackjack-code pre code {
    color: #b6b1be
}
</style>