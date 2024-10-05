<template>
    <div class="profile-bets-element">
        <div class="element-section section-type">
            <div class="section-title">TYPE</div>
            <div class="section-content"> {{ getBetType }} </div>
        </div>
        <div class="element-section section-amount">
            <div class="section-title">AMOUNT</div>
            <div class="section-content">
                <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                <div class="amount-value">
                    <span>{{ profileFormatValue(bet.payout -
                        profileGetAmount).split('.')[0] }}</span>.{{ profileFormatValue(bet.payout -
                            profileGetAmount).split('.')[1] }}
                </div>
            </div>
        </div>
        <div class="element-section section-date">
            <div class="section-title">DATE</div>
            <div class="section-content"> {{ new Date(bet.createdAt).toLocaleString('en-US', {
                hour12: true, year:
                    'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
            }) }}</div>
        </div>
        <div class="element-section section-bet">
            <div class="section-title">BET ID</div>
            <div class="section-content"> {{ bet._id }} </div>
        </div>
        <div class="element-section section-actions">
            <div class="section-title">ACTIONS</div>
            <div class="section-content">
                <button v-on:click="profileVerifyButton()" class="button-verify">VERIFY</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'ProfileGamesElement',
    props: ['bet'],
    methods: {
        ...mapActions([
            'modalsSetData',
            'modalsSetShow'
        ]),
        profileFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        profileVerifyButton() {
            this.modalsSetData({ game: (['towers', 'mines', 'unbox', 'plinko', 'upgrader'].includes(this.bet.method) === true ? this.bet : this.bet.game) });
            this.modalsSetShow('FairGame');
        }
    },
    computed: {
        profileGetAmount() {
            let amount = this.bet.amount;

            if (this.bet.method === 'blackjack') {
                amount = Math.floor(this.bet.amount.main + this.bet.amount.sideLeft + this.bet.amount.sideRight);
                if (this.bet.actions.includes('split') === true) { amount = Math.floor(amount + this.bet.amount.main); }
            }

            return amount;
        },
        getBetType() {
            let method = this.bet.method.charAt(0).toUpperCase() + this.bet.method.slice(1)
            if (this.bet.method === 'duels') {
                method = 'Dice Duels';
            }
            else if (this.bet.method === 'roll') {
                method = 'Roulette';
            }
            else if (this.bet.method === 'battles') {
                method = 'Case Battles';
            }
            else if (this.bet.method === 'unbox') {
                method = 'Case Opening';
            }

            return method;
        }
    }
}
</script>

<style scoped>
.profile-bets-element {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px
}

.profile-bets-element:nth-child(odd) {
    border-radius: 8px;
    background: #1e1927
}

.profile-bets-element .element-section {
    display: flex;
    flex-direction: column
}

.profile-bets-element .element-section.section-bet,
.profile-bets-element .element-section.section-date,
.profile-bets-element .element-section.section-type {
    width: 25%
}

.profile-bets-element .element-section.section-amount {
    width: 15%
}

.profile-bets-element .element-section.section-actions {
    width: 10%
}

.profile-bets-element .section-title {
    display: none;
    font-size: 12px;
    font-weight: 700;
    color: #767c8b
}

.profile-bets-element .section-content {
    display: flex;
    align-items: center
}

.profile-bets-element .element-section.section-bet .section-content,
.profile-bets-element .element-section.section-date .section-content,
.profile-bets-element .element-section.section-type .section-content {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

/* .profile-bets-element .element-section.section-date .section-content,
.profile-bets-element .element-section.section-type .section-content {
    text-transform: uppercase
} */

.profile-bets-element .element-section.section-actions .section-content {
    justify-content: flex-end
}

.profile-bets-element .section-content img {
    width:17px;
    margin-right: 10px
}

.profile-bets-element .amount-value {
    font-size: 12px;
    font-weight: 700;
    color: #00c74d
}

.profile-bets-element .amount-value.value-negative {
    color: #fd3b31
}

.profile-bets-element .amount-value span {
    font-size: 15px;
    font-weight: 700
}

.profile-bets-element .section-content button.button-verify {
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 12px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 700;
    color: #767c8b;
    background: #211b2b;
    box-shadow: 0 2px 0 0 #181420
}

.profile-bets-element .section-content button.button-verify:hover {
    color: #fff
}

@media only screen and (max-width: 1300px) {
    .profile-bets-element {
        height: auto;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 20px
    }

    .profile-bets-element .element-section {
        width: 100% !important;
        margin-top: 10px
    }

    .profile-bets-element .element-section.section-type {
        margin-top: 0
    }

    .profile-bets-element .element-section.section-actions {
        align-items: flex-start
    }

    .profile-bets-element .section-title {
        display: block
    }

    .profile-bets-element .section-content {
        margin-top: 5px
    }
}
</style>
