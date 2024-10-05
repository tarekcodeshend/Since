<template>
    <div class="fair-overview">
        <div class="overview-info">
            <div class="info-title">How it works</div>
            <div class="info-text">
                <p>The game results have been generated before you even place your bet, and
                    most importantly, we can prove it.</p>
                <p>Before each game, we actually give you the game result in a hashed format.
                </p>
                <p>Before you start the game, we give you the hash of the server seed and the
                    public seed which the round result is based on. After the game is finished, we publish the
                    server seed, which you can then compare to the hash to make sure that they match. With this
                    system we can prove that the results were fair and pre-generated.</p>
            </div>
        </div>
        <div class="fair-seeds">
            <div class="seeds-client">
                <div class="client-title">The Client Seed</div>
                <div class="client-text">
                    <p>This is a string that is determined by the player. The client seed can
                        be edited and changed at any time regularly by yourself.</p>
                </div>
                <div class="client-input">
                    <input v-if="userSeedData.data !== null" type="text" placeholder="Enter personal client seed..."
                        v-model="modalClientSeed">
                    <input v-else type="text" placeholder="Enter personal client seed..." disabled="disabled">
                    <button v-on:click="seedCycleClient" v-bind:disabled="socketSendLoading === 'UserClientSeed'">
                        <transition name="fade" mode="out-in">
                            <ButtonLoading v-if="socketSendLoading === 'UserClientSeed'" />
                            <div v-else class="button-content">SET CLIENT SEED</div>
                        </transition>
                    </button>
                </div>
            </div>
            <div class="seeds-server">
                <div class="server-title">The Server Seed</div>
                <div class="server-text">
                    <p>This is a string that is cryptographically secure pseudo-randomly
                        generated. For every user a personal server seed will be generated. The sha256 hashed
                        version of the current server seed will be displayed at the provably fair page. When you
                        generate a new server seed the, the old one will be replaced with the new generated one
                        and the nonce will be reseted to one. After that you can verify all bets made with the
                        old server seed.</p>
                </div>
                <div class="server-input">
                    <input v-if="userSeedData.data !== null" v-model="userSeedData.data.seed.hash" type="text"
                        disabled="disabled">
                    <input v-else type="text" disabled="disabled">
                    <button v-on:click="seedCycleServer" v-bind:disabled="socketSendLoading === 'UserServerSeed'">
                        <transition name="fade" mode="out-in">
                            <ButtonLoading v-if="socketSendLoading === 'UserServerSeed'" />
                            <div v-else class="button-content">REGENERATE</div>
                        </transition>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonLoading from '@/components/ButtonLoading';

export default {
    name: 'FairOverView',
    components: {
        ButtonLoading
    },
    data() {
        return {
            modalClientSeed: null
        }
    },
    methods: {
        ...mapActions([
            'notificationShow',
            'userGetSeedSocket',
            'userSendClientSeedSocket',
            'userSendServerSeedSocket'
        ]),
        seedCycleClient() {
            const data = { seedClient: this.modalClientSeed.trim() };
            this.userSendClientSeedSocket(data);
        },
        seedCycleServer() {
            const data = {};
            this.userSendServerSeedSocket(data);
        },
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'userSeedData',
        ]),
    },
    watch: {
        'userSeedData': {
            deep: true,
            handler() {
                if (this.userSeedData.loading === false && this.userSeedData.data !== null) {
                    this.modalClientSeed = this.userSeedData.data.seed.seedClient;
                }
            }
        }
    },
    created() {
        if (this.userSeedData.loading === false) {
            if (this.userSeedData.data === null) {
                const data = {};
                this.userGetSeedSocket(data);
            } else { this.modalClientSeed = this.userSeedData.data.seed.seedClient; }
        }
    }
}
</script>

<style scoped0>
.fair-overview {
    width: 100%;
    display: flex
}

.fair-seeds {
    width: 600px
}

.fair-seeds .seeds-client,
.fair-seeds .seeds-server {
    width: 100%
}

.fair-seeds .client-title,
.fair-seeds .server-title {
    font-size: 18px;
    font-weight: 600;
    color: #a7a3ad
}

.fair-seeds .server-title {
    margin-top: 35px
}

.fair-seeds .client-text,
.fair-seeds .server-text {
    width: 100%;
    margin-top: 8px
}

.fair-seeds .client-text p,
.fair-seeds .server-text p {
    font-size: 14px;
    font-weight: 500;
    color: #fff
}

.fair-seeds .client-input,
.fair-seeds .server-input {
    width: 100%;
    position: relative;
    margin-top: 12px
}

.fair-seeds .client-input input,
.fair-seeds .server-input input {
    width: 100%;
    height: 54px;
    padding: 0 153px 0 17px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: #181420;
    border: 1px solid #1f1b29
}

.fair-seeds .client-input input::-moz-placeholder,
.fair-seeds .server-input input::-moz-placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #596076
}

.fair-seeds .client-input input::placeholder,
.fair-seeds .server-input input::placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #596076
}

.fair-seeds .client-input button,
.fair-seeds .server-input button {
    width: 136px;
    height: 41px;
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #fd3b31;
    border-bottom: 2px solid #97302b
}

.fair-seeds .client-input button:hover, .fair-seeds .server-input button:hover {
    background: #fe524a
}

.fair-seeds .client-input button .button-loading,
.fair-seeds .server-input button .button-loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
}

.fair-seeds .client-input button .button-loading svg,
.fair-seeds .server-input button .button-loading svg {
    font-size: 16px
}

.fair-seeds .client-input button .button-loading.fade-leave-active,
.fair-seeds .server-input button .button-loading.fade-leave-active {
    transition: opacity .5s
}

.fair-seeds .client-input button .button-loading.fade-leave-to,
.fair-seeds .server-input button .button-loading.fade-leave-to {
    opacity: 0
}

.fair-seeds .client-input button .button-content.fade-enter-active,
.fair-seeds .server-input button .button-content.fade-enter-active {
    transition: opacity .5s
}

.fair-seeds .client-input button .button-content.fade-enter-from,
.fair-seeds .server-input button .button-content.fade-enter-from {
    opacity: 0
}

@media only screen and (max-width: 1200px) {
    .fair-seeds {
        width: 100%;
        margin-top: 50px
    }
}


.fair .overview-info {
    width: calc(100% - 600px);
    padding-right: 75px
}

.fair-overview .info-title {
    font-size: 18px;
    font-weight: 600;
    color: #a7a3ad
}

.fair-overview .info-text {
    width: 100%;
    margin-top: 8px
}

.fair-overview .info-text p {
    font-size: 14px;
    font-weight: 500;
    color: #fff
}

@media only screen and (max-width: 1200px) {
    .fair-overview {
        flex-direction: column
    }

    .fair-overview .overview-info {
        width: 100%;
        padding-right: 0
    }
}
</style>