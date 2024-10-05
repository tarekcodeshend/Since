<template>
    <div class="home">
        <div class="home-main">
            <div class="home-banner-back">
                <img src="@/assets/img/home-banner.png" />
            </div>
            <div class="home-banner">

                <HomeBannerUser />
                <HomeBannerRewards />

            </div>
            <div class="home-games">
                <div class="games-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 29 24" fill="none">
                        <g filter="url(#filter0_d_2077_194)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.5606 13.2033C11.8904 12.5437 12.5645 12.1271 13.302 12.1271H15.3426C16.0801 12.1271 16.7542 12.5437 17.084 13.2033C17.4425 13.9214 18.0423 14.4904 18.7783 14.8105C19.5143 15.1307 20.3395 15.1815 21.1092 14.9541C21.879 14.7267 22.5441 14.2356 22.9879 13.5669C23.4318 12.8982 23.6261 12.0946 23.5368 11.297L22.9142 5.70687C22.7935 4.61948 22.2762 3.61474 21.4612 2.88481C20.6462 2.15488 19.5908 1.75099 18.4967 1.75038H10.1509C9.05629 1.75026 8.00011 2.15383 7.1845 2.88382C6.36908 3.61366 5.85057 4.61925 5.72965 5.70687L5.10779 11.297C5.01848 12.0946 5.21279 12.8982 5.65667 13.5669C6.10055 14.2356 6.76566 14.7267 7.53538 14.9541C8.3051 15.1815 9.13031 15.1307 9.86631 14.8105C10.6023 14.4904 11.2021 13.9214 11.5606 13.2033ZM8.7011 6.2598C8.45537 6.2598 8.21972 6.35741 8.04597 6.53116C7.87222 6.70491 7.7746 6.94057 7.7746 7.18629C7.7746 7.43201 7.87222 7.66767 8.04597 7.84142C8.21972 8.01517 8.45537 8.11278 8.7011 8.11278C9.14401 8.11278 9.50455 8.47184 9.50455 8.91475C9.50455 9.16048 9.60216 9.39613 9.77591 9.56988C9.94966 9.74364 10.1853 9.84125 10.431 9.84125C10.6768 9.84125 10.9124 9.74364 11.0862 9.56988C11.2599 9.39613 11.3575 9.16048 11.3575 8.91475C11.3575 8.47184 11.7181 8.11278 12.161 8.11278C12.4067 8.11278 12.6424 8.01517 12.8161 7.84142C12.9899 7.66767 13.0875 7.43201 13.0875 7.18629C13.0875 6.94057 12.9899 6.70491 12.8161 6.53116C12.6424 6.35741 12.4067 6.2598 12.161 6.2598C11.7173 6.2598 11.3575 5.90008 11.3575 5.45635C11.3575 4.94492 10.9425 4.52985 10.431 4.52985C9.91962 4.52985 9.50455 4.94492 9.50455 5.45635C9.50455 5.90008 9.14483 6.2598 8.7011 6.2598ZM18.335 8.76791C18.1613 8.94166 17.9256 9.03928 17.6799 9.03928C17.4342 9.03928 17.1985 8.94166 17.0248 8.76791C16.851 8.59416 16.7534 8.3585 16.7534 8.11278C16.7534 7.86706 16.851 7.63141 17.0248 7.45765C17.1985 7.2839 17.4342 7.18629 17.6799 7.18629C17.9256 7.18629 18.1613 7.2839 18.335 7.45765C18.5088 7.63141 18.6064 7.86706 18.6064 8.11278C18.6064 8.3585 18.5088 8.59416 18.335 8.76791ZM20.1895 6.47021C20.3633 6.29646 20.4609 6.0608 20.4609 5.81508C20.4609 5.56936 20.3633 5.33371 20.1895 5.15995C20.0158 4.9862 19.7801 4.88859 19.5344 4.88859C19.2887 4.88859 19.053 4.9862 18.8793 5.15995C18.7055 5.33371 18.6079 5.56936 18.6079 5.81508C18.6079 6.0608 18.7055 6.29646 18.8793 6.47021C19.053 6.64396 19.2887 6.74158 19.5344 6.74158C19.7801 6.74158 20.0158 6.64396 20.1895 6.47021Z"
                                fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M6.45986 2.0742C4.94588 3.42926 4.71974 5.63356 4.4681 7.64974L4.02792 11.1765C3.91034 12.2276 4.16647 13.2866 4.75141 14.1678C5.33644 15.0491 6.21305 15.6964 7.22754 15.9961C8.24203 16.2958 9.32964 16.2288 10.2997 15.8069C11.2697 15.385 12.0603 14.6351 12.5328 13.6886C12.6783 13.3975 12.9758 13.2136 13.3013 13.2136H15.3433C15.6688 13.2136 15.9663 13.3975 16.1118 13.6886C16.5843 14.6351 17.3749 15.385 18.3449 15.8069C19.315 16.2288 20.4026 16.2958 21.4171 15.9961C22.4316 15.6964 23.3082 15.0491 23.8932 14.1678C24.4782 13.2865 24.7343 12.2273 24.6166 11.176L23.9941 5.5866C23.8438 4.23368 23.2001 2.98361 22.1861 2.07543C21.172 1.16716 19.8581 0.664583 18.4967 0.663818H10.1509C8.78889 0.663703 7.47471 1.16587 6.45986 2.0742ZM13.302 12.1271C12.5645 12.1271 11.8904 12.5437 11.5606 13.2033C11.2021 13.9214 10.6023 14.4904 9.86631 14.8105C9.13031 15.1307 8.3051 15.1815 7.53538 14.9541C6.76566 14.7267 6.10055 14.2356 5.65667 13.5669C5.21279 12.8982 5.01848 12.0946 5.10779 11.297L5.72965 5.70687C5.85057 4.61925 6.36908 3.61366 7.1845 2.88382C8.00011 2.15383 9.05629 1.75026 10.1509 1.75038H18.4967C19.5908 1.75099 20.6462 2.15488 21.4612 2.88481C22.2762 3.61474 22.7935 4.61948 22.9142 5.70687L23.5368 11.297C23.6261 12.0946 23.4318 12.8982 22.9879 13.5669C22.5441 14.2356 21.879 14.7267 21.1092 14.9541C20.3395 15.1815 19.5143 15.1307 18.7783 14.8105C18.0423 14.4904 17.4425 13.9214 17.084 13.2033C16.7542 12.5437 16.0801 12.1271 15.3426 12.1271H13.302Z"
                                fill="white" />
                        </g>
                        <defs>
                            <filter id="filter0_d_2077_194" x="0.166884" y="0.663818" width="28.3108" height="23.1831"
                                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="3.83312" />
                                <feGaussianBlur stdDeviation="1.91656" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2077_194" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2077_194"
                                    result="shape" />
                            </filter>
                        </defs>
                    </svg>
                    <span>OUR GAMES</span>
                    <div class="games-title-line"></div>
                </div>
                <div class="games-list">

                    <HomeGameElement game="Crash" imgSrc="crash-back.png" />
                    <HomeGameElement game="Roulette" imgSrc="roulette-back.png" />
                    <HomeGameElement game="Blackjack" imgSrc="blackjack-back.png" />
                    <HomeGameElement game="Slide" imgSrc="slide-back.png" />                    
                    <HomeGameElement game="Mines" imgSrc="mines-back.png" />
                    <HomeGameElement game="Towers" imgSrc="towers-back.png" />
                    <HomeGameElement game="Plinko" imgSrc="plinko-back.png" />

                </div>
            </div>
        </div>
        <div class="home-info">
            <!-- <HomeDepositMethods /> -->
            <Bets />
        </div>
    </div>
</template>

<script>
import Bets from '@/components/bets/Bets';
import HomeBannerUser from '@/components/home/HomeBannerUser';
import HomeBannerRewards from '@/components/home/HomeBannerRewards'
import HomeGameElement from '@/components/home/HomeGameElement';
import HomeDepositMethods from '@/components/home/HomeDepositMethods';

export default {
    name: 'Home',
    metaInfo: {
        title: 'GoonCasino | The official casino for $GOON'
    },
    components: {
        Bets,
        HomeBannerUser,
        HomeBannerRewards,
        HomeGameElement,
        HomeDepositMethods
    }
}
</script>

<style scoped>
.home {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* padding: 70px 0px; */
    justify-content: center;
}

.home .home-main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    /* background: url('~@/assets/img/background.png'); */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    /* mix-blend-mode; */
}

.home .home-info {
    width: 1300px;
    padding-bottom: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.home .home-main .home-banner-back {
    width: 1300px;
    height: 262px;
    display: flex;
    background-color: #241D2E;
}
.home .home-main .home-banner-back img {
    width : 100%;
}
.home .home-main .home-banner {
    width: 1300px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
}

.home .home-main .home-games {
    width: 1300px;
    margin-top: 20px;
    padding-top: 20px;
    /* border-top: 1px solid #20252d; */
}

.home .home-main .games-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
}

.home .home-main .games-title svg {
    margin-right: 7px;
    margin-top: 5px;
}

.home .home-main .games-title .games-title-line {
    flex: 1 1;
    height: 3px;
    background-color: #99999933;
    margin-left: 40px;
}

.home .home-main .games-list {
    display: flex;
    flex-wrap: wrap;
}

@media only screen and (max-width: 1300px) {

    .home .home-main {
        padding: 10px 10px;        
    }

    .home .home-info {
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
    }

    .home .home-main .home-banner-back {
        width: 100%;
        height: auto;
    }
    .home .home-main .home-banner {
        width: 100%;
    }

    .home .home-main .home-games {
        width: 100%;
    }

}
</style>
