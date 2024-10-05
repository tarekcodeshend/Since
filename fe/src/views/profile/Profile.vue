<template>
    <div class="profile">
        <div class="profile-nav">
            <router-link to="/profile" class="nav-link"
                aria-current="page">OVERVIEW</router-link>
            <router-link to="/profile/settings" class="nav-link">SETTINGS</router-link>
            <router-link to="/profile/bets" class="nav-link">BETS</router-link>
            <router-link to="/profile/transactions" class="nav-link">TRANSACTIONS</router-link>
        </div>
        <div class="profile-content">
            <transition name="slide-fade" mode="out-in">
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Profile',
    components: {
    },
    metaInfo: {
        title: 'Profile - gooncasino'
    }
}
</script>

<style scoped>
.profile {
    width: 100%;
    display: flex;
    padding: 40px
}

.profile .profile-nav {
    width: 180px;
    display: flex;
    flex-direction: column
}

.profile .profile-nav a.nav-link {
    width: 100%;
    height: 41px;
    display: flex;
    align-items: center;
    margin-top: 8px;
    padding: 0 16px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #b5abc5;
    background: #292335;
    box-shadow: 0 2px 0 0 #191e27;
    transition: all .3s ease
}

.profile .profile-nav a.nav-link:first-of-type {
    margin-top: 0
}

.profile .profile-nav a.nav-link:hover {
    color: #fff
}

.profile .profile-nav a.nav-link.router-link-exact-active {
    color: #D4AF3C;
    background: #252129;
    box-shadow: 0 0 0 1px #a58422
}

.profile .profile-content {
    width: calc(100% - 180px);
    padding-left: 20px
}

.profile .profile-content .slide-fade-enter-active {
    transition: all .3s ease-out
}

.profile .profile-content .slide-fade-enter {
    opacity: 0
}

@media only screen and (max-width: 1650px) {
    .profile {
        padding: 40px 15px
    }
}
@media only screen and (min-width: 850px) {
    .profile {
        min-height: calc(100vh - 112px); 
    }
}
@media only screen and (max-width: 850px) {
    .profile {
        flex-direction: column;
        padding-top: 10px !important;
    }

    .profile .profile-nav {
        width: 100%
    }

    .profile .profile-content {
        width: 100%;
        margin-top: 20px;
        padding-left: 0
    }
}

</style>