<template>
    <div class="fair-upgrader">
        <div class="upgrader-title">Upgrader Technical Details</div>
        <div class="upgrader-text">
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
        <div class="upgrader-code">
            <pre>                <code >
const crypto = require('crypto');
const ChanceJs = require('chance');

const serverSeed = '4c60603de55e3b85fe67450aa124ec34509cb73b0f1fde15';
const nonce = 1;
const clientSeed = 'customClientSeed';

// Get game outcome
const outcome = fairGetOutcome();

// Log game outcome in console
console.log(outcome);

const fairGetOutcome = () =&gt; {
    const combined = `${serverSeed}-${nonce}-${clientSeed}`;
    const hash = crypto.createHash('sha256').update(combined).digest('hex');

    const chance = new ChanceJs(hash);
    const outcome = chance.floating({ min: 0, max: 100, fixed: 2 });

    return outcome;
}
                </code>
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FairUpgrader'
}
</script>

<style scoped>
.fair-upgrader {
    width: 100%
}

.fair-upgrader .upgrader-title {
    font-size: 18px;
    font-weight: 600;
    color: #a7a3ad
}

.fair-upgrader .upgrader-text {
    width: 100%;
    margin-top: 8px
}

.fair-upgrader .upgrader-text p {
    font-size: 14px;
    font-weight: 500;
    color: #fff
}

.fair-upgrader .upgrader-text p span {
    color: #fd3b31
}

.fair-upgrader .upgrader-text p span.text-unhashed {
    color: #596076
}

.fair-upgrader .upgrader-code {
    width: 100%;
    margin-top: 20px;
    padding: 5px 0;
    border-radius: 8px;
    background: #1D1826;
    overflow-x: scroll
}

.fair-upgrader .upgrader-code::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #1c2029
}

.fair-upgrader .upgrader-code::-webkit-scrollbar {
    width: 0;
    height: 8px
}

.fair-upgrader .upgrader-code::-webkit-scrollbar-track {
    background: transparent
}

.fair-upgrader .upgrader-code pre {
    margin: 0;
    padding: 0 20px
}

.fair-upgrader .upgrader-code pre code {
    color: #b6b1be
}
</style>