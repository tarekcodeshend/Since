<template>
    <router-link v-bind:to="'/blackjack/table/' + (table.table + 1)" class="blackjack-tables-element">
        <div class="element-inner">
            <div class="inner-image">
                <img src="@/assets/img/blackjack/blackjack-table.webp" alt="table" />
            </div>
            <div class="inner-info">
                <div class="info-name">Table {{ table.table + 1 }}</div>
                <div class="info-users">
                    <span class="gradient-green">{{ table.players.length }} / 5</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                        <path
                            d="M5.55938 8C4.54688 8.02976 3.71875 8.41072 3.075 9.14286H1.81875C1.30625 9.14286 0.875 9.02232 0.525 8.78125C0.175 8.54018 0 8.1875 0 7.72321C0 5.62202 0.3875 4.57143 1.1625 4.57143C1.2 4.57143 1.33594 4.63393 1.57031 4.75893C1.80469 4.88393 2.10938 5.01042 2.48438 5.13839C2.85938 5.26637 3.23125 5.33036 3.6 5.33036C4.01875 5.33036 4.43438 5.26191 4.84688 5.125C4.81563 5.34524 4.8 5.54167 4.8 5.71429C4.8 6.54167 5.05313 7.30357 5.55938 8ZM15.6 13.6875C15.6 14.4018 15.3719 14.9658 14.9156 15.3795C14.4594 15.7932 13.8531 16 13.0969 16H4.90313C4.14688 16 3.54063 15.7932 3.08438 15.3795C2.62813 14.9658 2.4 14.4018 2.4 13.6875C2.4 13.372 2.41094 13.064 2.43281 12.7634C2.45469 12.4628 2.49844 12.1384 2.56406 11.7902C2.62969 11.442 2.7125 11.119 2.8125 10.8214C2.9125 10.5238 3.04688 10.2336 3.21563 9.95089C3.38438 9.66816 3.57813 9.42708 3.79688 9.22768C4.01562 9.02827 4.28281 8.86905 4.59844 8.75C4.91406 8.63095 5.2625 8.57143 5.64375 8.57143C5.70625 8.57143 5.84063 8.63542 6.04688 8.76339C6.25313 8.89137 6.48125 9.03423 6.73125 9.19197C6.98125 9.3497 7.31563 9.49256 7.73438 9.62054C8.15313 9.74851 8.575 9.8125 9 9.8125C9.425 9.8125 9.84688 9.74851 10.2656 9.62054C10.6844 9.49256 11.0188 9.3497 11.2688 9.19197C11.5188 9.03423 11.7469 8.89137 11.9531 8.76339C12.1594 8.63542 12.2938 8.57143 12.3563 8.57143C12.7375 8.57143 13.0859 8.63095 13.4016 8.75C13.7172 8.86905 13.9844 9.02827 14.2031 9.22768C14.4219 9.42708 14.6156 9.66816 14.7844 9.95089C14.9531 10.2336 15.0875 10.5238 15.1875 10.8214C15.2875 11.119 15.3703 11.442 15.4359 11.7902C15.5016 12.1384 15.5453 12.4628 15.5672 12.7634C15.5891 13.064 15.6 13.372 15.6 13.6875ZM6 2.28571C6 2.91667 5.76562 3.45536 5.29688 3.90179C4.82812 4.34821 4.2625 4.57143 3.6 4.57143C2.9375 4.57143 2.37188 4.34821 1.90313 3.90179C1.43438 3.45536 1.2 2.91667 1.2 2.28571C1.2 1.65476 1.43438 1.11607 1.90313 0.669643C2.37188 0.223214 2.9375 0 3.6 0C4.2625 0 4.82812 0.223214 5.29688 0.669643C5.76562 1.11607 6 1.65476 6 2.28571ZM12.6 5.71429C12.6 6.66071 12.2484 7.46875 11.5453 8.13839C10.8422 8.80804 9.99375 9.14286 9 9.14286C8.00625 9.14286 7.15781 8.80804 6.45469 8.13839C5.75156 7.46875 5.4 6.66071 5.4 5.71429C5.4 4.76786 5.75156 3.95982 6.45469 3.29018C7.15781 2.62054 8.00625 2.28571 9 2.28571C9.99375 2.28571 10.8422 2.62054 11.5453 3.29018C12.2484 3.95982 12.6 4.76786 12.6 5.71429ZM18 7.72321C18 8.1875 17.825 8.54018 17.475 8.78125C17.125 9.02232 16.6938 9.14286 16.1813 9.14286H14.925C14.2813 8.41072 13.4531 8.02976 12.4406 8C12.9469 7.30357 13.2 6.54167 13.2 5.71429C13.2 5.54167 13.1844 5.34524 13.1531 5.125C13.5656 5.26191 13.9813 5.33036 14.4 5.33036C14.7688 5.33036 15.1406 5.26637 15.5156 5.13839C15.8906 5.01042 16.1953 4.88393 16.4297 4.75893C16.6641 4.63393 16.8 4.57143 16.8375 4.57143C17.6125 4.57143 18 5.62202 18 7.72321ZM16.8 2.28571C16.8 2.91667 16.5656 3.45536 16.0969 3.90179C15.6281 4.34821 15.0625 4.57143 14.4 4.57143C13.7375 4.57143 13.1719 4.34821 12.7031 3.90179C12.2344 3.45536 12 2.91667 12 2.28571C12 1.65476 12.2344 1.11607 12.7031 0.669643C13.1719 0.223214 13.7375 0 14.4 0C15.0625 0 15.6281 0.223214 16.0969 0.669643C16.5656 1.11607 16.8 1.65476 16.8 2.28571Z"
                            fill="white" />
                    </svg>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
import IconUsers from '@/components/icons/IconUsers';

export default {
    name: 'BlackjackTablesElement',
    props: ['table'],
    components: {
        IconUsers
    }
}
</script>

<style scoped>
a.blackjack-tables-element {
    width: calc(20% - 15px);
    height: 240px;
    position: relative;
    margin-top: 13px;
    margin-right: 13px;
    border-radius: 10px;
    background: linear-gradient(118deg, rgba(255, 255, 255, 0.20) 0%, rgba(0, 0, 0, 0.20) 99.46%), #2B2339;
    background-blend-mode: overlay, normal;
    filter: drop-shadow(0px 7px 15px rgba(0, 0, 0, 0.15));
    overflow: hidden;
}

a.blackjack-tables-element:nth-child(1),
a.blackjack-tables-element:nth-child(2),
a.blackjack-tables-element:nth-child(3),
a.blackjack-tables-element:nth-child(4),
a.blackjack-tables-element:nth-child(5) {
    margin-top: 0;
}

a.blackjack-tables-element:nth-child(5n) {
    margin-right: 0;
}

a.blackjack-tables-element .element-inner {
    width: 100%;
    height: 100%;
    background: none;
    transition: all 0.3s ease;
    z-index: 1;
}

a.blackjack-tables-element:hover .element-inner {
    background: linear-gradient(118deg, rgba(255, 255, 255, 0.20) 0%, rgba(0, 0, 0, 0.20) 99.46%), #2B2339;
}

a.blackjack-tables-element .inner-image {
    width: 100%;
    height: calc(100% - 50px);
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

a.blackjack-tables-element .inner-image img {
    width: 100%;
    height: 100%;
}

a.blackjack-tables-element .inner-info {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    border-radius: 0px 0px 10px 10px;
    background: #1D1826;
    padding: 0px 13px;
}

a.blackjack-tables-element .info-name {
    display: flex;
    align-items: center;
    color: #767C8B;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.45px;
}

a.blackjack-tables-element .info-users {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* a.blackjack-tables-element .info-users svg {
    width: 22px;
    height: 19px;
    margin-top: 10px;
} */

a.blackjack-tables-element .info-users span {
    color: #FFF;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.45px;
}

@media only screen and (max-width: 1050px) {

    a.blackjack-tables-element {
        width: calc(25% - 7.5px);
    }

    a.blackjack-tables-element:nth-child(5) {
        margin-top: 10px;
    }

    a.blackjack-tables-element:nth-child(5n) {
        margin-right: 10px;
    }

    a.blackjack-tables-element:nth-child(4n) {
        margin-right: 0;
    }

}

@media only screen and (max-width: 900px) {

    a.blackjack-tables-element {
        width: calc(33.33% - 10px);
    }

    a.blackjack-tables-element:nth-child(4) {
        margin-top: 10px;
    }

    a.blackjack-tables-element:nth-child(4n) {
        margin-right: 10px;
    }

    a.blackjack-tables-element:nth-child(3n) {
        margin-right: 0;
    }

}

@media only screen and (max-width: 700px) {

    a.blackjack-tables-element {
        width: calc(50% - 8px);
        height: 180px;
    }

    a.blackjack-tables-element:nth-child(3) {
        margin-top: 10px;
    }

    a.blackjack-tables-element:nth-child(3n) {
        margin-right: 10px;
    }

    a.blackjack-tables-element:nth-child(2n) {
        margin-right: 0;
    }

}
</style>
