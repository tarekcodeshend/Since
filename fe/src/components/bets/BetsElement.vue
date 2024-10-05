<template>
    <div class="bets-element">
        <div class="element-game">
            <IconCrash v-if="bet.method === 'crash'" />
            <IconRoll v-else-if="bet.method === 'roll'" />
            <IconBlackjack v-else-if="bet.method === 'blackjack'" />
            <IconDuels v-else-if="bet.method === 'duels'" />
            <IconMines v-else-if="bet.method === 'mines'" />
            <IconTowers v-else-if="bet.method === 'towers'" />
            <IconUnbox v-else-if="bet.method === 'unbox'" />
            <IconBattles v-else-if="bet.method === 'battles'" />
            <IconUpgrader v-else-if="bet.method === 'upgrader'" />
            <IconPlinko v-else-if="bet.method === 'plinko'" />
            <IconRoulette v-else-if="bet.method === 'roulette'" />
            <span style="color: #CABFDD">{{ betsGetMethod }}</span>
        </div>
        <div class="element-user">
            <AvatarImage v-bind:image="bet.user === null ? hiddenImage : bet.user.avatar" />
            <div class="user-info">
                <div v-if="bet.user !== null" v-html="bet.user.username" class="info-username"></div>
                <div v-else class="user-hidden">HIDDEN</div>
                <BoxLevel v-if="bet.user !== null && ['admin', 'mod', 'partner'].includes(bet.user.rank) === false"
                    v-bind:level="bet.user.level" v-bind:color="betsGetLevelColor" />
                <BoxRank v-else-if="bet.user !== null && betsGetRank !== null" v-bind:rank="betsGetRank" />
            </div>
        </div>
        <div class="element-time">
            <!-- <span>{{ betsGetDate[0] }},</span>{{ betsGetDate[1] }} -->
            {{ betsGetDate[1] }}
            <span class="time-text">TIME</span>
        </div>
        <div class="element-multiplier">
            <span>x{{ parseFloat(betsGetMultiplier).toFixed(2) }}</span>
            <span class="multiplier-text">MULTIPLIER</span>
        </div>
        <div class="element-bet">
            <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
            <div class="bet-amount">
                <span>{{ betsFormatValue(betsGetAmount).split('.')[0] }}</span>.{{
                    betsFormatValue(betsGetAmount).split('.')[1] }}
                <span class="amount-text">BET</span>
            </div>
        </div>
        <div class="element-payout">
            <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
            <div class="payout-amount" v-bind:class="{ 'payout-positive': (bet.payout / betsGetAmount) > 0 }">
                <span class="amount-value">{{ betsFormatValue(bet.payout).split('.')[0] }}</span>.{{
                    betsFormatValue(bet.payout).split('.')[1] }}
                <span class="amount-text"
                    v-bind:class="{ 'text-won': (bet.payout / betsGetAmount) > 1, 'text-lost': (bet.payout / betsGetAmount) <= 1 }">{{
                        (bet.payout / betsGetAmount) > 1 ? 'WON' : 'LOST' }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import AvatarImage from '@/components/AvatarImage';
import IconCrash from '@/components/icons/IconCrash';
import IconRoll from '@/components/icons/IconRoll';
import IconBlackjack from '@/components/icons/IconBlackjack';
import IconDuels from '@/components/icons/IconDuels';
import IconMines from '@/components/icons/IconMines';
import IconTowers from '@/components/icons/IconTowers';
import IconUnbox from '@/components/icons/IconUnbox';
import IconBattles from '@/components/icons/IconBattles';
import IconUpgrader from '@/components/icons/IconUpgrader';
import IconPlinko from '@/components/icons/IconPlinko';
import IconRoulette from '@/components/icons/IconRoulette';
import BoxLevel from '@/components/BoxLevel';
import BoxRank from '@/components/BoxRank';

export default {
    name: 'BetsElement',
    components: {
        AvatarImage,
        IconCrash,
        IconRoll,
        IconBlackjack,
        IconDuels,
        IconMines,
        IconTowers,
        IconUnbox,
        IconBattles,
        IconUpgrader,
        IconPlinko,
        IconRoulette,
        BoxLevel,
        BoxRank
    },
    props: [
        'bet'
    ],
    data() {
        return {
            hiddenImage: require(`@/assets/img/avatar/default.png`),
        }
    },
    methods: {
        betsFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
    },
    computed: {
        betsGetRank() {
            if (this.bet.user === null) return null;
            let rank = this.bet.user.rakeback;
            if (this.bet.user.rank !== 'user') { rank = this.bet.user.rank; }
            return rank;
        },
        betsGetLevelColor() {
            let color = '';

            if (this.bet.user === null) return '';

            if (this.bet.user.level >= 10 && this.bet.user.level < 20) { color = 'blue'; }
            else if (this.bet.user.level >= 20 && this.bet.user.level < 30) { color = 'green'; }
            else if (this.bet.user.level >= 30 && this.bet.user.level < 50) { color = 'yellow'; }
            else if (this.bet.user.level >= 50) { color = 'purple'; }

            return color;
        },
        betsGetMethod() {
            let method = this.bet.method.charAt(0).toUpperCase() + this.bet.method.slice(1);

            if (this.bet.method === 'duels') {
                method = 'Dice Duels';
            }
            else if (this.bet.method === 'roll') {
                method = 'Slide';
            }
            else if (this.bet.method === 'battles') {
                method = 'Case Battles';
            }
            else if (this.bet.method === 'unbox') {
                method = 'Case Opening';
            }

            return method;
        },
        betsGetDate() {
            let date = new Date(this.bet.updatedAt).toLocaleString('en-US', {
                hour12: true,
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            return date.split(',');
        },
        betsGetAmount() {
            let amount = this.bet.amount;

            if (this.bet.method === 'blackjack') {
                amount = Math.floor(this.bet.amount.main + this.bet.amount.sideLeft + this.bet.amount.sideRight);
                if (this.bet.actions.includes('split') === true) { amount = Math.floor(amount + this.bet.amount.main); }
            }

            return amount;
        },
        betsGetMultiplier() {
            let multiplier = this.bet.multiplier / 100;

            if (['crash', 'roll', 'upgrader', 'plinko', 'roulette'].includes(this.bet.method) === true) { multiplier = this.bet.payout / this.betsGetAmount; }
            return multiplier;
        }
    }
}
</script>

<style scoped>
.bets-element {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding-bottom: 18px;
    border-bottom: 2px solid #2B2339
}

.bets-element:first-of-type {
    margin-top: 0
}

.bets-element .element-game {
    width: 15%;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    color: #CABFDD;
    overflow: hidden;
}

.bets-element .element-game svg {
    width: 23px;
    height: 23px;
    margin-right: 12px;
    fill: #CABFDD
}

.bets-element .element-user {
    width: 25%;
    display: flex;
    align-items: center
}

.bets-element .element-user .avatar-image {
    width: 24px;
    height: 24px;
    margin-right: 6px;
    border-radius: 5px
}

.bets-element .user-info {
    display: flex;
    align-items: center
}

.bets-element .info-rank {
    height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    padding: 1px 5px 0 5px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 700;
    color: #fff;
    background: #a1aeb5
}

.bets-element .info-rank.rank-gold {
    background: #f7d814
}

.bets-element .info-rank.rank-diamond {
    background: #1fb1ff
}

.bets-element .info-rank.rank-pink {
    background: #e614f7
}

.bets-element .info-rank.rank-mod {
    background: #00c74d
}

.bets-element .info-rank.rank-admin {
    background: #fd3b31
}

.bets-element .info-rank svg {
    width: 11px;
    margin-right: 5px;
    margin-bottom: 1px;
    fill: #fff
}

.bets-element .info-username {
    max-width: 120px;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 5px;
}

.bets-element .user-hidden {
    font-style: italic;
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.bets-element .element-time {
    width: 15%;
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.bets-element .element-time span.time-text {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.bets-element .element-multiplier {
    width: 15%;
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.bets-element .element-multiplier span.multiplier-text {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.bets-element .element-bet {
    width: 15%;
    display: flex;
    justify-content: flex-end;
    align-items: center
}

.bets-element .element-bet img {
    width: 20px;
    margin-right: 6px
}

.bets-element .bet-amount {
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.bets-element .bet-amount span.amount-value {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.bets-element .bet-amount span.amount-text {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.bets-element .element-payout {
    width: 15%;
    display: flex;
    justify-content: flex-end;
    align-items: center
}

.bets-element .element-payout img {
    width: 20px;
    margin-right: 6px
}

.bets-element .payout-amount {
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.bets-element .payout-amount span.amount-value {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.bets-element .payout-amount span.amount-text {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 700
}

.bets-element .payout-amount span.amount-text.text-won {
    color: #D4AF3C
}

.bets-element .payout-amount span.amount-text.text-lost {
    color: #fd3b31
}

@media only screen and (max-width: 950px) {
    .bets-element {
        padding: 8px 10px;
        margin-top: 10px;
    }

    .bets-element .element-game {
        width: 18%;
        font-size: 12px;
        padding-right: 3px;
    }

    .bets-element .element-game svg {
        width: 19px;
        height: 19px;
        margin-right: 2px;
    }

    .bets-element .element-game span {
        max-width: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .bets-element .element-user {
        width: 28%;
    }

    .bets-element .element-user .avatar-image {
        display: none;
    }

    .bets-element .info-username {
        font-size: 12px;
        margin-right: 5px;
    }

    .bets-element .user-hidden {
        font-size: 12px;
    }

    .bets-element .user-info .box-level {
        display: none;
    }

    .bets-element .user-info {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .bets-element .user-info .box-rank {
        display: none;
    }

    .bets-element .element-time {
        display: none;
    }

    .bets-element .element-multiplier {
        width: 18%;
        font-size: 12px;
    }

    .bets-element .element-multiplier span.multiplier-text {
        display: none;
    }

    .bets-element .element-bet {
        width: 18%;
    }

    .bets-element .element-bet img {
        width: 12px;
        margin-right: 2px
    }

    .bets-element .bet-amount {
        font-size: 11px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 38px;
    }

    .bets-element .bet-amount span.amount-value {
        font-size: 12px;
    }

    .bets-element .element-payout {
        width: 18%;
    }

    .bets-element .element-payout img {
        width: 12px;
        margin-right: 2px
    }

    .bets-element .payout-amount {
        font-size: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 38px;
    }

    .bets-element .payout-amount span.amount-text,
    .bets-element .bet-amount span.amount-text {
        display: none;
    }

    .bets-element .payout-amount span.amount-value {
        font-size: 12px;
    }

    .bets-element .payout-amount.payout-positive {
        font-size: 10px;
    }

    .bets-element .payout-amount.payout-positive span.amount-value {
        font-size: 12px;
    }

}
</style>
