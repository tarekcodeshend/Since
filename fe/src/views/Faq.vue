<template>
    <div class="faq">
        <div class="faq-header">
            <div class="header-title">FREQUENTLY ASKED QUESTIONS</div>
            <div class="header-support"> Cant find anything related to you problem?
                <a href="https://discord.gg/gooncasino" target="_blank">Contact Support</a>
            </div>
        </div>
        <div class="faq-content">
            <div class="content-column">
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[0] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(0)">
                        <span> What is gooncasino?</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[0] === true }">
                        <div class="content-inner">gooncasino is a virtual arcade designed for Roblox players to multiply their Robux! We are the most innovative arcade, and we strive to bring you the best experiences.</div>
                    </div>
                </div>
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[1] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(1)">
                        <span> Why do you need my Roblox credentials? </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[1] === true }">
                        <div class="content-inner"> In order for us to automate our deposit and withdraw system, we utilize our P2P system to facilitate seamless transactions for depositors & withdrawers. gooncasino ensures user security and we do not store your password. In any circumstances you feel unsafe with us having your credentials, you can simply invalidate them by changing your password on Roblox.com.</div>
                    </div>
                </div>
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[2] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(2)">
                        <span> What are the coins? </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[2] === true }">
                        <div class="content-inner"> Our balance is displayed as a coin, but it has a conversion rate of 1 coin to 1 Robux. We allow you to withdraw these coins to Roblox.com at a 1-to-1 rate.</div>
                    </div>
                </div>
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[9] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(9)">
                        <span> How does the deposit and withdrawal system work?  </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[9] === true }">
                        <div class="content-inner">We use a Peer-to-Peer (P2P) system to facilitate the transactions on our site. In this case, there may be extended wait times for limited deposits and/or Robux deposits. In order to deposit, someone must withdraw, and vice versa. gooncasino will subsidize long queue times to ensure user satisfaction.</div>
                    </div>
                </div>
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[10] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(10)">
                        <span> Is there a maximum bet or profit? </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[10] === true }">
                        <div class="content-inner">Yes, each game has a maximum bet and a maximum profit allotted for each round. You can find it located inside each game.</div>
                    </div>
                </div>
            </div>
            <div class="content-column">
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[3] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(3)">
                        <span> Can I transfer coins to another account? </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[3] === true }">
                        <div class="content-inner"> Yes, you can transfer coins to another account by simplifying clicking on a user's profile and clicking the Tip User button.</div>
                    </div>
                </div>
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[4] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(4)">
                        <span> I am missing coins, what now? </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[4] === true }">
                        <div class="content-inner"> Please ensure you've not given access to your gooncasino account or your Roblox account. In the case you are compromised, we will assist you with regaining access to your account. Although, we do not issue balance adjustments to compensate for the loss, as your account security is your responsibility. If this involves a game issue, open a ticket in the discord.</div>
                    </div>
                </div>
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[5] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(5)">
                        <span> I deposited with cryptocurrency and I still have not received my deposit. </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[5] === true }">
                        <div class="content-inner">If you’ve still not received your deposit after 6 confirmations, please open a ticket inside our discord explaining the situation and providing transaction IDs.</div>
                    </div>
                </div>
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[11] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(11)">
                        <span> What happens if my internet disconnects during a Crash round? </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[11] === true }">
                        <div class="content-inner">Whether your client is connected or disconnected, the auto-cashout feature will work as intended. We highly recommend you use this feature if your internet connection is faulty or if you have poor internet reliability.</div>
                    </div>
                </div>
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[12] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(12)">
                        <span> Does the Crash game have a maximum multiplier? </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[12] === true }">
                        <div class="content-inner">Our Crash game has no limit! Although, you will be automatically cashed out if you hit our maximum profit.</div>
                    </div>
                </div>
            </div>
            <div class="content-column">
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[6] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(6)">
                        <span> I have discovered a vulnerability or an exploit, what now? </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[6] === true }">
                        <div class="content-inner"> Join our discord and create a ticket. You will be rewarded for reporting any vulnerability or exploit.</div>
                    </div>
                </div>
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[7] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(7)">
                        <span> What is "Rain Abuse	"? </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[7] === true }">
                        <div class="content-inner">The rain coins distributed throughout the 30-minute rain feature are intended to be played with on the games provided on our site exclusively. Saving up free rain coins over an extended period of time and/or not using them to genuinely participate in the games provided is considered rain abuse and will result in a ban. Please note, all rain bans are permanent and will not be lifted.</div>
                    </div>
                </div>
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[8] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(8)">
                        <span> How much commission do I get when my referrals place a bet? </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[8] === true }">
                        <div class="content-inner"> Every time someone you've referred places a bet, you receive 1% of that overall wager. In the instance that someone wagers 1,000,000 coins, you'd receive 10,000.
                        </div>
                    </div>
                </div>
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[13] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(13)">
                        <span> How do I know that gooncasino is fair & doesn't rig results?  </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[13] === true }">
                        <div class="content-inner">gooncasino is a provably fair casino. You can check all game results with our provably fair system, found at the bottom of our website.
                        </div>
                    </div>
                </div>
                <div class="faq-question" v-bind:class="{ 'question-open': faqOpenedTab[14] === true }">
                    <button class="button-toggle" v-on:click="faqSetOpenedTab(14)">
                        <span> Can I make money by promoting the website? </span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                            </path>
                        </svg>
                    </button>
                    <div class="question-content" v-bind:class="{ 'faq-opened-style': faqOpenedTab[14] === true }">
                        <div class="content-inner">If you're an influencer who is looking to be sponsored by us, please join our Discord server and open a ticket.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Faq',
    metaInfo: {
        title: 'FAQ - gooncasino.live'
    },
    data() {
        return {
            faqOpenedTab: [false, false, false, false, false, false, false, false, false],
        }
    },
    methods: {
        faqSetOpenedTab(tabID) {
            this.$set(this.faqOpenedTab, tabID, !this.faqOpenedTab[tabID]);
        },
    }

}
</script>

<style scoped>
.faq-question {
    width: 100%;
    margin-top: 12px;
    border-radius: 5px;
    overflow: hidden;
    background: #212732;
    transition: all .3s ease
}

.faq-question:first-child {
    margin-top: 0
}

.faq-question button.button-toggle {
    width: 100%;
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
}

.faq-question button.button-toggle span {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 600;
    color: #767c8b;
    text-align: left;
    transition: all .3s ease
}

.faq-question.question-open button.button-toggle span {
    color: #fff
}

.faq-question button.button-toggle svg {
    fill: #767c8b;
    transition: all .3s ease
}

.faq-question.question-open button.button-toggle svg {
    transform: rotate(180deg)
}

.faq-question .question-content {
    width: 100%;
    padding: 0 16px;
    overflow: hidden;
    max-height: 0px;
    transition: all .4s ease;
}

.faq-opened-style {
    max-height: 300px !important;
    transition: all .4s ease;
}

.faq-question .content-inner {
    padding: 16px 0;
    font-size: 14px;
    font-weight: 500;
    color: #767c8b;
    border-top: 1px solid #2c3443
}

.faq-question .content-inner a {
    color: #fd3b31
}

.faq {
    width: 100%;
    min-height: calc(100vh - 112px);
    padding: 40px
}

.faq .faq-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid #20252d
}

.faq .header-title {
    font-size: 24px;
    font-weight: 700;
    color: #596076
}

.faq .header-support {
    display: flex;
    font-size: 14px;
    font-weight: 500;
    color: #596076
}

.faq .header-support a {
    margin-left: 5px;
    font-size: 14px;
    font-weight: 600;
    color: #fd3b31
}

.faq .faq-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px
}

.faq .content-column {
    width: calc(33.33% - 10.66px);
    margin-right: 16px
}

.faq .content-column:nth-child(3n) {
    margin-right: 0
}

@media only screen and (max-width: 1650px) {
    .faq {
        padding: 40px 15px 40px 15px
    }
}

@media only screen and (max-width: 1100px) {
    .faq .content-column {
        width: calc(50% - 8px);
        margin-right: 16px;
        margin-top: 12px
    }

    .faq .content-column:first-child,
    .faq .content-column:nth-child(2) {
        margin-top: 0
    }

    .faq .content-column:nth-child(3n) {
        margin-right: 16px
    }

    .faq .content-column:nth-child(2n) {
        margin-right: 0
    }
}

@media only screen and (max-width: 1000px) {
    .faq .faq-header {
        flex-direction: column;
        align-items: flex-start
    }

    .faq .header-support {
        margin-top: 12px
    }
}

@media only screen and (max-width: 700px) {
    .faq .content-column {
        width: 100%;
        margin-right: 0 !important;
        margin-top: 12px !important
    }

    .faq .content-column:first-child {
        margin-top: 0 !important
    }
}

@media only screen and (max-width: 475px) {
    .faq .header-support {
        flex-direction: column
    }

    .faq .header-support a {
        margin-left: 0
    }
}
</style>