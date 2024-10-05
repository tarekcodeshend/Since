<template>
    <div class="home-banner-rewards">
        <div class="rewards-over-backgrond">
            <img src="@/assets/img/banner/home-rewards-over.png" alt="rewards" />
        </div>
        <div class="rewards-coins">
            <img src="@/assets/img/rain_right.0ad36366.png" alt="rain right" />
        </div>
        <div class="rewards-title">Rewards</div>
        <div class="rewards-text">
            Increase your level to earn more coins!<br />
            You currently earn
            <span>{{ rewardsGetRakebackInfo === null ? '0.00' : rewardsGetRakebackInfo.percentage }}%</span>
            rakeback on all bets.
        </div>
        <div class="rewards-action">
            <div class="action-amount">
                <img src="@/assets/img/coins.8ad8b473.png" alt="" />
                <div v-if="authUser.user !== null && authUser.user.rakeback !== undefined && authUser.user.rakeback !== null && authUser.user.rakeback.available !== null" class="amount-value">
                    <span>{{ rewardsFormatValue(authUser.user.rakeback.available).split('.')[0] }}</span>.{{
                        rewardsFormatValue(authUser.user.rakeback.available).split('.')[1] }}
                </div>
                <div v-else class="amount-value">
                    <span>0</span>.00
                </div>
            </div>
            <button v-if="authUser.user !== null" v-on:click="rewardsClaimButton()" class="button-claim"
                v-bind:disabled="socketSendLoading !== null">CLAIM RAKEBACK</button>
            <button v-else v-on:click="modalsSetShow('Login')" class="button-claim"
                v-bind:disabled="socketSendLoading !== null">LOG IN</button>
        </div>        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'HomeBannerRewards',
    components: {
    },
    data() {
        return {
            homeBanners: ['Rain'],
            homePosition: 0,
            homeDirection: null,
            homeInterval: null
        }
    },
    methods: {
        ...mapActions([
            'modalsSetShow',
            'rakebackSendClaimSocket'
        ]),
        homeStartInterval() {
            clearInterval(this.homeInterval);
            this.homeInterval = setInterval(() => {
                this.homeNextButton();
            }, 6000);
        },
        homePreviousButton() {
            this.homeDirection = 'left';
            this.homePosition = this.homePosition === 0 ? this.homeBanners.length - 1 : this.homePosition - 1;
            this.homeStartInterval();
        },
        homeNextButton() {
            this.homeDirection = 'right';
            this.homePosition = this.homePosition >= this.homeBanners.length - 1 ? 0 : this.homePosition + 1;
            this.homeStartInterval();
        },
        rewardsFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        rewardsClaimButton() {
            const data = {};
            this.rakebackSendClaimSocket(data);
        }
    },
    computed: {
        ...mapGetters([
            'authUser',
            'socketSendLoading'
        ]),
        rewardsGetRakebackInfo() {
            if (this.authUser.user === null) return null;
            const xp = this.authUser.user.xp / 1000;
            let info = null;

            if (xp >= 100000 && xp < 250000) { info = { name: 'bronze', percentage: 0.05 }; }
            else if (xp >= 250000 && xp < 500000) { info = { name: 'silver', percentage: 0.1 }; }
            else if (xp >= 500000 && xp < 1000000) { info = { name: 'gold', percentage: 0.15 }; }
            else if (xp >= 1000000 && xp < 2000000) { info = { name: 'platinum', percentage: 0.2 }; }
            else if (xp >= 2000000) { info = { name: 'titanium', percentage: 0.25 }; }

            return info;
        },
        rewardsGetRakebackProgress() {
            let progress = 0;

            if (this.rewardsGetRakebackInfo !== null) { progress = 100 / 0.25 * this.rewardsGetRakebackInfo.percentage; }

            return progress;
        }
    },
    beforeUnmount() {
        clearInterval(this.homeInterval);
    },
    mounted() {
        this.homeStartInterval();
    }
}
</script>

<style scoped>
.home-banner-rewards {
    width: calc(50% - 10px);
    height: 190px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 25px;
    border-radius: 15px;
    border-bottom: 0.808px solid #D4AF3C;
    background: #2B2339;
    box-shadow: 0px 16.112px 50.349px 0px rgba(0, 0, 0, 0.30);
    overflow: hidden;
}
.rewards-over-backgrond{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #2B2339
}
.rewards-over-backgrond img{ 
    width: 100%;
    height: 100%;
    z-index: 0;
}

.home-banner-rewards .rewards-coins {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    z-index: 1;
}

.home-banner-rewards .rewards-coins img {
    height: 150px;
}

.home-banner-rewards .rewards-title {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    z-index: 1;
}

.home-banner-rewards .rewards-text {
    font-size: 15px;
    font-weight: 600;
    color: #767c8b;
    z-index: 1;
}

.home-banner-rewards .rewards-text span {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
}

.home-banner-rewards .rewards-action {
    display: flex;
    align-items: center;
    z-index: 1;
}

.home-banner-rewards .action-amount {
    height: 43px;
    display: flex;
    align-items: center;
    margin-right: 12px;
    padding: 0 18px;
    border-radius: 7.699px;
    border: 0.768px solid #403650;
    background: #17131F;
    box-shadow: 0px 0px 11.527px 0px rgba(0, 0, 0, 0.20) inset, 0px 6.916px 26.589px 0px rgba(0, 0, 0, 0.12);
}

.home-banner-rewards .action-amount img {
    width: 24px;
    margin-right: 10px;
}

.home-banner-rewards .amount-value {
    font-size: 12px;
    font-weight: 700;
    color: #bbb;
}

.home-banner-rewards .amount-value span {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
}

.home-banner-rewards button.button-claim {
    /* width: 150px; */
    padding: 0 15px;
    height: 43px;
    border-radius: 9px;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    text-shadow: 0px 4.049px 4.049px rgba(0, 0, 0, 0.23);
    border-radius: 10.122px;
    background: #D4AF3C;
    box-shadow: 0px 1.616px 0px 0px #8E7525, 0px 9.093px 34.958px 0px rgba(0, 0, 0, 0.12);
    transition: all .3s ease;
}

@media only screen and (max-width: 900px) {

    .home-banner-rewards {
        width: 100%;
        margin-top: 10px;
    }

}

@media only screen and (max-width: 1250px) {
    .home-banner-rewards .rewards-coins {
        display: none;
    }
}
</style>
