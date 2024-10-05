<template>
    <button v-on:click="rollInfoButton" class="roll-history-element" v-bind:class="{
        'element-high': rollGetOutcome >= 20,
        'element-mid': rollGetOutcome < 20 && rollGetOutcome >= 5,
        'element-low': rollGetOutcome < 5 && rollGetOutcome >= 2
    }">
        <div class="element-inner">
            <span>{{ rollGetOutcome }}</span>
        </div>
    </button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'RollHistoryElement',
    props: [
        'game'
    ],
    methods: {
        ...mapActions(['modalsSetData', 'modalsSetShow']),
        rollInfoButton() {
            this.modalsSetData({ game: this.game });
            this.modalsSetShow('FairGame');
        }
    },
    computed: {
        rollGetOutcome() {
            return parseFloat(this.game.outcome / 100).toFixed(2);
        }
    }
}
</script>

<style scoped>
button.roll-history-element {
    width: 70px;
    height: 35px;
    position: relative;
    flex-shrink: 0;
    margin-right: 4px;
    transition: all .2s;
}

.roll-history-element:hover {
    transition-duration: .2s;
    opacity: .7;
    /* transform: translateY(-2px); */
}

.roll-history-element:active {
    transition-duration: .2s;
    /* background: #083e57; */
    /* transform: translateY(2px); */
}

button.roll-history-element:last-of-type {
    margin-right: 0;
}

button.roll-history-element .element-inner {
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
    background: linear-gradient(298deg, rgba(255, 255, 255, 0.00) 28.88%, rgba(255, 255, 255, 0.10) 100%), #1E232D;
    z-index: 1;
}

button.roll-history-element.element-high .element-inner {
    border-radius: 7px;
    border-top: 1px solid #FD3B31;
    border-right: 0.5px solid #FD3B31;
    border-bottom: 0.5px solid #FD3B31;
    border-left: 1px solid #FD3B31;
    background: linear-gradient(298deg, rgba(253, 59, 49, 0.00) 28.88%, rgba(253, 59, 49, 0.20) 100%), #2D1E1E;
    opacity: 1;
}

button.roll-history-element.element-mid .element-inner {
    border-radius: 7px;
    border-top: 1px solid var(--linear-2-paints, #FFC700);
    border-right: 0.5px solid var(--linear-2-paints, #FFC700);
    border-bottom: 0.5px solid var(--linear-2-paints, #FFC700);
    border-left: 1px solid var(--linear-2-paints, #FFC700);
    background: linear-gradient(298deg, rgba(255, 199, 0, 0.00) 28.88%, rgba(255, 199, 0, 0.20) 100%), #2D2B1E;
    opacity: 1;
}

button.roll-history-element.element-low .element-inner {
    border-radius: 7px;
    border-top: 1px solid var(--linear-2-paints, #9731FD);
    border-right: 0.5px solid var(--linear-2-paints, #9731FD);
    border-bottom: 0.5px solid var(--linear-2-paints, #9731FD);
    border-left: 1px solid var(--linear-2-paints, #9731FD);
    background: linear-gradient(298deg, rgba(151, 49, 253, 0.00) 28.88%, rgba(151, 49, 253, 0.20) 100%), #241E2D;
    opacity: 1;
}

button.roll-history-element .element-inner span {
    font-size: 14px;
    font-weight: 700;
    color: #B6B6B6;
}

button.roll-history-element.element-high .element-inner span {
    color: #FD3B31;
}

button.roll-history-element.element-mid .element-inner span {
    color: #FFC700;
}

button.roll-history-element.element-low .element-inner span {
    color: #9731FD;
}
</style>
