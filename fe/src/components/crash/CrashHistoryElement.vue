<template>
    <button v-on:click="crashInfoButton" class="crash-history-element" v-bind:class="{
        'element-high': crashGetOutcome >= 10,
        'element-mid': crashGetOutcome < 10 && crashGetOutcome >= 2
    }">
        <div class="element-inner">
            <span>{{ crashGetOutcome }}x</span>
        </div>
    </button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'CrashHistoryElement',
    props: [
        'game'
    ],
    methods: {
        ...mapActions([
            'modalsSetData',
            'modalsSetShow'
        ]),
        crashInfoButton() {
            this.modalsSetData({ game: this.game });
            this.modalsSetShow('FairGame');
        }
    },
    computed: {
        crashGetOutcome() {
            return parseFloat(this.game.outcome / 100).toFixed(2);
        }
    }
}
</script>

<style scoped>
button.crash-history-element {
    width: 70px;
    height: 35px;
    position: relative;
    flex-shrink: 0;
    margin-right: 4px;
}

button.crash-history-element:last-of-type {
    margin-right: 0;
}

button.crash-history-element .element-inner {
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 1px;
    left: 1px;
    border-radius: 7px;
    border-top: 1px solid var(--linear-2-paints, #B6B6B6);
    border-right: 0.5px solid var(--linear-2-paints, #B6B6B6);
    border-bottom: 0.5px solid var(--linear-2-paints, #B6B6B6);
    border-left: 1px solid var(--linear-2-paints, #B6B6B6);
    opacity: 0.5;
    background: var(--1-e-232-d-2-paints, linear-gradient(298deg, rgba(255, 255, 255, 0.00) 28.88%, rgba(255, 255, 255, 0.10) 100%), #1E232D);
    z-index: 1;
}

button.crash-history-element.element-high .element-inner {
    border-radius: 7px;
    border-top: 1px solid var(--linear-2-paints, #FD3B31);
    border-right: 0.5px solid var(--linear-2-paints, #FD3B31);
    border-bottom: 0.5px solid var(--linear-2-paints, #FD3B31);
    border-left: 1px solid var(--linear-2-paints, #FD3B31);
    background: linear-gradient(298deg, rgba(253, 59, 49, 0.00) 28.88%, rgba(253, 59, 49, 0.20) 100%), #2D1E1E;
    opacity: 1;
}

button.crash-history-element.element-mid .element-inner {
    border-radius: 7px;
    border-top: 1px solid var(--linear-2-paints, #9731FD);
    border-right: 0.5px solid var(--linear-2-paints, #9731FD);
    border-bottom: 0.5px solid var(--linear-2-paints, #9731FD);
    border-left: 1px solid var(--linear-2-paints, #9731FD);
    background: linear-gradient(298deg, rgba(151, 49, 253, 0.00) 28.88%, rgba(151, 49, 253, 0.20) 100%), #241E2D;
    opacity: 1;
}

button.crash-history-element .element-inner span {
    font-size: 14px;
    font-weight: 700;
    color: #bbbfd0;
}

button.crash-history-element.element-high .element-inner span {
    color: #FD3B31
}

button.crash-history-element.element-mid .element-inner span {
    color: #9731FD
}

@media only screen and (max-width: 640px) {
    button.crash-history-element {
        width: 60px;
        height: 29px;
        margin-right: 3px;
    }

    button.crash-history-element .element-inner span {
        font-size: 12px;
    }
}
</style>
