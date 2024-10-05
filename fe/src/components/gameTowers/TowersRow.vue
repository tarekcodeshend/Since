<template>
    <div class="towers-row" v-bind:class="{
        'row-active': towersGame !== null && towersGame.state !== 'completed' && towersGame.revealed.length === row,
        'row-revealed': towersGame !== null && towersGame.revealed[row] !== undefined,
        'row-medium': towersRisk === 'medium'
    }">
        <transition v-for="tile in towersGetTilesCount" v-bind:key="tile" name="fade" mode="out-in">
            <button
                v-if="towersGame !== null && towersGame.revealed[row] !== undefined && towersGame.revealed[row].tile === (tile - 1) && towersGame.revealed[row].row[tile - 1] === 'coin'"
                class="row-button button-won">
                <div class="button-won">
                    <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                    <div class="won-amount">
                        <span>{{ towersFormatValue(towersGetRowCashout).split('.')[0] }}</span>.{{
                            towersFormatValue(towersGetRowCashout).split('.')[1] }}
                    </div>
                </div>
            </button>
            <button
                v-else-if="
                    towersGame !== null && towersGame.revealed[row] !== undefined && towersGame.revealed[row].tile === (tile - 1) && towersGame.revealed[row].row[tile - 1] === 'lose'"
                class="row-button button-lose">
                <div class="button-lose">
                    <img src="@/assets/img/bomb.ebef82db.webp" alt="bomb">
                </div>
            </button>
            <button
                v-else-if="
                    towersGame !== null && towersGame.state === 'completed' && (towersGame.revealed.length <= row || towersGame.revealed[row].tile !== (tile - 1)) && towersGame.deck[row][tile - 1] === 'lose'"
                class="row-button" disabled>
                <div class="button-lose">
                    <img src="@/assets/img/bomb.ebef82db.webp" alt="bomb">
                </div>
            </button>
            <button v-else v-on:click="towersRevealButton(tile - 1)" class="row-button"
                v-bind:disabled="socketSendLoading !== null || towersGame === null || towersGame.state === 'completed' || towersGame.revealed.length !== row">
                <div class="button-won">
                    <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                    <div class="won-amount">
                        <span>{{ towersFormatValue(towersGetRowCashout).split('.')[0] }}</span>.{{
                            towersFormatValue(towersGetRowCashout).split('.')[1] }}
                    </div>
                </div>
            </button>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import IconSkull from '@/components/icons/IconSkull';

export default {
    name: 'TowersRow',
    components: {
        IconSkull
    },
    props: [
        'row'
    ],
    methods: {
        ...mapActions([
            'towersSendRevealSocket'
        ]),
        towersFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        towersRevealButton(tile) {
            const data = { tile: tile };
            this.towersSendRevealSocket(data);
        }
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'towersRisk',
            'towersGame',
            'towersBetAmount'
        ]),
        towersGetTilesCount() {
            let count = 3;

            if ((this.towersGame !== null && this.towersGame.state !== 'completed' ? this.towersGame.risk : this.towersRisk) === 'medium') {
                return 2;
            }

            return count;
        },
        towersGetRowCashout() {
            const multiplierPerRow = this.towersRisk === 'easy' ? 1.425 : this.towersRisk === 'medium' ? 1.90 : 2.85;
            const amount = this.towersBetAmount; //this.towersGame !== null ? this.towersGame.amount : 0;
            return Math.floor(amount * Math.pow(multiplierPerRow, this.row + 1));
        }
    }
}
</script>

<style scoped>
.towers-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center
}

.towers-row button.row-button {
    width: calc(33.33% - 12px);
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #292137;
    border-bottom: 2px solid #3d3055
}

.towers-row.row-medium button.row-button {
    width: calc(50% - 8px)
}

.towers-row button.row-button:disabled {
    cursor: not-allowed;
    opacity: .4
}

.towers-row.row-active button.row-button {
    opacity: 1
}

.towers-row.row-revealed button.row-button {
    opacity: .12
}

.towers-row button.row-button.button-won {
    background: #5e4a0f;
    border: 1px solid #D4AF3C;
    opacity: 1
}

.towers-row button.row-button.button-lose {
    background: rgba(253, 59, 49, .12);
    border: 1px solid #fd3b31;
    opacity: 1
}

.towers-row button.row-button .button-lose,
.towers-row button.row-button .button-won {
    display: flex;
    align-items: center
}

.towers-row .button-won img {
    width: 18px;
    margin-right: 12px
}

.towers-row .won-amount {
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.towers-row .won-amount span {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.towers-row button.row-button .button-lose img {
    width: 28px
}

@media only screen and (max-width: 1100px) {
    .towers-row button.row-button {
        height: 41px
    }
}

@media only screen and (max-width: 640px) {
    .towers-row button.row-button {
        width: calc(33.33% - 12px);
        height: 32px;
    }

    .towers-row .button-won img {
        width: 16px;
        height: 16px;
        margin-right: 7px
    }

    .towers-row .won-amount {
        font-size: 9px;
        font-weight: 700;
        color: #bbb
    }

    .towers-row .won-amount span {
        font-size: 12px;
        font-weight: 700;
        color: #fff
    }
}
</style>
