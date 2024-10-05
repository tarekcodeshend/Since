<template>
    <footer id="footer">
        <div class="footer-inner">
            <div class="inner-info">
                <router-link to="/" class="link-logo router-link-exact-active router-link-active" aria-current="page">
                    <img src="@/assets/img/logo.png" alt="logo" class="logo-small" />
                </router-link>
                <div class="info-text"> gooncasino.live is the leading crypto gaming experience! <br> Play crash,
                    roulette, blackjack, upgrader, mines and more.
                    <div class="text-copy">Copyright © 2024 gooncasino.live. All rights reserved.</div>
                    <!-- <div class="text-kinguin">For Kinguin</div> -->
                </div>
            </div>
            <div class="inner-links">
                <div class="links-section section-games">
                    <div class="section-title">Our Games</div>
                    <div class="section-content">
                        <router-link to="/crash" class="">Crash</router-link>
                        <router-link to="/roulette" class="">Roulette</router-link>
                        <router-link to="/blackjack" class="">Blackjack</router-link>
                        <router-link to="/plinko" class="">Plinko</router-link>
                        <router-link to="/mines" class="">Mines</router-link>
                        <router-link to="/towers" class="">Towers</router-link>
                    </div>
                </div>
                <div class="links-section section-featured">
                    <div class="section-title">Featured Games</div>
                    <div class="section-content">
                        <router-link to="/roulette" class="">
                            Roulette
                            <div class="link-new">NEW</div>
                        </router-link>
                        <router-link to="/towers" class="">Towers 
                            <div class="link-new">NEW</div>
                        </router-link>
                        <!-- <router-link to="/upgrader" class="">
                            Upgrader
                            <div class="link-new">NEW</div>
                        </router-link> -->
                        <router-link to="/blackjack" class="">
                            Blackjack
                            <div class="link-new">NEW</div>
                        </router-link>
                    </div>
                </div>
                <div class="links-section section-about">
                    <div class="section-title">About Us</div>
                    <div class="section-content">
                        <router-link to="/" class="">FAQ</router-link>
                        <router-link to="/terms" class="">Terms of Service</router-link>
                        <router-link to="/fair" class="">Provably Fair</router-link>
                        <button data-v-19b897d0="">Support</button>
                    </div>
                </div>
                <div class="links-section section-community">
                    <div class="section-title">Community</div>
                    <div class="section-content">
                        <a href="https://discord.gg/Byuxek5eBY" target="_blank" class="link-discord">
                            <svg width="16" height="12" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.9049 1.44856C13.9049 1.44856 12.7586 0.183144 10.1557 0V0.399561C10.1557 0.399561 11.5833 0.313087 13.3505 2.12683C12.0166 1.12621 10.1137 0.499383 8 0.499383C5.88633 0.499383 3.98342 1.12611 2.64951 2.12683C4.41668 0.313087 5.84428 0.399561 5.84428 0.399561V0C3.24144 0.183144 2.09509 1.44856 2.09509 1.44856C0.111737 4.11231 0 9.93965 0 9.93965C1.86824 12.2872 4.21561 11.9876 4.21561 11.9876L5.07786 10.689C3.96591 10.3754 3.17184 9.65529 2.69458 9.09455C4.02609 10.0758 5.90989 10.689 8 10.689C10.0901 10.689 11.9739 10.0759 13.3054 9.09455C12.8282 9.6552 12.0341 10.3754 10.9221 10.689L11.7844 11.9876C11.7844 11.9876 14.1318 12.2873 16 9.93965C16.0002 9.93956 15.8884 4.11231 13.9049 1.44856ZM5.50907 8.29135C4.75945 8.29135 4.15178 7.61818 4.15178 6.78764C4.15178 5.95719 4.75945 5.28393 5.50907 5.28393C6.2587 5.28393 6.86636 5.95719 6.86636 6.78764C6.86636 7.61809 6.2587 8.29135 5.50907 8.29135ZM10.4911 8.29135C9.74148 8.29135 9.13381 7.61818 9.13381 6.78764C9.13381 5.95719 9.74148 5.28393 10.4911 5.28393C11.2407 5.28393 11.8484 5.95719 11.8484 6.78764C11.8484 7.61809 11.2408 8.29135 10.4911 8.29135Z">
                                </path>
                            </svg>
                        </a>
                        <a href="https://x.com/GoonCoin_SOL" target="_blank" class="link-twitter">
                            <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16 1.69446C15.405 1.97358 14.771 2.1586 14.11 2.24843C14.79 1.81424 15.309 1.13193 15.553 0.309528C14.919 0.713778 14.219 0.99932 13.473 1.15867C12.871 0.473154 12.013 0.048584 11.077 0.048584C9.261 0.048584 7.799 1.62495 7.799 3.55743C7.799 3.83549 7.821 4.10285 7.875 4.35738C5.148 4.21514 2.735 2.81738 1.114 0.688112C0.831 1.21321 0.665 1.81424 0.665 2.46125C0.665 3.67614 1.25 4.75307 2.122 5.37656C1.595 5.36586 1.078 5.20224 0.64 4.9445C0.64 4.95519 0.64 4.9691 0.64 4.983C0.64 6.68769 1.777 8.10364 3.268 8.42982C3.001 8.50789 2.71 8.54532 2.408 8.54532C2.198 8.54532 1.986 8.53249 1.787 8.48543C2.212 9.87464 3.418 10.896 4.852 10.9291C3.736 11.8627 2.319 12.4253 0.785 12.4253C0.516 12.4253 0.258 12.4124 0 12.3771C1.453 13.3792 3.175 13.9514 5.032 13.9514C11.068 13.9514 14.368 8.60414 14.368 3.96917C14.368 3.8141 14.363 3.66438 14.356 3.51572C15.007 3.02164 15.554 2.40457 16 1.69446Z">
                                </path>
                            </svg>
                        </a>                 
                        <a href="https://t.me/GoonCoin_SOL" target="_blank" class="link-telegram">
                            <img src="@/assets/img/telegram.png" alt="telegram" />
                        </a>
                        <a href="https://www.gooncoinsol.com/" target="_blank" class="link-telegram">
                            <img src="@/assets/img/site.png" alt="telegram" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { mapActions } from 'vuex';
import IconBattles from '@/components/icons/IconBattles';
import IconCrash from '@/components/icons/IconCrash';
import IconRoll from '@/components/icons/IconRoll';
import IconDuels from '@/components/icons/IconDuels';

export default {
    name: 'Footer',
    components: {
        IconBattles,
        IconCrash,
        IconRoll,
        IconDuels
    },
    methods: {
        ...mapActions([
            'modalsSetShow'
        ])
    }
}
</script>

<style>
footer#footer {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 50px 20px;
    background: #100D14;
}

footer#footer .footer-inner {
    width: 1300px;
    display: flex;
    justify-content: space-between;
}

footer#footer .inner-info {
    width: 400px;
    margin-right: 70px;
}

footer#footer a.link-logo {
    display: flex;
    align-items: center;
}

footer#footer a.link-logo img {
    height: 34px;
    margin-right: 8px;
}

footer#footer a.link-logo span {
    font-size: 23px;
    font-weight: 600;
    color: #e7eaf7;
}

footer#footer .info-text {
    margin-top: 20px;
    font-size: 12px;
    font-weight: 600;
    color: #CABFDD;
}

footer#footer .text-copy {
    margin-top: 20px;
}

footer#footer .text-kinguin {
    margin-top: 20px;
    font-size: 10px !important;
}

footer#footer .inner-links {
    display: flex;
    flex-wrap: wrap;
}

footer#footer .links-section {
    margin-right: 50px;
}

footer#footer .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
}

footer#footer .section-content {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

footer#footer .section-content a:first-of-type {
    margin-top: 0;
}

footer#footer .section-content a,
footer#footer .section-content button {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #CABFDD;
    transition: color .3s ease;
}

footer#footer .section-content a .link-hot {
    background: #fd3b31;
}

section-content a:hover {
    color: #fff;
}

footer#footer .section-content a .link-hot,
footer#footer .section-content a .link-new {
    height: 16px;
    display: flex;
    align-items: center;
    margin-left: 8px;
    padding: 0 3px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 700;
    color: #fff;
}

footer#footer .section-content a .link-new {
    background: #fd3b31;
}

footer#footer .section-content a .link-hot,
footer#footer .section-content a .link-new {
    height: 16px;
    display: flex;
    align-items: center;
    margin-left: 8px;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 8px;
    font-weight: 700;
    color: #fff;
}

footer#footer .links-section:last-child {
    margin-right: 0;
}

footer#footer .section-content a.link-twitter {
    background: #234965;
}

footer#footer .section-content a.link-twitter svg {
    fill: #53b5ff;
}

footer#footer .section-content a.link-discord {
    background: #2f3762;
}

footer#footer .section-content a.link-twitter,  
footer#footer .section-content a.link-telegram {
    margin-left: 10px;
    background: #2f3762;
}
footer#footer .section-content a.link-telegram:first-of-type {
    margin-left: 0px;
}
footer#footer .section-content a.link-telegram img {
    width: 17px;
    height: 17px;
}

footer#footer .section-content a.link-discord,
footer#footer .section-content a.link-telegram,
footer#footer .section-content a.link-twitter {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0;
    border-radius: 5px;
}

footer#footer .section-content a,
footer#footer .section-content button {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #CABFDD;
    transition: color .3s ease;
}

footer#footer .section-content a:hover,
footer#footer .section-content button:hover {
    color: #fff !important;
}

footer#footer .section-content a.link-discord svg {
    fill: #CABFDD;
}

footer#footer .links-section.section-community .section-content {
    flex-direction: row;
    align-items: center;
}

@media only screen and (max-width: 1050px) {
    footer#footer .inner-info {
        width: 100%;
        margin-right: 0px;
    }

    footer#footer .footer-inner {
        display: flex;
        flex-direction: column-reverse;
        gap: 50px;
    }
}

@media only screen and (max-width: 514px) {
    footer#footer .links-section {
        margin-right: 50px;
        margin-top: 30px;
    }
}
</style>
