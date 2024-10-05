<template>
    <div class="combat_legend-reel">

        <div class="reel-row">
            <div class="row-element">0</div>
            <div class="row-element">1</div>
            <div class="row-element">2</div>
            <div class="row-element">3</div>
            <div class="row-element">4</div>
            <div class="row-element">5</div>
            <div class="row-element">6</div>
            <div class="row-element">7</div>
            <div class="row-element">8</div>
            <div class="row-element">9</div>
        </div>
        <div class="reel-row">
            <div class="row-element">0</div>
            <div class="row-element">1</div>
            <div class="row-element">2</div>
            <div class="row-element">3</div>
            <div class="row-element">4</div>
            <div class="row-element">5</div>
            <div class="row-element">6</div>
            <div class="row-element">7</div>
            <div class="row-element">8</div>
            <div class="row-element">9</div>
        </div>
        <div class="reel-row">
            <div class="row-element">0</div>
            <div class="row-element">1</div>
            <div class="row-element">2</div>
            <div class="row-element">3</div>
            <div class="row-element">4</div>
            <div class="row-element">5</div>
            <div class="row-element">6</div>
            <div class="row-element">7</div>
            <div class="row-element">8</div>
            <div class="row-element">9</div>
        </div>
        <div class="reel-row">
            <div class="row-element">0</div>
            <div class="row-element">1</div>
            <div class="row-element">2</div>
            <div class="row-element">3</div>
            <div class="row-element">4</div>
            <div class="row-element">5</div>
            <div class="row-element">6</div>
            <div class="row-element">7</div>
            <div class="row-element">8</div>
            <div class="row-element">9</div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Combat_legendReel'
    }
</script>

<style scope>
    .combat_legend-reel {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .combat_legend-reel .reel-row {

    }

    .combat_legend-reel .row-element {
        height: 130px;
        display: flex;
        align-items: center;
        font-family: 'Rubik';
        font-size: 64px;
        font-weight: 500;
        color: #ffffff;
    }

    .inner-holder:nth-child(4) .combat_legend-reel .row-element,
    .inner-holder:nth-child(5) .combat_legend-reel .row-element {
        font-weight: 400;
        color: #5e768e;
    }
</style>
