<template>
    <div class="home-banner-user">
        <div class="home-banner-user-left" v-bind:class="{'banner-user-nonauth-left': authUser.user === null}">
            <div class="user-title">Welcome Back!</div>
            <div v-if="authUser.user !== null" class="user-info">
                <AvatarImage v-bind:image="authUser.user.avatar" />
                <span v-html="authUser.user.username"></span>                
                <BoxLevel v-if="authUser.user !== null && ['admin', 'mod', 'partner'].includes(authUser.user.rank) === false"
                    v-bind:level="homeGetLevel" v-bind:color="userGetLevelColor" />
                <BoxRank v-else-if="authUser.user !== null && userGetRank !== null" v-bind:rank="userGetRank" />       
            </div>
            <div v-else class="user-login-title">Log in and Get Started Today!</div>
            <div class="user-level">
                <div class="level-text">
                    To the next level
                    <div v-if="authUser.user !== null" class="text-value">
                        <span>{{ parseFloat(homeGetLevelProgress).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                            ',') }} / </span>
                        <span class="text-target">{{
                            parseFloat(homeGetLevelBet).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}</span> XP
                    </div>
                    <div v-else class="text-value">
                        <span>0 / </span>
                        <span class="text-target">100</span> XP
                    </div>
                </div>
                <div class="level-info">
                    <div class="info-current">
                        <svg data-v-a8578182="" xmlns="http://www.w3.org/2000/svg" height="16" width="18"
                            viewBox="0 0 576 512">
                            <path
                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z">
                            </path>
                        </svg>
                        {{ authUser.user === null ? 0 : homeGetLevel >= 99 ? 99 : homeGetLevel }}
                    </div>
                    <div class="info-progress">
                        <div v-if="authUser.user !== null" class="progress-inner"
                            v-bind:style="{ 'width': (100 / homeGetLevelBet) * homeGetLevelProgress + '%' }">
                        </div>
                        <div v-else class="progress-inner" v-bind:style="{ 'width': '0%' }">
                        </div>
                    </div>
                    <div class="info-next">
                        <svg data-v-a8578182="" xmlns="http://www.w3.org/2000/svg" height="16" width="18"
                            viewBox="0 0 576 512">
                            <path
                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z">
                            </path>
                        </svg>
                        {{ authUser.user === null ? 0 : homeGetLevel >= 99 ? 100 : homeGetLevel + 1 }}
                    </div>
                </div>
            </div>
        </div>
        <div class="home-banner-user-avatar" v-if="authUser.user !== null">
            <AvatarImage v-bind:image="authUser.user.avatar" />
        </div>
        <img v-else class="home-banner-user-right" src="@/assets/img/home-default-user.png" alt="home-default-user" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BoxLevel from '@/components/BoxLevel';
import BoxRank from '@/components/BoxRank';
import AuthButton from '@/components/AuthButton';
import AvatarImage from '@/components/AvatarImage';

export default {
    name: 'HomeBannerUser',
    components: {
        BoxLevel,
        BoxRank,
        AuthButton,
        AvatarImage
    },
    computed: {
        ...mapGetters([
            'authUser'
        ]),
        homeGetLevel() {
            let level = Math.floor(Math.pow(this.authUser.user.xp / 1000 / 100, 1 / 3));
            return level >= 100 ? 100 : level;
        },
        userGetLevelColor() {
            let color = '';

            if(this.authUser.user === null) return '';

            if (this.homeGetLevel >= 10 && this.homeGetLevel < 20) { color = 'blue'; }
            else if (this.homeGetLevel >= 20 && this.homeGetLevel < 30) { color = 'green'; }
            else if (this.homeGetLevel >= 30 && this.homeGetLevel < 50) { color = 'yellow'; }  
            else if (this.homeGetLevel >= 50) { color = 'purple'; }

            return color;
        },
        userGetRank() {
            if (this.authUser.user === null) return null;
            let rank = this.authUser.user.rakeback;
            if (this.authUser.user.rank !== 'user') { rank = this.authUser.user.rank; }
            return rank;
        },
        homeGetLevelBet() {
            return this.homeGetLevel >= 100 ? 2970100 : (Math.pow(this.homeGetLevel + 1, 3) - Math.pow(this.homeGetLevel, 3)) * 100;
        },
        homeGetLevelProgress() {
            return Math.floor((this.homeGetLevel >= 100 ? 2970100 * 1000 : this.authUser.user.xp - (Math.pow(this.homeGetLevel, 3) * 100 * 1000)) / 10) / 100;
        }
    }
}
</script>

<style scoped>
.home-banner-user {
    width: calc(50% - 10px);
    height: 190px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    border-bottom: 0.808px solid #D4AF3C;
    background: #2B2339;
    box-shadow: 0px 16.112px 50.349px 0px rgba(0, 0, 0, 0.30);
}

.home-banner-user-left {
    width: calc(68%);
    height: 100%;
    padding: 20px;
    padding-right: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.banner-user-nonauth-left{
    width: calc(72%) !important;
}

.home-banner-user-avatar {
    position: absolute;
    right: 20px;
    bottom: 0px;
    top: 0px;
    margin-top: auto;
    margin-bottom: auto;
    height: fit-content;
    width: calc(20%);
}

.home-banner-user-right {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: calc(22%);
}

.home-banner-user .user-title {
    font-size: 14px;
    font-weight: 500;
    color: #CABFDD;
}

.home-banner-user .user-login-title {
    font-size: 19px;
    font-weight: 600;
    color: #fff;
}

.home-banner-user .user-info {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
}

.home-banner-user .user-info span {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    margin-right: 5px;
}

.home-banner-user .user-info .avatar-image {
    height: 40px;
    width: 40px;
    margin-right: 12px;
    border-radius: 100%;
}

.avatar-image img {
    width: 100%;
    height: 100%;
}

.home-banner-user .info-rank {
    height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    padding: 0 5px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 700;
    color: #fff;
    background: #a1aeb5;
}

.home-banner-user .info-rank svg {
    width: 11px;
    margin-right: 5px;
    margin-bottom: 1px;
    fill: #fff;
}

.avatar-image {
    overflow: hidden;
}

.home-banner-user .user-level {
    width: 100%;
    padding: 8px 10px 10px 10px;
    border-radius: 8px;
    background: #1D1826;
}

.home-banner-user .level-text {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #767c8b;
}

.home-banner-user .text-value span {
    color: #fff;
}

.home-banner-user .level-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
}

.home-banner-user .progress-inner {
    height: 100%;
    width: 5%;
    border-radius: 3px;
    background: #D4AF3C;
}

.home-banner-user .info-current,
.home-banner-user .info-next {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    border-radius: 5.751px;
    background: #BDB1D1;
}

.home-banner-user .info-current svg,
.home-banner-user .info-next svg {
    width: 11px;
    margin-right: 5px;
    margin-bottom: 1px;
    fill: #fff;
}

.home-banner-user .info-progress {
    width: calc(100% - 98px);
    height: 8px;
    border-radius: 3px;
    background: #2B2339;
}

home-banner-user .progress-inner {
    height: 100%;
    border-radius: 3px;
    /* background: #fd3b31; */
}

.home-banner-user .info-current,
.home-banner-user .info-next {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    border-radius: 5.751px;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    background: #BDB1D1;
}

.home-banner-user .info-next {
    background: #1fb1ff;
}

.home-banner-user .info-current svg,
.home-banner-user .info-next svg {
    width: 11px;
    margin-right: 5px;
    margin-bottom: 1px;
    fill: #fff;
}


.home-banner-user .inner-guest,
.home-banner-user .inner-auth {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    z-index: 1;
}

.home-banner-user .inner-guest {
    justify-content: flex-start;
}

.home-banner-user .inner-guest span.gradient-green,
.home-banner-user .inner-auth span.gradient-green {
    font-size: 28px;
    font-weight: 900;
    text-shadow: 0px 0px 25px rgba(3, 227, 171, 0.35);
    color: #ddd;
}

.home-banner-user .inner-guest button.auth-button {
    margin-top: 15px;
}

.home-banner-user .auth-info {
    display: flex;
    align-items: center;
}

.home-banner-user .auth-info span {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
}

.home-banner-user .info-avatar {
    width: 33px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-right: 10px;
    border-radius: 50%;
    border: 2px solid #9e9e9e;
    overflow: hidden;
}

.home-banner-user .inner-auth.auth-blue .info-avatar {
    border: 2px solid #559ee4;
}

.home-banner-user .inner-auth.auth-green .info-avatar {
    border: 2px solid #b8e92d;
}

.home-banner-user .inner-auth.auth-orange .info-avatar {
    border: 2px solid #fca311;
}

.home-banner-user .inner-auth.auth-red .info-avatar {
    border: 2px solid #ff4e4e;
}

.home-banner-user .inner-auth.auth-purple .info-avatar {
    border: 2px solid #6953f1;
}

.home-banner-user .info-avatar .avatar-image {
    width: 100%;
    height: 100%;
}

.home-banner-user .auth-level {
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 1;
}

.home-banner-user .level-box {
    width: 46px;
    height: 34px;
    position: relative;
    padding: 1px;
}

.home-banner-user .level-box::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(6, 36, 61, 0) 0%, #9e9e9e 100%);
    clip-path: polygon(7px 0, calc(100% - 7px) 0, 100% 25%, 100% 75%, calc(100% - 7px) 100%, 7px 100%, 0 75%, 0 25%);
}

.home-banner-user .inner-auth.auth-blue .level-box::before {
    background: linear-gradient(180deg, rgba(6, 36, 61, 0) 0%, #559ee4 100%);
}

.home-banner-user .inner-auth.auth-green .level-box::before {
    background: linear-gradient(180deg, rgba(6, 36, 61, 0) 0%, #b8e92d 100%);
}

.home-banner-user .inner-auth.auth-orange .level-box::before {
    background: linear-gradient(180deg, rgba(6, 36, 61, 0) 0%, #fca311 100%);
}

.home-banner-user .inner-auth.auth-red .level-box::before {
    background: linear-gradient(180deg, rgba(6, 36, 61, 0) 0%, #ff4e4e 100%);
}

.home-banner-user .inner-auth.auth-purple .level-box::before {
    background: linear-gradient(180deg, rgba(6, 36, 61, 0) 0%, #6953f1 100%);
}

.home-banner-user .box-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 15px;
    color: #9e9e9e;
    background-color: #03121e;
    clip-path: polygon(7px 0, calc(100% - 7px) 0, 100% 25%, 100% 75%, calc(100% - 7px) 100%, 7px 100%, 0 75%, 0 25%);
}

.home-banner-user .inner-auth.auth-blue .box-inner {
    color: #559ee4;
}

.home-banner-user .inner-auth.auth-green .box-inner {
    color: #b8e92d;
}

.home-banner-user .inner-auth.auth-orange .box-inner {
    color: #fca311;
}

.home-banner-user .inner-auth.auth-red .box-inner {
    color: #ff4e4e;
}

.home-banner-user .inner-auth.auth-purple .box-inner {
    color: #6953f1;
}

.home-banner-user .level-progress {
    width: calc(100% - 92px);
    height: 13px;
    position: relative;
    padding: 4px 0;
    background-color: #03121e;
}

.home-banner-user .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #ffffff 0%, #9e9e9e 100%);
}

.home-banner-user .inner-auth.auth-blue .progress-bar {
    background: linear-gradient(90deg, #a4d0ff 0%, #559ee4 100%);
}

.home-banner-user .inner-auth.auth-green .progress-bar {
    background: linear-gradient(90deg, #e5ffa4 0%, #b8e92d 100%);
}

.home-banner-user .inner-auth.auth-orange .progress-bar {
    background: linear-gradient(90deg, #ffe5a4 0%, #fca311 100%);
}

.home-banner-user .inner-auth.auth-red .progress-bar {
    background: linear-gradient(90deg, #ffa4a4 0%, #ff4e4e 100%);
}

.home-banner-user .inner-auth.auth-purple .progress-bar {
    background: linear-gradient(90deg, #b5a4ff 0%, #6953f1 100%);
}

.home-banner-user .progress-text {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 10px;
    font-weight: 700;
}

.home-banner-user .progress-text span {
    color: #9e9e9e;
}

.home-banner-user .inner-auth.auth-blue .progress-text span {
    color: #559ee4;
}

.home-banner-user .inner-auth.auth-green .progress-text span {
    color: #b8e92d;
}

.home-banner-user .inner-auth.auth-orange .progress-text span {
    color: #fca311;
}

.home-banner-user .inner-auth.auth-red .progress-text span {
    color: #ff4e4e;
}

.home-banner-user .inner-auth.auth-purple .progress-text span {
    color: #6953f1;
}

.home-banner-user .progress-text span.text-target {
    opacity: 0.5;
}

@media only screen and (max-width: 900px) {

    .home-banner-user {
        width: 100%;
        margin-right: 0;
    }

}

@media only screen and (max-width: 600px) {

    .home-banner-user {
        justify-content: center;

    }
    .home-banner-user .user-inner {
        padding: 22px 20px;
    }

    .home-banner-user .user-inner img:nth-of-type(2) {
        display: none;
    }

    .home-banner-user-left {
        width: calc(93%);
        padding-left: 0px;
    }

    .banner-user-nonauth-left{
        width: calc(93%) !important;
    }

    .home-banner-user-avatar, .home-banner-user-right {
        display: none;
    }

}
</style>
