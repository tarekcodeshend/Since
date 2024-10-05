<template>
    <div class="chat-message-element" v-bind:class="{
        'element-rain': message.type === 'rainTip' || message.type === 'rainCompleted',
        'element-system': message.type === 'system'
    }">
        <div v-if="message.type === 'rainTip' || message.type === 'rainCompleted'" class="element-rain">
            <div class="rain-top">
                <button class="button-user">
                    <AvatarImage v-bind:image="'system'" />
                    <div class="user-username">System</div>
                    <BoxRank v-bind:rank="chatGetRank" />
                </button>
            </div>
            <div class="element-text">
                <div class="rain-header">
                    <IconRainGradient />
                    <span class="text-default-theme">{{ message.type === 'rainTip' ? 'RAIN TIP' : 'RAIN COMPLETED!'
                        }}</span>
                </div>
                <div class="rain-content">
                    <div v-if="message.type === 'rainTip'" class="content-tip">
                        <span v-html="message.transaction.user.username" class="content-username"></span>
                        tipped
                        <div class="tip-amount">
                            <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                            <span>{{ chatFormatValue(Math.abs(message.transaction.amount)).split('.')[0] }}</span>.{{
                                chatFormatValue(Math.abs(message.transaction.amount)).split('.')[1] }}
                        </div>
                    </div>
                    <div v-else class="content-completed">
                        {{ message.rain.participants.length }} participants have been awarded
                        <div class="completed-amount">
                            <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                            <span>{{ chatFormatValue(Math.abs(message.rain.amount)).split('.')[0] }}</span>.{{
                                chatFormatValue(Math.abs(message.rain.amount)).split('.')[1] }}
                        </div>
                        in total from the rain.
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="message.type === 'system'" class="element-system">
            <div class="system-header">
                <IconSystem />
                <span class="text-orange-gradient">SYSTEM MESSAGE</span>
            </div>
            <div v-html="message.message" class="system-content"></div>
        </div>
        <div v-else class="element-message">
            <div class="element-top">
                <button v-on:click="chatUserButton()" class="button-user">
                    <AvatarImage v-bind:image="message.user.avatar" />
                    <div class="user-username">{{ message.user.username }}</div>
                    <BoxLevel v-if="['admin', 'mod', 'partner'].includes(message.user.rank) === false"
                        v-bind:level="message.user.level" v-bind:color="chatGetLevelColor" />
                    <BoxRank v-if="chatGetRank !== null" v-bind:rank="chatGetRank" />
                </button>
                <div v-if="authUser.user !== null && (authUser.user.rank === 'admin' || authUser.user.rank === 'mod')"
                    class="top-admin">
                    <button v-on:click="chatMuteButton()" class="button-mute">
                        <div class="button-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path
                                    d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                            </svg>
                        </div>
                    </button>
                    <button v-on:click="chatRemoveButton()" class="button-remove">
                        <div class="button-inner">
                            <svg width="10" height="9" viewBox="0 0 10 9" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.2977 9C0.216509 9 0.144339 8.97429 0.0811908 8.92286C0.0270636 8.86286 0 8.79429 0 8.71714C0 8.66571 0.0135318 8.61857 0.0405954 8.57572L2.88227 4.39714L0.324763 0.424286C0.2977 0.372857 0.284168 0.325714 0.284168 0.282857C0.284168 0.205714 0.311231 0.141429 0.365359 0.0900004C0.428507 0.0300001 0.500677 0 0.581867 0H3.51827C3.77086 0 3.96031 0.107143 4.0866 0.321429L5.03383 1.89L6.06225 0.321429C6.18854 0.107143 6.37799 0 6.63058 0H9.43166C9.51286 0 9.58051 0.0300001 9.63464 0.0900004C9.69779 0.141429 9.72936 0.205714 9.72936 0.282857C9.72936 0.334286 9.71583 0.381428 9.68877 0.424286L7.07713 4.35857L9.95941 8.57572C9.98647 8.61857 10 8.66571 10 8.71714C10 8.79429 9.96843 8.86286 9.90528 8.92286C9.85115 8.97429 9.78349 9 9.7023 9H6.65765C6.41407 9 6.22914 8.90143 6.10284 8.70429L4.92558 6.98143L3.80244 8.70429C3.67614 8.90143 3.4912 9 3.24763 9H0.2977Z" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <div v-if="chatGetGameLink === null" v-html="message.message" class="element-text"></div>
            <div v-else class="element-text">
                <button v-on:click="chatLinkButton()" class="button-game">
                    <div class="button-inner">
                        <svg v-if="chatGetGameLink.includes('duels')" width="12" height="12" viewBox="0 0 12 12"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.88875 6.73564L5.10999 9.02443L4.22187 9.9397L5.11125 10.8556L4.2225 11.7709L2.66688 10.1688L0.888749 12L0 11.0847L1.77813 9.25293L0.222502 7.65155L1.11125 6.73629L2 7.6509L2.88812 6.73564H2.88875ZM0.34318 0L2.57197 0.00194187L9.99937 7.65155L10.8887 6.73629L11.7775 7.65155L10.2225 9.25357L12 11.0847L11.1113 12L9.33312 10.1688L7.7775 11.7709L6.88875 10.8556L7.7775 9.9397L0.345066 2.28556L0.34318 0ZM9.42992 0L11.6568 0.00194187L11.6581 2.28232L9.11062 4.90512L6.88812 2.61697L9.42992 0Z"
                                fill="url(#paint0_linear_3734_2952)" />
                            <defs>
                                <linearGradient id="paint0_linear_3734_2952" x1="12" y1="0" x2="-2.09436" y2="3.45416"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#00FFC2" />
                                    <stop offset="1" stop-color="#00AA6D" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22"
                            fill="none">
                            <path
                                d="M14.9944 11.329C15.0822 11.3976 15.1637 11.5122 15.2391 11.5967L18.0368 14.7287L19.1455 13.6372C18.9715 13.4602 18.6748 13.2692 18.6579 13C18.6497 12.8682 18.6945 12.7311 18.7841 12.6336C18.8733 12.5367 19.0059 12.4713 19.1383 12.4674C19.3106 12.4624 19.4188 12.5504 19.5384 12.6613C19.8397 12.9407 20.121 13.2481 20.411 13.5396C20.5647 13.694 20.7746 13.8548 20.8954 14.0346C20.9398 14.1007 20.96 14.2032 20.9616 14.2815C20.9644 14.4181 20.9131 14.5571 20.8145 14.6529C20.7217 14.7431 20.5849 14.7849 20.4569 14.7825C20.2088 14.7778 20.0327 14.5433 19.8719 14.3805C19.3883 14.8714 18.8925 15.3667 18.3796 15.8266C18.8188 16.2918 19.2815 16.7365 19.7362 17.1864L21.6971 19.1443C21.8437 19.08 21.9918 19.0231 22.1449 18.9759C22.2847 19.0928 22.409 19.2315 22.5358 19.3623C22.7258 19.5584 22.9166 19.7532 23.1119 19.9441C23 20.0771 22.8701 20.1981 22.7468 20.3206L22.1621 20.9005C21.8072 21.2527 21.4662 21.6238 21.1038 21.9675C20.766 21.6137 20.4085 21.2799 20.0645 20.9325C20.1268 20.7916 20.2141 20.6538 20.2888 20.5185C20.0405 20.2369 19.7556 19.9782 19.4882 19.7141L18.0601 18.3064L16.9472 17.2346C16.446 17.7291 15.9537 18.2322 15.4445 18.7186C15.5931 18.8593 15.8158 19.026 15.8294 19.2452C15.8372 19.3712 15.7803 19.4975 15.698 19.5901C15.6023 19.6977 15.4592 19.8037 15.3107 19.8067C15.1777 19.8094 15.0837 19.7381 14.9914 19.6509C14.7256 19.3997 14.4719 19.1329 14.2123 18.8751C14.0462 18.71 13.8334 18.5407 13.7024 18.3472C13.6536 18.2752 13.6266 18.1946 13.6267 18.1072C13.6269 17.9854 13.6805 17.8686 13.7676 17.7844C13.8561 17.6989 13.979 17.6459 14.1028 17.6496C14.3366 17.6566 14.5121 17.9001 14.6587 18.0569C14.9485 17.7559 15.2467 17.4489 15.5583 17.1706C14.9587 16.7457 14.4174 16.2407 13.8566 15.7671L12.7092 14.8037C12.46 14.5961 12.207 14.3931 11.9652 14.1768C12.4016 13.7884 12.823 13.3756 13.2445 12.9709C13.7962 13.5458 14.3633 14.1059 14.9247 14.6713C15.4466 15.1969 15.9624 15.7296 16.4929 16.2465C16.6636 16.0848 16.8314 15.9203 16.9991 15.7555C16.5002 15.2223 15.9751 14.7123 15.4573 14.1975C15.0937 13.8361 14.7375 13.4675 14.3709 13.1089C14.1618 12.9044 13.945 12.7078 13.7376 12.5018C13.9196 12.3214 14.1145 12.1522 14.2992 11.974C14.5247 11.7566 14.7462 11.5207 14.9944 11.329Z"
                                fill="#FD3B31"></path>
                            <path
                                d="M0.843166 0C1.02821 0.04771 1.20792 0.122969 1.38699 0.189043L2.26971 0.517313L4.95612 1.55288L5.88713 1.92443C6.0254 1.98032 6.19099 2.02839 6.31545 2.10992C6.4899 2.22415 6.69398 2.4849 6.84118 2.64178L10.3036 6.33115C10.7294 6.78347 11.1771 7.22458 11.5853 7.6922C11.3944 7.92401 11.1652 8.13348 10.9553 8.34883C10.7226 8.58753 10.4952 8.8445 10.2459 9.06529C9.97827 8.8389 9.732 8.56958 9.47932 8.32531L8.00262 6.91463C7.07463 6.03667 6.15384 5.14933 5.21374 4.28446C4.74072 3.84929 4.24844 3.43566 3.77655 2.99918C3.77648 3.00529 3.77725 3.0115 3.7763 3.01754C3.77532 3.02393 3.77265 3.02997 3.7708 3.03615L3.78975 3.02432L3.78793 3.04686L3.79987 3.03484L3.80716 3.0702L3.81525 3.04571L3.8106 3.06956C3.91012 3.16623 3.99802 3.27983 4.08868 3.38528L4.57595 3.94943C5.06008 4.50276 5.55454 5.0476 6.05362 5.58742C7.01268 6.62477 8.00008 7.63533 8.96768 8.66458C9.24196 8.95637 9.52918 9.24028 9.79599 9.53852C9.66078 9.71415 9.49126 9.87375 9.33735 10.0339C9.07925 10.3024 8.82194 10.5705 8.57018 10.8451C8.23101 10.5541 7.90969 10.231 7.5808 9.92773L4.70418 7.2284C4.45465 6.99485 2.9552 5.65698 2.87699 5.51301C2.80797 5.38594 2.76299 5.19642 2.71223 5.0571L2.2788 3.8591C1.98003 3.02778 1.66472 2.20299 1.35472 1.37582C1.18312 0.917973 1.0249 0.453865 0.843166 0Z"
                                fill="#FD3B31"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M22.6019 0.0156167L22.5859 0.00752082C22.2179 0.136781 21.8546 0.279913 21.4916 0.422936C21.386 0.464557 21.2801 0.506276 21.1744 0.547535L18.6177 1.5562L17.9049 1.83315C17.8571 1.85129 17.8053 1.8688 17.7522 1.88679C17.6064 1.93613 17.45 1.98905 17.3356 2.06791C17.2337 2.1381 17.1437 2.23551 17.0568 2.32953C17.031 2.35746 17.0054 2.38511 16.9799 2.41164L16.4313 2.98763L14.6524 4.86295L11.4083 8.31276C11.0791 8.65927 10.7465 9.00288 10.4138 9.34652C9.8877 9.88985 9.36147 10.4334 8.8489 10.9885C8.37705 11.4995 7.91498 12.0203 7.45284 12.5412C6.79498 13.2827 6.13687 14.0245 5.45038 14.7382L5.28276 14.5779C4.96809 14.2769 4.6532 13.9757 4.33218 13.6815C4.36394 13.6498 4.39949 13.6164 4.43667 13.5816C4.62165 13.408 4.84703 13.1967 4.84756 12.9581C4.84787 12.8134 4.78309 12.6709 4.67886 12.5713C4.5873 12.4838 4.46744 12.4338 4.34037 12.437C4.24701 12.4393 4.18738 12.4697 4.11351 12.5232C3.93838 12.6499 3.7604 12.8396 3.5936 13.0174C3.52961 13.0856 3.46728 13.1521 3.40738 13.2126C3.32413 13.2966 3.23882 13.3791 3.15344 13.4617C3.00729 13.6031 2.86092 13.7447 2.7245 13.8942C2.61537 14.0138 2.52189 14.1359 2.52918 14.307C2.53496 14.4428 2.60662 14.5675 2.70632 14.657C2.80656 14.747 2.93667 14.8064 3.07329 14.799C3.28666 14.7876 3.4389 14.608 3.57085 14.4524L3.58224 14.439L3.60242 14.4153C3.61772 14.3974 3.63271 14.3793 3.64756 14.3611C4.11606 14.8577 4.59893 15.3444 5.08171 15.8272C4.71123 16.2251 4.3231 16.608 3.93525 16.9906C3.72258 17.2004 3.51 17.4101 3.30046 17.6222L2.3413 18.5873C2.29616 18.6324 2.2512 18.6782 2.20612 18.7242C2.07679 18.856 1.94638 18.9889 1.80753 19.1079C1.67083 19.0432 1.52742 18.9991 1.37829 18.9734C1.27551 19.0769 1.17113 19.1799 1.06658 19.2831C0.837155 19.5095 0.606762 19.7369 0.390625 19.9722C0.454472 20.0372 0.518185 20.1024 0.581913 20.1676L0.58282 20.1685C0.77024 20.3602 0.957793 20.5521 1.14925 20.7395C1.34138 20.9226 1.52805 21.1123 1.7147 21.302C1.9479 21.539 2.18111 21.776 2.42488 22C2.5522 21.878 2.67641 21.7528 2.80062 21.6276C2.87426 21.5533 2.94816 21.4789 3.02245 21.4053C3.06249 21.3656 3.10336 21.3262 3.14434 21.2867C3.25509 21.1799 3.36679 21.0722 3.46558 20.9564C3.39592 20.8081 3.33569 20.6572 3.27601 20.5046L5.31621 18.4499C5.44345 18.3222 5.57218 18.1954 5.70103 18.0684C5.99389 17.7799 6.28742 17.4906 6.56536 17.19L8.09632 18.7145L8.06858 18.7377C7.92551 18.8573 7.7746 18.9835 7.7551 19.1824C7.74159 19.3201 7.7845 19.4593 7.87421 19.5647C7.96264 19.6686 8.09054 19.7434 8.22809 19.7532C8.37709 19.7638 8.47995 19.6904 8.58515 19.5958C8.74895 19.4485 8.90714 19.2933 9.06513 19.1382C9.15429 19.0508 9.24351 18.9632 9.3335 18.8773C9.38093 18.8321 9.43276 18.7868 9.48546 18.7407C9.60822 18.6334 9.73565 18.522 9.8228 18.3977C9.87751 18.3197 9.90964 18.2288 9.91251 18.1333C9.91647 18.0017 9.86337 17.8744 9.77065 17.7816C9.6843 17.6953 9.56701 17.6432 9.4443 17.644C9.22427 17.6454 9.06363 17.8125 8.91753 17.9645C8.89569 17.9872 8.87417 18.0096 8.85283 18.031C8.76074 17.9421 8.66987 17.8497 8.57868 17.7569C8.39992 17.5749 8.21992 17.3917 8.02719 17.232C8.34882 16.9996 8.64512 16.7349 8.94084 16.4707C8.98284 16.4332 9.02491 16.3956 9.06695 16.3582L10.16 15.398C12.0056 13.7912 13.7728 12.1001 15.54 10.4088C16.0992 9.87375 16.6585 9.33854 17.2201 8.80609L19.6332 6.51189L20.3128 5.84935C20.3411 5.82141 20.3714 5.7933 20.4021 5.7648C20.4792 5.69323 20.5591 5.61905 20.6173 5.53859C20.6423 5.50408 20.6582 5.46641 20.6726 5.42669L21.9587 1.81181C22.0182 1.64907 22.079 1.48655 22.1397 1.32397C22.2553 1.01476 22.371 0.705187 22.4781 0.393664C22.4888 0.362351 22.5028 0.326293 22.5174 0.28837C22.5515 0.200269 22.5895 0.101999 22.6006 0.0298752C22.6011 0.0267324 22.6013 0.0235552 22.6015 0.0203781L22.6019 0.0156167ZM19.7899 2.94071L19.783 2.93419C18.9059 3.69225 18.0651 4.49017 17.2243 5.28796C17.0914 5.41412 16.9584 5.54028 16.8254 5.66628C14.9173 7.47267 13.0416 9.31636 11.179 11.1695C10.7399 11.6064 10.2971 12.039 9.85426 12.4716C9.76009 12.5636 9.66584 12.6557 9.5717 12.7477C8.91273 13.392 8.25567 14.0382 7.61302 14.7002C7.51016 14.8061 7.40591 14.9115 7.30151 15.017C7.0503 15.2709 6.79825 15.5256 6.56273 15.7914L6.82202 16.0477C6.84268 16.0678 6.86356 16.0878 6.88446 16.1078C6.93568 16.1568 6.98702 16.2059 7.03562 16.2572L11.0514 12.149C11.248 11.9498 11.4489 11.7549 11.6499 11.56C11.8421 11.3735 12.0344 11.187 12.2229 10.9967L14.3086 8.85582C14.4369 8.7239 14.5653 8.59206 14.6937 8.46023C15.4518 7.68188 16.2096 6.9038 16.9539 6.11192C17.0638 5.99503 17.1738 5.87829 17.2838 5.76156C18.0037 4.99779 18.7231 4.23444 19.3965 3.42832C19.4144 3.40677 19.4438 3.37348 19.4787 3.33397C19.4929 3.31782 19.5081 3.30062 19.5238 3.28278C19.6336 3.15786 19.7684 3.0006 19.7899 2.94071Z"
                                fill="#FD3B31"></path>
                        </svg>
                        {{ chatGetGameLink.includes('duels') ? 'DICE DUEL' : 'CASE BATTLE' }}
                    </div>
                </button>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import IconRainGradient from '@/components/icons/IconRainGradient';
import IconSystem from '@/components/icons/IconSystem';
import AvatarImage from '@/components/AvatarImage';
import BoxLevel from '@/components/BoxLevel';
import BoxRank from '@/components/BoxRank';

export default {
    name: 'ChatMessageElement',
    components: {
        IconRainGradient,
        IconSystem,
        AvatarImage,
        BoxLevel,
        BoxRank
    },
    props: [
        'message'
    ],
    methods: {
        ...mapActions([
            'modalsSetShow',
            'modalsSetData',
            'generalSetSidebarMobile',
            'generalSetUserInfoData'
        ]),
        chatFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        chatUserButton() {
            // if (this.authUser.user === null || this.message.user.rank === 'system') { return; }

            this.generalSetUserInfoData(this.message.user);
            this.modalsSetShow('ChatUser');
        },
        chatMuteButton() {
            this.generalSetUserInfoData(this.message.user);
            this.modalsSetShow('Mute');
        },
        chatRemoveButton() {
            this.modalsSetData({ user: this.message.user, message: this.message });
            this.modalsSetShow('Remove');
        },
        async chatLinkButton() {
            this.generalSetSidebarMobile(null);
            if (this.chatGetGameLink !== this.$route.fullPath) { this.$router.replace(this.chatGetGameLink); }
        }
    },
    computed: {
        ...mapGetters([
            'authUser'
        ]),
        chatGetLevelColor() {
            let color = '';

            if (this.message.user === null) return '';

            if (this.message.user.level >= 10 && this.message.user.level < 20) { color = 'blue'; }
            else if (this.message.user.level >= 20 && this.message.user.level < 30) { color = 'green'; }
            else if (this.message.user.level >= 30 && this.message.user.level < 50) { color = 'yellow'; }
            else if (this.message.user.level >= 50) { color = 'purple'; }

            return color;
        },
        chatGetRank() {
            // let rank = this.message.user.rakeback;
            let rank = null;

            if (this.message.type === 'rainTip' || this.message.type === 'rainCompleted') {
                return 'system';
            }
            else if (['admin', 'mod', 'partner'].includes(this.message.user.rank) === true) { rank = this.message.user.rank; }

            return rank;
        },
        chatGetGameLink() {
            let link = null;

            if (
                this.message.message.replace(/&#x2F;/g, '/').match(/(gooncasino\.com\/battles\/[0-9a-fA-F]{24})/) !== null ||
                this.message.message.replace(/&#x2F;/g, '/').match(/(gooncasino\.com\/battles\/[0-9a-fA-F]{24})/) !== null ||
                this.message.message.replace(/&#x2F;/g, '/').match(/(gooncasino\.onrender\.com\/battles\/[0-9a-fA-F]{24})/) !== null ||
                this.message.message.replace(/&#x2F;/g, '/').match(/(gooncasino-stage\.onrender\.com\/battles\/[0-9a-fA-F]{24})/) !== null ||
                this.message.message.replace(/&#x2F;/g, '/').match(/(gooncasino\.com\/duels\?game=[0-9a-fA-F]{24})$/) !== null
            ) {
                link = this.message.message.replace(/&#x2F;/g, '/').replace(/.*gooncasino\.com/, '');
            }
            if (
                this.message.message.replace(/&#x2F;/g, '/').match(/(gooncasino\.com\/battles\/[0-9a-fA-F]{24})/) !== null

            ) {
                link = this.message.message.replace(/&#x2F;/g, '/').replace(/.*gooncasino\.com/, '');
            }
            if (
                this.message.message.replace(/&#x2F;/g, '/').match(/(gooncasino\.onrender\.com\/battles\/[0-9a-fA-F]{24})/) !== null
            ) {
                link = this.message.message.replace(/&#x2F;/g, '/').replace(/.*gooncasino\.onrender\.com/, '');
            }
            if (
                this.message.message.replace(/&#x2F;/g, '/').match(/(gooncasino-stage\.onrender\.com\/battles\/[0-9a-fA-F]{24})/) !== null
            ) {
                link = this.message.message.replace(/&#x2F;/g, '/').replace(/.*gooncasino-stage\.onrender\.com/, '');
            }

            return link;
        }
    }
}
</script>

<style scoped>
.chat-message-element {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 7px;
    padding: 5px 8px;
    border-radius: 5px
}

.chat-message-element .element-message {
    width: 100%;
}

.chat-message-element .element-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center
}

.chat-message-element .element-top .top-admin {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    gap: 2px;
}

.chat-message-element .top-system,
.chat-message-element button.button-user {
    display: flex;
    align-items: center
}

.chat-message-element .system-avatar,
.chat-message-element button.button-user .avatar-image {
    width: 30px;
    height: 30px;
    margin-right: 4px;
    border-radius: 100%;
    background-color: #2B2339;
}

.chat-message-element .system-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    background: #67c4f8
}

.chat-message-element .system-rank,
.chat-message-element .user-rank {
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
    background: #a1aeb5
}

.chat-message-element .system-rank {
    background: #67c4f8
}

.chat-message-element button.button-user.user-gold .user-rank {
    background: #f7d814
}

.chat-message-element button.button-user.user-diamond .user-rank {
    background: #1fb1ff
}

.chat-message-element button.button-user.user-pink .user-rank {
    background: #e614f7
}

.chat-message-element button.button-user.user-mod .user-rank {
    background: #00c74d
}

.chat-message-element button.button-user.user-admin .user-rank {
    background: #fd3b31
}

.chat-message-element .user-rank svg {
    width: 11px;
    margin-right: 5px;
    margin-bottom: 1px;
    fill: #fff
}

.chat-message-element .system-username,
.chat-message-element .user-username {
    max-width: 150px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}

.chat-message-element button.button-user.user-mod .user-username {
    max-width: 112px
}

.chat-message-element button.button-user.user-admin .user-username {
    max-width: 100px
}

.chat-message-element .top-actions {
    display: flex
}

.chat-message-element button.button-mute,
.chat-message-element button.button-remove {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px
}

.chat-message-element button.button-mute {
    margin-right: 5px;
    background: #ffc93d
}

.chat-message-element button.button-remove {
    background: #D4AF3C
}

.chat-message-element button.button-mute svg,
.chat-message-element button.button-remove svg {
    width: 8px;
    fill: #fff
}

.chat-message-element .element-text {
    width: fit-content;
    margin-top: 3px;
    padding: 8px 15px;
    border-radius: 8px;
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    text-align: left;
    font-size: 13px;
    font-weight: 500;
    color: #CABFDD;
    background: #100D14;
}

.chat-message-element .button-game .button-inner {
    color: #D4AF3C;
    display: flex;
    align-items: center;
}

.chat-message-element .button-game .button-inner svg {
    width: 15px;
    height: 15px;
    margin-right: 10px;
}

.chat-message-element .element-rain {
    width: 100%;
}

.chat-message-element .rain-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center
}

.chat-message-element .element-rain .element-text {
    width: 100%;
    margin-top: 3px;
    padding: 8px 15px;
    border-radius: 8px;
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    text-align: left;
    font-size: 13px;
    font-weight: 500;
    color: #CABFDD;
    background: #100D14
}

.chat-message-element .element-rain .element-text .rain-header {
    display: flex;
    align-items: center;
    gap: 7px;
}

.chat-message-element .element-rain .element-text .rain-content {
    margin-top: 5px;
    color: #CABFDD;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.chat-message-element .element-rain .element-text .rain-content .content-tip,
.content-completed {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.chat-message-element .element-rain .element-text .rain-content .content-username {
    color: #fff;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-right: 5px;
}

.chat-message-element .element-rain .element-text .rain-content .tip-amount {
    display: flex;
    align-items: center;
    margin-left: 5px;
}

.chat-message-element .element-rain .element-text .rain-content .tip-amount span {
    margin-left: 3px;
}

.chat-message-element .element-rain .element-text .rain-content .content-completed {
    text-wrap: wrap;
}

.chat-message-element .element-rain .element-text .rain-content .content-completed .content-participants {
    color: white;
    margin-right: 10px;
}

.chat-message-element .element-rain .element-text .rain-content .completed-amount {
    display: flex;
    align-items: center;
    margin-right: 5px;
}

.chat-message-element .element-rain .element-text .rain-content .completed-amount span {
    color: white;
    margin-left: 5px;
}

.chat-message-element .element-rain .element-text .rain-content .tip-amount img,
.completed-amount img {
    width: 14px;
    height: 14px;
    margin-bottom: 2px;
}

.text-default-theme {
    color: #D4AF3C;
    font-size: 14px;
    font-weight: 600;
    line-height: normal;
}

@media only screen and (max-width: 640px) {

    .chat-message-element {
        margin-top: 5px;
        padding: 2px 5px;
        border-radius: 5px
    }

    .chat-message-element .system-username,
    .chat-message-element .user-username {
        font-size: 12px;
    }

    .chat-message-element .system-avatar,
    .chat-message-element button.button-user .avatar-image {
        width: 25px;
        height: 25px;
        margin-right: 4px;
    }

    .chat-message-element .element-text {
        margin-top: 3px;
        padding: 5px 12px;
        font-size: 11.5px;
    }

    .chat-message-element .element-rain .element-text .rain-content {
        margin-top: 3px;
        font-size: 11px;
    }

    .text-default-theme {
        font-size: 12px;
    }
}
</style>
