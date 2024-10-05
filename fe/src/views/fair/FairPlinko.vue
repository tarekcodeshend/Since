<template>
    <div class="fair-plinko">
        <div class="plinko-title">Plinko Technical Details</div>
        <div class="plinko-text">
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
        <div class="plinko-code">
            <pre>                <code >
const crypto = require('crypto');
const ChanceJs = require('chance');

const serverSeed = '4c60603de55e3b85fe67450aa124ec34509cb73b0f1fde15';
const nonce = 1;
const clientSeed = 'customClientSeed';

const rows = 8;
const risk = 'low';

// Generate deck and log to console
const deck = fairGenerateDeck(rows + 1);
console.log(deck.toString());

// Get winning ticket and log to console
const ticket = fairGetTicket();
console.log(ticket);

const fairGetTicket = () =&gt; {
    const combined = `${serverSeed}-${nonce}-${clientSeed}`;
    const hash = crypto.createHash('sha256').update(combined).digest('hex');

    const chance = new ChanceJs(hash);
    const ticket = chance.integer({ min: 1, max: deck.reduce((a, b) =&gt; a + b, 0) });

    return ticket;
}

const fairGenerateDeck = (rows, risk) =&gt; {
    let deck = [[1], [1, 1]];

    for(let r = 2; r &lt; rows; r++) {
        let previousRow = deck[r - 1];
        let newRow = [1];

        for(let v = 0; v &lt; previousRow.length - 1; v++) {
            newRow.push(previousRow[v] + previousRow[v+1]);
        }

        newRow.push(1);
        deck.push(newRow);
    }

    return deck[deck.length - 1];
}
                </code>
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FairPlinko'
}
</script>

<style scoped>
.fair-plinko {
    width: 100%
}

.fair-plinko .plinko-title {
    font-size: 18px;
    font-weight: 600;
    color: #a7a3ad
}

.fair-plinko .plinko-text {
    width: 100%;
    margin-top: 8px
}

.fair-plinko .plinko-text p {
    font-size: 14px;
    font-weight: 500;
    color: #fff
}

.fair-plinko .plinko-text p span {
    color: #fd3b31
}

.fair-plinko .plinko-text p span.text-unhashed {
    color: #596076
}

.fair-plinko .plinko-code {
    width: 100%;
    margin-top: 20px;
    padding: 5px 0;
    border-radius: 8px;
    background: #1D1826;
    overflow-x: scroll
}

.fair-plinko .plinko-code::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #1c2029
}

.fair-plinko .plinko-code::-webkit-scrollbar {
    width: 0;
    height: 8px
}

.fair-plinko .plinko-code::-webkit-scrollbar-track {
    background: transparent
}

.fair-plinko .plinko-code pre {
    margin: 0;
    padding: 0 20px
}

.fair-plinko .plinko-code pre code {
    color: #b6b1be
}
</style>