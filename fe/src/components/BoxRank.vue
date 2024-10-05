<template>
    <div class="box-rank" v-bind:class="'rank-' + rank">
        {{ rank }}
    </div>
</template>

<script>
export default {
    name: 'BoxRank',
    props: ['rank']
}
</script>

<style scoped>
.box-rank {
    height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    padding: 0 5px;
    border-radius: 3px;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;    
    color: #fff;
    background: #a1aeb5
}

.box-rank.rank-silver {
    background: #c0c0c0;
}

.box-rank.rank-gold {
    background: #ffa24b;
}

.box-rank.rank-platinum {
    background: #0c88ff;
}

.box-rank.rank-titanium {
    background: #8674f2;
}

.box-rank.rank-partner {    
    background: #2f8abe;
}
.box-rank.rank-mod {    
    background: #00c74d;
}

.box-rank.rank-admin {
    background: #fd3b31;
}
.box-rank.rank-system {
    background: #4B2626;
    color: #D4AF3C;
}

</style>