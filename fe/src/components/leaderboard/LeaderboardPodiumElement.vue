<template>
    <div class="leaderboard-podium-element">
        <div class="element-inner">
            <div class="inner-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g filter="url(#filter0_d_194_97)">
                        <path
                            d="M7.83333 16.4258V14.7591H11.1667V12.1758C10.4861 12.023 9.87861 11.7349 9.34417 11.3116C8.80972 10.8883 8.41722 10.3569 8.16667 9.71745C7.125 9.59245 6.25361 9.13773 5.5525 8.35328C4.85139 7.56884 4.50056 6.64856 4.5 5.59245V3.09245H7.83333V1.42578H16.1667V3.09245H19.5V5.59245C19.5 6.648 19.1492 7.56828 18.4475 8.35328C17.7458 9.13828 16.8744 9.593 15.8333 9.71745C15.5833 10.3563 15.1911 10.8877 14.6567 11.3116C14.1222 11.7355 13.5144 12.0236 12.8333 12.1758V14.7591H16.1667V16.4258H7.83333ZM7.83333 7.92578V4.75911H6.16667V5.59245C6.16667 6.12023 6.31944 6.59606 6.625 7.01995C6.93056 7.44384 7.33333 7.74578 7.83333 7.92578ZM16.1667 7.92578C16.6667 7.74523 17.0694 7.443 17.375 7.01911C17.6806 6.59523 17.8333 6.11967 17.8333 5.59245V4.75911H16.1667V7.92578Z"
                            fill="white" />
                    </g>
                    <defs>
                        <filter id="filter0_d_194_97" x="0.5" y="0.425781" width="23" height="23"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="3" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_194_97" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_194_97" result="shape" />
                        </filter>
                    </defs>
                </svg>
            </div>
            <div class="user-avatar">
                <AvatarImage v-bind:image="winner !== null && winner.user !== undefined && winner.user !== null ? winner.user.avatar : ''" />
            </div>
            <div class="element-username">{{ leaderboardGetUsername }}</div>
            <div class="inner-wagered">
                Wagered:<img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                <div class="wagered-value">
                    <span v-if="winner !== null">{{ leaderboardFormatValue(winner.points).split('.')[0] }}</span>
                    <span v-else>0</span>
                </div>
            </div>
            <div class="inner-prize">
                <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                <div class="prize-value" v-if="winner !== null">
                    <span>{{ leaderboardFormatValue(winner.prize).split('.')[0] }}</span>.{{
                        leaderboardFormatValue(winner.prize).split('.')[1] }}
                </div>
                <div class="prize-value" v-else>
                    <span>0</span>.00
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AvatarImage from '@/components/AvatarImage';

export default {
    name: 'LeaderboardPodiumElement',
    components: {
        AvatarImage
    },
    props: [
        'position',
        'winner'
    ],
    methods: {
        leaderboardFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');;
        },
    },
    computed: {
        leaderboardGetUsername() {
            let username = 'Empty';

            if (this.winner !== null && this.winner.user !== undefined && this.winner.user !== null) { username = this.winner.user.username; }
            else if (this.winner !== null && this.winner.user === null) { username = 'Anonymous'; }

            return username;
        }
    }
}
</script>

<style scoped>
.leaderboard-podium-element {
    width: 200px;
    height: 234px;
    margin-right: 50px;
    border-radius: 8px;
}

.leaderboard-podium-element:first-child {
    transform: rotate(-2deg);
    border: 1px solid #8B8B8B;
    background: radial-gradient(71.04% 33.46% at 50% 99.83%, rgba(139, 139, 139, 0.25) 0%, rgba(139, 139, 139, 0.00) 100%), linear-gradient(0deg, #31293f 0%, #1D1826 100%);
    box-shadow: 0px 8px 0px -4px #8B8B8B, 0px 16px 101.3px 0px rgba(139, 139, 139, 0.14);
}

.leaderboard-podium-element:nth-child(2) {
    border: 1px solid #E5C900;
    background: radial-gradient(71.04% 33.46% at 50% 99.83%, rgba(139, 139, 139, 0.25) 0%, rgba(139, 139, 139, 0.00) 100%), linear-gradient(0deg, #31293f 0%, #1D1826 100%);
    box-shadow: 0px 10px 0px -4px #E5C900, 0px 0px 45px 0px rgba(222, 195, 0, 0.03) inset, 0px 0px 195.7px 0px rgba(229, 201, 0, 0.09);
}

.leaderboard-podium-element:nth-child(3) {
    transform: rotate(2deg);
    border: 1px solid #C48C29;
    background: radial-gradient(71.04% 33.46% at 50% 99.83%, rgba(139, 139, 139, 0.25) 0%, rgba(139, 139, 139, 0.00) 100%), linear-gradient(0deg, #31293f 0%, #1D1826 100%);
    box-shadow: 0px 8px 0px -4px #C58D29, 0px 16px 101.3px 0px rgba(196, 140, 41, 0.09);
}


.leaderboard-podium-element:nth-child(3) {
    margin-right: 0
}

.leaderboard-podium-element:first-child,
.leaderboard-podium-element:nth-child(3) {
    margin-top: 40px
}

.leaderboard-podium-element .element-inner,
.leaderboard-podium-element .element-loading {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 25px 10px 10px 10px
}

.leaderboard-podium-element .element-loading {
    border-radius: 8px;
    overflow: hidden
}

.leaderboard-podium-element .element-loading:after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    animation: loading_animation-7458ab88 1s ease infinite;
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, hsla(0, 0%, 100%, .1) 50%, hsla(0, 0%, 100%, 0))
}

.leaderboard-podium-element .inner-badge {
    width: 30px;
    height: 36px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 6px;
    top: 0;
    left: 15px;
    border-radius: 0 0 5px 5px
}

.leaderboard-podium-element:first-child .inner-badge {
    background: #8b8b8b
}

.leaderboard-podium-element:nth-child(2) .inner-badge {
    background: #e5c900
}

.leaderboard-podium-element:nth-child(3) .inner-badge {
    background: #c48c29
}

.leaderboard-podium-element .inner-badge svg {
    fill: #fff
}

.leaderboard-podium-element .avatar-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #1a1522;
}

.avatar-image img {
    width: 100%;
    height: 100%;
}

.element-username {
    color: #FFF;
    text-align: center;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.leaderboard-podium-element .inner-username {
    max-width: 120px;
    margin-top: 12px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}

.leaderboard-podium-element .inner-prize,
.leaderboard-podium-element .inner-wagered {
    display: flex;
    align-items: center;
    margin-top: 0px;
    color: #FFF;
    font-family: Poppins;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.leaderboard-podium-element .inner-prize {
    width: 100%;
    height: 40px;
    justify-content: center;
    margin-top: 12px;
    border-radius: 5px;
    background: #00c74d
}

.leaderboard-podium-element .inner-prize img,
.leaderboard-podium-element .inner-wagered img {
    width: 15px;
    margin-left: 5px;
    margin-right: 3px;
    margin-bottom: 3px;
}

.leaderboard-podium-element .inner-prize img {
    width: 18px;
    margin-left: 5px;
    margin-right: 3px;
    margin-bottom: 0px;
}

.leaderboard-podium-element .prize-value,
.leaderboard-podium-element .wagered-value {
    color: #fff;
    font-family: Poppins;
    font-size: 11.5px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.leaderboard-podium-element .prize-value {
    font-size: 12px;
}

.leaderboard-podium-element .prize-value span,
.leaderboard-podium-element .wagered-value span {
    font-size: 12px;
    font-weight: 700;
    color: #fff
}

.leaderboard-podium-element .prize-value span {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

@keyframes loading_animation-7458ab88 {
    0% {
        transform: translateX(-100%)
    }

    50% {
        transform: translateX(100%)
    }

    to {
        transform: translateX(100%)
    }
}

@media only screen and (max-width: 800px) {
    .leaderboard-podium-element {
        margin-right: 20px
    }
}

@media only screen and (max-width: 650px) {
    .leaderboard-podium-element {
        width: 50%;
        height: 170px;
        margin-top: 0px;
        margin-right: auto;
        margin-left: auto;
    }

    .leaderboard-podium-element:first-child {
        grid-column: 1/1;
        grid-row: 2/2;        
        width: 80%;
        margin-right: 0px;
        margin-top: 10px;
    }
    
    .leaderboard-podium-element:nth-child(2) {
        grid-column: 1/3;
        grid-row: 1/1;        
    }
    
    .leaderboard-podium-element:nth-child(3) {
        grid-column: 2/2;
        grid-row: 2/2;
        width: 80%;
        margin-left: 0px;
        margin-top: 10px;
    }
    .leaderboard-podium-element .avatar-image {
        width: 40px;
        height: 40px;
    }
    .leaderboard-podium-element .element-inner {        
        padding: 15px 10px 10px 10px
    }
}
</style>
