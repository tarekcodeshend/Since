<template>

    <div class="profile-overview">
        <div class="overview-user">
            <AvatarImage v-bind:image="authUser.user.avatar" />
            <div class="user-info">
                <div class="info-username">
                    <span v-html="authUser.user.username"></span>
                    <span class="user-rank">USER</span>
                </div>
                <div class="info-level">
                    <div class="level-text"> To the next level <div class="text-value">
                            <span>{{
                                parseFloat(profileGetLevelProgress).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }} / </span>
                            <span class="text-target">{{
                                parseFloat(profileGetLevelBet).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</span> XP
                        </div>
                    </div>
                    <div class="level-info">
                        <div class="info-current">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                <path
                                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z">
                                </path>
                            </svg> {{ profileGetLevel }}
                        </div>
                        <div class="info-progress">
                            <div class="progress-inner"
                                v-bind:style="{ 'width': (100 / profileGetLevelBet) * profileGetLevelProgress + '%' }">
                            </div>
                        </div>
                        <div class="info-next">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                <path
                                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z">
                                </path>
                            </svg>
                            {{ profileGetLevel + 1 }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="overview-stats">
            <div class="stats-element">
                <div class="element-title">TOTAL WAGERED</div>
                <div class="element-value"><img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                    <div class="value-amount">
                        <span>{{ profileFormatValue(authUser.user.stats.bet).split('.')[0] }}</span>.{{
                            profileFormatValue(authUser.user.stats.bet).split('.')[1] }}
                    </div>
                </div>
            </div>
            <div class="stats-element">
                <div class="element-title">TOTAL DEPOSITED</div>
                <div class="element-value"><img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                    <div class="value-amount">
                        <span>{{ profileFormatValue(authUser.user.stats.deposit).split('.')[0] }}</span>.{{
                            profileFormatValue(authUser.user.stats.deposit).split('.')[1] }}
                    </div>
                </div>
            </div>
            <div class="stats-element">
                <div class="element-title">TOTAL WITHDRAWN</div>
                <div class="element-value"><img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                    <div class="value-amount">
                        <span>{{ profileFormatValue(authUser.user.stats.withdraw).split('.')[0] }}</span>.{{
                            profileFormatValue(authUser.user.stats.withdraw).split('.')[1] }}
                    </div>
                </div>
            </div>
            <div class="stats-element element-profit">
                <div class="element-title">TOTAL PROFIT</div>
                <div class="element-value"><img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                    <div class="value-amount">
                        <span>{{ profileFormatValue(authUser.user.stats.withdraw -
                            authUser.user.stats.deposit).split('.')[0] }}</span>.{{
                                profileFormatValue(authUser.user.stats.withdraw
                                    - authUser.user.stats.deposit).split('.')[1] }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AvatarImage from '@/components/AvatarImage';

export default {
    name: 'ProfileOverview',
    components: {
        AvatarImage
    },
    metaInfo: {
        title: 'Profile - gooncasino'
    },
    methods: {
        ...mapActions([
            'notificationShow'
        ]),
        profileFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        profileCopyButton(value) {
            const el = document.createElement('textarea');
            el.value = value;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            this.notificationShow({ type: 'success', message: 'Copied to your clipboard.' });
        }
    },
    computed: {
        ...mapGetters([
            'authUser'
        ]),
        profileGetLevel() {
            let level = Math.floor(Math.pow(this.authUser.user.xp / 1000 / 100, 1 / 3));
            return level >= 100 ? 100 : level;
        },
        profileGetLevelColor() {
            let color = '';

            if (this.profileGetLevel >= 2 && this.profileGetLevel < 26) { color = 'blue'; }
            else if (this.profileGetLevel >= 26 && this.profileGetLevel < 51) { color = 'green'; }
            else if (this.profileGetLevel >= 51 && this.profileGetLevel < 76) { color = 'orange'; }
            else if (this.profileGetLevel >= 76 && this.profileGetLevel < 100) { color = 'red'; }
            else if (this.profileGetLevel >= 100) { color = 'purple'; }

            return color;
        },
        profileGetLevelBet() {
            return this.profileGetLevel >= 100 ? 2970100 : (Math.pow(this.profileGetLevel + 1, 3) - Math.pow(this.profileGetLevel, 3)) * 100;
        },
        profileGetLevelProgress() {
            return Math.floor((this.profileGetLevel >= 100 ? 2970100 * 1000 : this.authUser.user.xp - (Math.pow(this.profileGetLevel, 3) * 100 * 1000)) / 10) / 100;
        }
    }
}
</script>

<style scoped>
.profile-overview {
    width: 100%;
    border-radius: 8px;
    background: #1a1622
}

.profile-overview .overview-user {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 30px 30px 0 30px
}

.profile-overview .overview-user .avatar-image {
    width: 100px;
    height: 100px;
    border-radius: 12px
}

.avatar-image img {
    width: 100%;
    height: 100%
}

.profile-overview .user-info {
    width: calc(100% - 100px);
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 5px;
    padding-left: 15px
}

.profile-overview .info-username {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.profile-overview .info-username span.user-rank {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.profile-overview .info-username span.user-rank.rank-mod {
    color: #00c74d
}

.profile-overview .info-username span.user-rank.rank-admin {
    color: #fd3b31
}

.profile-overview .info-level {
    width: 100%;
    padding: 8px 10px 10px 10px;
    border-radius: 8px;
    background: #130f1a
}

.profile-overview .level-text {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #807a8a
}

.profile-overview .text-value span {
    color: #fff
}

.profile-overview .level-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px
}

.profile-overview .info-current,
.profile-overview .info-next {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    border-radius: 3px;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    background: #a1aeb5
}

.profile-overview .info-next {
    background: #1fb1ff
}

.profile-overview .info-current svg,
.profile-overview .info-next svg {
    width: 11px;
    margin-right: 5px;
    margin-bottom: 1px;
    fill: #fff
}

.profile-overview .info-progress {
    width: calc(100% - 98px);
    height: 8px;
    border-radius: 3px;
    background: #212732
}

.profile-overview .progress-inner {
    height: 100%;
    border-radius: 3px;
    background: #D4AF3C
}

.profile-overview .overview-stats {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 12px;
    padding: 25px 30px 25px 30px;
    border-top: 1px solid #212732
}

.profile-overview .stats-element {
    width: calc(33.33% - 16px);
    display: flex;
    flex-direction: column;
    align-items: center
}

.profile-overview .stats-element.element-profit {
    width: 100%;
    margin-top: 16px
}

.profile-overview .element-title {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    color: #767c8b
}

.profile-overview .stats-element.element-profit .element-title {
    color: #e2b93d
}

.profile-overview .stats-element.element-profit.element-negative .element-title {
    color: #fd3b31
}

.profile-overview .element-value {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background: #292335
}

.profile-overview .stats-element.element-profit .element-value {
    color: #00c74d;
    background: #353223
}

.profile-overview .stats-element.element-profit.element-negative .element-value {
    color: #fd3b31;
    background: rgba(253, 59, 49, .08)
}

.profile-overview .element-value img {
    width: 17px;
    margin-right: 10px
}

.profile-overview .value-amount {
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.profile-overview .stats-element.element-profit .value-amount {
    color: #9b8236
}

.profile-overview .stats-element.element-profit.element-negative .value-amount {
    color: #fd3b31
}

.profile-overview .value-amount span {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.profile-overview .stats-element.element-profit .value-amount span {
    color: #D4AF3C
}

.profile-overview .stats-element.element-profit.element-negative .value-amount span {
    color: #fd3b31
}

@media only screen and (max-width: 900px) {
    .profile-overview .stats-element {
        width: calc(50% - 8px);
        margin-top: 16px
    }

    .profile-overview .stats-element:first-of-type {
        width: 100%;
        margin-top: 0
    }
}

@media only screen and (max-width: 550px) {
    .profile-overview .overview-user {
        width: 100%;
        flex-direction: column;
        padding: 30px 15px 0 15px
    }

    .profile-overview .user-info {
        width: 100%;
        align-items: center;
        padding-left: 0
    }

    .profile-overview .info-username {
        margin-top: 20px
    }

    .profile-overview .overview-stats {
        padding: 25px 15px 25px 15px
    }
}
</style>