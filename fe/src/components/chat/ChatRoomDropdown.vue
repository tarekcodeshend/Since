<template>
    <div class="chat-room-dropdown" v-bind:class="{ 'dropdown-open': dropdownOpen === true }">
        <button v-on:click="chatToggleDropdown" class="button-toggle">
            <div class="button-language">
                <img v-bind:src="require('@/assets/img/rooms/' + chatRoom + '.svg')" alt="room-icon" />
            </div>
            <div class="button-icon">
                <svg data-v-22b7539a="" width="13" height="9" viewBox="0 0 13 9" xmlns="http://www.w3.org/2000/svg">
                    <path data-v-22b7539a=""
                        d="M11.2142 0.361328L6.5 5.07555L1.78577 0.361328L0 2.1471L6.5 8.6471L13 2.1471L11.2142 0.361328Z">
                    </path>
                </svg>
            </div>
            {{ chatGetRoomName }}
        </button>
        <div class="dropdown-menu">
            <div class="menu-inner">
                <button v-on:click="chatRoomButton('en')" class="button-room">
                    <img src="@/assets/img/rooms/en.svg" alt="room-icon" />
                    ENGLISH CHAT ROOM
                    <!-- <span class="button-online">({{chatOnline.en}})</span> -->
                </button>
                <button v-on:click="chatRoomButton('tr')" class="button-room">
                    <img src="@/assets/img/rooms/tr.svg" alt="room-icon" />
                    TURKISH CHAT ROOM
                    <!-- <span class="button-online">({{chatOnline.tr}})</span> -->
                </button>
                <button v-on:click="chatRoomButton('de')" class="button-room">
                    <img src="@/assets/img/rooms/de.svg" alt="room-icon" />
                    GERMAN CHAT ROOM
                    <!-- <span class="button-online">({{chatOnline.de}})</span> -->
                </button>
                <button v-on:click="chatRoomButton('es')" class="button-room">
                    <img src="@/assets/img/rooms/es.svg" alt="room-icon" />
                    SPANISH CHAT ROOM
                    <!-- <span class="button-online">({{chatOnline.es}})</span> -->
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import IconDropdown from '@/components/icons/IconDropdown';

export default {
    name: 'ChatRoomDropdown',
    components: {
        IconDropdown
    },
    data() {
        return {
            dropdownOpen: false
        }
    },
    methods: {
        ...mapActions(['chatSetRoom']),
        chatToggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        chatRoomButton(room) {
            this.chatSetRoom(room);
            this.chatToggleDropdown();
        }
    },
    computed: {
        ...mapGetters(['chatRoom', 'chatOnline']),
        chatGetRoomName() {
            let name = 'ENGLISH CHAT ROOM';

            if (this.chatRoom === 'tr') {
                name = 'TURKISH CHAT ROOM';
            } else if (this.chatRoom === 'de') {
                name = 'GERMAN CHAT ROOM';
            } else if (this.chatRoom === 'es') {
                name = 'SPANISH CHAT ROOM';
            } else if (this.chatRoom === 'beg') {
                name = 'BEGGING CHAT ROOM';
            }

            return name;
        }
    },
    created() {
        let self = this;
        document.addEventListener('click', function (event) {
            if (!self.$el.contains(event.target) && self.dropdownOpen == true) {
                self.chatToggleDropdown();
            }
        });
    }
}
</script>

<style scoped>
.chat-room-dropdown {
    width: 100%;
    position: relative;
    z-index: 15;
}

.chat-room-dropdown button.button-toggle {
    width: 100%;
    height: 43px;
    position: relative;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 600;
    color: #626c7e;
    background: #221c2e;
    border-bottom: 2px solid #1b1525;
}

.chat-room-dropdown button.button-toggle .button-language {
    height: 19px;
    position: absolute;
    top: 50%;
    left: 13px;
    transform: translateY(-50%);
}

.chat-room-dropdown button.button-toggle .button-language img {
    width: 19px;
    height: 19px;
    border-radius: 50%;
}

.chat-room-dropdown button.button-toggle .button-icon {
    position: absolute;
    top: 50%;
    right: 13px;
    transform: translateY(-50%);
}

.chat-room-dropdown.dropdown-open button.button-toggle svg {
    transform: rotate(180deg);
}

.chat-room-dropdown button.button-toggle .button-icon svg {
    fill: #626c7e;
    transition: all .3s ease;
}

.chat-room-dropdown .dropdown-menu {
    width: 100%;
    height: 0;
    position: absolute;
    top: 50px;
    left: 0;
    transition: height .2s ease;
    overflow: hidden;
}

.chat-room-dropdown.dropdown-open .dropdown-menu {
    height: 182px;
}

.chat-room-dropdown .menu-inner button:hover {
    background: #1b1525;
}

.chat-room-dropdown .menu-inner {
    width: 100%;
    position: relative;
    padding: 3px;
    border-radius: 5px;
    background: #221c2e;
    border: 1px solid #1b1525;
}

.chat-room-dropdown button.button-room {
    width: 100%;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
}

.chat-room-dropdown button.button-room img {
    width: 19px;
    height: 19px;
    margin-right: 12px;
    border-radius: 50%;
}

@media only screen and (max-width: 640px) {
    .chat-room-dropdown button.button-toggle {
        height: 40px;
        font-size: 11px;
    }

    .chat-room-dropdown button.button-toggle .button-language {
        height: 19px;
        position: absolute;
        top: 50%;
        left: 13px;
        transform: translateY(-50%);
    }

    .chat-room-dropdown button.button-toggle .button-language img {
        width: 17px;
        height: 17px;
        border-radius: 50%;
    }

    .chat-room-dropdown .dropdown-menu {
        top: 43px;
    }

}
</style>
