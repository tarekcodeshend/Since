<template>
    <div class="modals">
        <transition name="fade">
            <div class="modals-overlay" v-show="modalsShow !== null"></div>
        </transition>
        <transition name="slide-fade" mode="out-in">
            <div class="modals-holder" v-if="modalsShow !== null" v-on:click="modalsCloseButton">
                <div class="holder-body">

                    <div class="body-modal">
                        <component v-bind:is="'Modal' + modalsShow" />
                    </div>

                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import IconClose from '@/components/icons/IconClose';
import ModalCaptcha from '@/components/modals/ModalCaptcha';
import ModalLogin from '@/components/modals/ModalLogin';
import ModalLink from '@/components/modals/ModalLink';
import ModalLinkRoblox from '@/components/modals/ModalLinkRoblox';
import ModalReset from '@/components/modals/ModalReset';
import ModalClaim from '@/components/modals/ModalClaim';
import ModalChatRules from '@/components/modals/ModalChatRules';
import ModalChatUser from '@/components/modals/ModalChatUser';
import ModalRemove from '@/components/modals/ModalRemove';
import ModalMute from '@/components/modals/ModalMute';
import ModalBan from '@/components/modals/ModalBan';
import ModalCredit from '@/components/modals/ModalCredit';
import ModalProceed from '@/components/modals/ModalProceed';
import ModalTwoStep from '@/components/modals/ModalTwoStep';
import ModalVault from '@/components/modals/ModalVault';
import ModalTip from '@/components/modals/ModalTip';
import ModalFair from '@/components/modals/ModalFair';
import ModalFairSeed from '@/components/modals/ModalFairSeed';
import ModalFairGame from '@/components/modals/ModalFairGame';
import ModalFaq from '@/components/modals/ModalFaq';
import ModalTerms from '@/components/modals/ModalTerms';
import ModalPrivacy from '@/components/modals/ModalPrivacy';
import ModalBlackjackRules from '@/components/modals/ModalBlackjackRules';
import ModalBattlesModes from '@/components/modals/ModalBattlesModes';
import ModalBattlesSelect from '@/components/modals/ModalBattlesSelect';
import ModalBox from '@/components/modals/ModalBox';
import ModalAdminConfirm from '@/components/modals/ModalAdminConfirm';
import ModalAdminUser from '@/components/modals/ModalAdminUser';
import ModalAdminAffiliate from '@/components/modals/ModalAdminAffiliate';
import ModalAdminCrypto from '@/components/modals/ModalAdminCrypto';
import ModalRedeem from '@/components/modals/ModalRedeem';
import ModalAffiliate from '@/components/modals/ModalAffiliate';
import ModalFairInfo from '@/components/modals/ModalFairInfo';

export default {
    components: {
        IconClose,
        ModalCaptcha,
        ModalLogin,
        ModalLink,
        ModalLinkRoblox,
        ModalReset,
        ModalClaim,
        ModalChatRules,
        ModalChatUser,
        ModalRemove,
        ModalMute,
        ModalBan,
        ModalVault,
        ModalCredit,
        ModalProceed,
        ModalTwoStep,
        ModalTip,
        ModalFair,
        ModalFairSeed,
        ModalFairGame,
        ModalFaq,
        ModalTerms,
        ModalPrivacy,
        ModalBlackjackRules,
        ModalBattlesModes,
        ModalBattlesSelect,
        ModalBox,
        ModalAdminConfirm,
        ModalAdminUser,
        ModalAdminAffiliate,
        ModalAdminCrypto,
        ModalRedeem,
        ModalAffiliate,
        ModalFairInfo,
    },
    methods: {
        ...mapActions([
            'modalsSetShow'
        ]),
        modalsCloseButton(e) {
            if (e.target.className === 'modals-holder' || e.target.className === 'holder-body') {
                this.modalsSetShow(null);
            }
        }
    },
    computed: {
        ...mapGetters([
            'modalsShow'
        ])
    }
}
</script>

<style scoped>
.modals {
    position: relative;
}

.modals .modals-overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #1c202980;
    user-select: none;
    z-index: 101;
}

.modals .modals-overlay.fade-enter-active,
.modals .modals-overlay.fade-leave-active {
    transition: opacity .3s ease;
}

.modals .modals-overlay.fade-enter,
.modals .modals-overlay.fade-leave-to {
    opacity: 0;
}

.modals .modals-holder {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 100px 10px;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;
    z-index: 102;
}

.modals .modals-holder::-webkit-scrollbar-track {
    background-color: transparent;
}

.modals .modals-holder::-webkit-scrollbar {
    width: 0;
    height: 0;
}

.modals .modals-holder.slide-fade-enter-active,
.modals .modals-holder.slide-fade-leave-active {
    transition: all .3s ease;
}

.modals .modals-holder.slide-fade-enter,
.modals .modals-holder.slide-fade-leave-to {
    transform: translate(0, 50px);
    opacity: 0;
}

.modals .holder-body {
    width: 100%;
    display: flex;
    justify-content: center;
}

.modals .body-modal {
    position: relative;
    border-radius: 15px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
}

.modals .body-modal button.button-close {
    width: 46px;
    height: 33px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 15px;
    right: 20px;
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
    z-index: 1;
}

.modals .body-modal.modal-square button.button-close {
    top: 15px;
    right: 15px;
}

.modals .body-modal button.button-close .button-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1c2029;
}

.modals .body-modal.modal-square button.button-close .button-inner {
    background: #0c3351;
}

.modals .body-modal button.button-close .button-inner svg {
    fill: #ddd;
    transition: fill 0.3s ease;
}

.modals .body-modal button.button-close:hover .button-inner svg {
    fill: #ffffff;
}

@media only screen and (max-width: 650px) {

    .body-modal {
        width: 100%;
    }


}
</style>
