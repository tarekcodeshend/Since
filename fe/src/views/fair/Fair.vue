<template>
    <div class="fair">
        <div class="fair-header">
            <div class="header-title">PROVABLY FAIR</div>
        </div>
        <div class="fair-nav">
            <router-link to="/fair" class="link-overview"
                aria-current="page">OVERVIEW</router-link>
            <router-link to="/fair/crash" class="link-crash">CRASH</router-link>
            <router-link to="/fair/blackjack" class="link-blackjack">BLACKJACK</router-link>
            <router-link to="/fair/mines" class="link-mines">MINES</router-link>
            <router-link to="/fair/towers" class="link-towers">TOWERS</router-link>
            <router-link to="/fair/plinko" class="link-plinko">PLINKO</router-link>
            <!-- <router-link to="/fair/upgrader" class="link-upgrader">UPGRADER</router-link> -->
            <router-link to="/fair/roulette" class="link-roulette">ROULETTE</router-link>
            <!-- <router-link to="/fair/cases" class="link-cases">CASES</router-link>
            <router-link to="/fair/battles" class="link-battles">BATTLES</router-link> -->
        </div>
        <div class="fair-content">
            <transition name="slide-fade" mode="out-in">
                <router-view />
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Fair',
    metaInfo: {
        title: 'Fairness - gooncasino.live'
    },
}
</script>

<style scoped0>
.fair {
    width: 100%;
    min-height: calc(100vh - 112px);
    padding: 40px
}

.fair .fair-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid #20252d
}

.fair .header-title {
    font-size: 24px;
    font-weight: 700;
    color: #596076
}

.fair .fair-nav {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 30px
}

.fair .fair-nav a {
    height: 41px;
    display: flex;
    align-items: center;
    margin-right: 12px;
    padding: 0 16px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #aa9bc5;
    background: #2f283d;
    box-shadow: 0 2px 0 0 #15111d;
    transition: all .3s ease
}

.fair .fair-nav a:last-of-type {
    margin-right: 0
}

.fair .fair-nav a:hover {
    color: #fff
}

.fair .fair-nav a.link-crash.router-link-active,
.fair .fair-nav a.link-blackjack.router-link-active,
.fair .fair-nav a.link-cases.router-link-active,
.fair .fair-nav a.link-mines.router-link-active,
.fair .fair-nav a.link-plinko.router-link-active,
.fair .fair-nav a.link-roulette.router-link-active,
.fair .fair-nav a.link-towers.router-link-active,
.fair .fair-nav a.link-upgrader.router-link-active,
.fair .fair-nav a.router-link-exact-active {
    color: #D4AF3C;
    background: #252129;
    box-shadow: 0 0 0 1px #96771c
}

.fair .fair-content {
    width: 100%;
    margin-top: 30px
}

@media only screen and (max-width: 1650px) {
    .fair {
        padding: 40px 15px 40px 15px
    }
}

@media only screen and (max-width: 975px) {
    .fair .fair-nav {
        flex-direction: column;
        align-items: flex-start
    }

    .fair .fair-nav a {
        width: 100%;
        margin-top: 8px;
        margin-right: 0
    }

    .fair .fair-nav a:first-of-type {
        margin-top: 0
    }
}
</style>