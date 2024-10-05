<template>
    <div class="plinko-ball" v-bind:style="plinkoStyle">
        <img src="@/assets/img/icon-logo.png" alt="tiles-logo" />
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'PlinkoBall',
        props: ['game'],
        data() {
            return {
                plinkoStyle: {},
                plinkoWith: 580,
                row: 0,
                pos: 1,
                rot: 0
            }
        },
        methods: {
            ...mapActions(['plinkoRemoveGame']),
            plinkoSetWith() {
                if(window.innerWidth <= 790) {
                    this.plinkoWith = window.innerWidth - 210;
                } else {
                    this.plinkoWith = 580;
                }
            },
            plinkoNextStep() {
                const target = this.plinkoGetTarget() + 1;
                let next = (Math.random() < 0.5 ? 0 : 1);

                if(this.pos === target) {
                    next = 0;
                } else if((this.game.rows - (this.row + 2)) <= (target - this.pos)) {
                    next = 1;
                }

                const startPoint = this.plinkoGetCoordinates(this.row - 1, this.pos);

                this.pos = this.pos + next;

                const endPoint = this.plinkoGetCoordinates(this.row, this.pos);

                const path = this.plinkoGetStepPath(startPoint, endPoint);
                for(const [index, point] of path.entries()) {
                    const time = 300 / path.length;

                    setTimeout(() => {
                        this.plinkoStyle = {
                            top: '-28px', 'left': '50%',
                            transform: 'translate(' + point.x + 'px, ' + point.y + 'px) rotate(' + (next === 0 ? (this.rot + ((-55 / path.length) * index)) : (this.rot + ((55 / path.length) * index)))  + 'deg)',
                            transition: 'all ' + parseFloat(time / 1000).toFixed(2) + 's ease',
                            opacity: this.row === this.game.rows ? 1 - ((1 / path.length) * index) : 1
                        }
                    }, index * time);
                }

                this.rot = next === 0 ? this.rot - 55 : this.rot + 55;

                if((this.row - 1) === this.game.rows) {
                    this.plinkoRemoveGame(this.game);
                } else {
                    setTimeout(() => {
                        this.row = this.row + 1;
                        this.plinkoNextStep();
                    }, 400);
                }
            },
            plinkoGetDeck() {
                let deck = [[1], [1, 1]];

                for(let r = 2; r < (this.game.rows + 1); r++) {
                    let previousRow = deck[r - 1];
                    let newRow = [1];

                    for(let v = 0; v < previousRow.length - 1; v++) {
                        newRow.push(previousRow[v] + previousRow[v+1]);
                    }

                    newRow.push(1);
                    deck.push(newRow);
                }

                return deck[deck.length - 1];
            },
            plinkoGetTarget() {
                const deck = this.plinkoGetDeck();
                const rows = deck.length - 1;
                let totalValue = 0;
                let target = 0;

                for(let [index, value] of deck.entries()) {
                    totalValue = totalValue + value;

                    if(totalValue >= this.game.ticket) {
                        target = index;
                        break;
                    }
                }

                return target;
            },
            plinkoGetOffset(row, pos) {
                let offset = 0;

                if((row + 3) % 2 === 0 && (row + 3) / 2 > pos) {
                    offset = -4.5;
                } else if((row + 3) % 2 === 0 && (row + 3) / 2 <= pos) {
                    offset = 4.5;
                }

                offset = offset - 14;

                return offset;
            },
            plinkoGetCoordinates(row, pos) {
                const count = row + 3;

                let x = 0;
                if(count % 2 === 0 && (count / 2) > pos) {
                    x = -(((this.plinkoWith / (this.game.rows + 1)) / 2) + (((this.plinkoWith / (this.game.rows + 1)) + 9) * (Math.abs(pos - (count / 2)) - 1)));
                } else if(count % 2 === 0 && (count / 2) <= pos) {
                    x = (((this.plinkoWith / (this.game.rows + 1)) / 2) + (((this.plinkoWith / (this.game.rows + 1)) + 9) * (Math.abs(pos - (count / 2)))));
                } else if(count % 2 !== 0 && Math.floor(count / 2) > pos) {
                    x = -((this.plinkoWith / (this.game.rows + 1)) * Math.abs(Math.floor(count / 2) - pos) + (9 * Math.abs(Math.floor(count / 2) - pos)));
                } else if(count % 2 !== 0 && Math.floor(count / 2) < pos) {
                    x = ((this.plinkoWith / (this.game.rows + 1)) * Math.abs(Math.floor(count / 2) - pos) + (9 * Math.abs(Math.floor(count / 2) - pos)));
                }
                x = x + this.plinkoGetOffset(row, pos);
                let y = ((520 - 9) / (this.game.rows - 1)) * row;

                return { x: x, y: y };
            },
            plinkoGetStepPath(start, end) {
                let path = [];

                const startControl = { x: start.x > end.x ? start.x - 20 : start.x + 20, y: start.y };
                const endControl = { x: end.x , y: end.y - 20 };

                for(let i = 0; i <= 25; i++) {
                    let t = i / 25.0;
                    let s = 1.0 - t;

                    let x = s * s * s * start.x + 3 * s * s * t * startControl.x + 3 * s * t * t * endControl.x + t * t * t * end.x;
                    let y = s * s * s * start.y + 3 * s * s * t * startControl.y + 3 * s * t * t * endControl.y + t * t * t * end.y;

                    path.push({ x: x, y: y });
                }

                return path;
            }
        },
        mounted() {
            window.addEventListener('resize', this.plinkoSetWith);
            this.plinkoSetWith();

            const start = this.plinkoGetCoordinates(this.row, this.pos);
            this.plinkoStyle = {
                top: '-28px', 'left': '50%',
                transform: 'translate('+start.x+'px, '+start.y+'px)',
                transition: 'all 0.3s ease'
            }

            setTimeout(() => {
                this.row = this.row + 1;
                this.plinkoNextStep();
            }, 400);
        }
    }
</script>

<style scoped>
    .plinko-ball {
        width: 28px;
        height: 28px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #dbba56;
        border: 1px solid #b99730;
    }

    .plinko-ball img {
        width: 16px;
        height: 16px;
        mix-blend-mode: luminosity;
        opacity: 0.85;
    }
</style>