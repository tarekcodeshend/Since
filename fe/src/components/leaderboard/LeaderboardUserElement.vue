<template>
    <div class="leaderboard-user-element">
        <div class="element-inner">
            <div class="inner-pos">{{position}}</div>
            <div class="inner-user">
                <div class="user-avatar">
                    <AvatarImage v-bind:image="winner.user !== undefined && winner.user !== null ? winner.user.avatar : ''" />
                </div>
                <span v-html="leaderboardGetUsername"></span>
            </div>
            <div class="inner-wagered">
                <div class="wagered-title">WAGERED</div>
                <div class="wagered-content">
                    <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                    <div class="content-value" v-if="winner !== null">
                        <span>{{leaderboardFormatValue(winner.points).split('.')[0]}}</span>
                    </div>
                </div>
            </div>
            <div class="inner-prize">
                <div class="prize-title">PRIZE</div>
                <div class="prize-content">
                    <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                    <div class="content-value" v-if="winner !== null">
                        <span>{{leaderboardFormatValue(winner.prize).split('.')[0]}}</span>.{{leaderboardFormatValue(winner.prize).split('.')[1]}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AvatarImage from '@/components/AvatarImage';

    export default {
        name: 'LeaderboardUserElement',
        components: {
            AvatarImage
        },
        props: [
            'position', 
            'winner'
        ],
        methods: {
            leaderboardFormatValue(value) {
                return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');;
            },
            leaderboardGetRank(user) {
                let rank = user.rakeback;

                if(user.rank !== 'user') { rank = user.rank; }

                return rank;
            },
            leaderboardGetLevelColor(user) {
                let color = '';

                if(user.level >= 2 && user.level < 26) { color = 'blue'; }
                else if(user.level >= 26 && user.level < 51) { color = 'green'; }
                else if(user.level >= 51 && user.level < 76) { color = 'orange'; }
                else if(user.level >= 76 && user.level < 100) { color = 'red'; }
                else if(user.level >= 100) { color = 'purple'; }

                return color;
            }
        },
        computed: {
            leaderboardGetUsername() {
                let username = 'Empty';

                if(this.winner !== null && this.winner.user !== undefined && this.winner.user !== null) { username = this.winner.user.username; }
                else if(this.winner !== null && this.winner.user === null) { username = 'Anonymous'; }

                return username;
            }
        }
    }
</script>

<style scoped>
    .leaderboard-user-element {
        width: 900px;
        height: 60px;
        position: relative;
        margin-top: 10px;
    }

    .leaderboard-user-element .element-crown {
        display: none;
        position: absolute;
        top: -20px;
        left: -10px;
        z-index: 2;
    }

    .leaderboard-user-element:nth-child(1) .element-crown {
        display: block;
    }

    .leaderboard-user-element .element-crown img {
        width: 38px;
    }

    .leaderboard-user-element .element-inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        /* padding: 0 25px 0 35px; */
        border-radius: 5px;
    }


    .leaderboard-user-element .inner-pos {
        width: 10%;
        font-size: 16px;
        font-weight: 600;
        color: #767C8B;
    }   

    .leaderboard-user-element .inner-user {
        width: 60%;
        display: flex;
        align-items: center;
        font-size: 13px;
        font-weight: 600;
        color: #ffffff;
    }

    .leaderboard-user-element .inner-user.user-hidden {
        font-style: italic;
    }

    .leaderboard-user-element .user-avatar {
        width: 34px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;
    }  

    .leaderboard-user-element .user-avatar .avatar-image {
        width: 100%;
        height: 100%;
        background-color: #323846;
    }

    .leaderboard-user-element .inner-prize,
    .leaderboard-user-element .inner-wagered {
        width: 15%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .leaderboard-user-element .prize-title,
    .leaderboard-user-element .wagered-title {
        display: none;
        font-size: 12px;
        font-weight: 800;
        color: #767C8B;
    }

    .leaderboard-user-element .prize-content,
    .leaderboard-user-element .wagered-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .leaderboard-user-element .inner-prize img,
    .leaderboard-user-element .inner-wagered img {
        width: 16px;
        height: 16px;
        margin-right: 7px;
    }

    .leaderboard-user-element .content-value {
        font-size: 10px;
        font-weight: 600;
        color: #bbbfd0;
    }

    .leaderboard-user-element .inner-prize .content-value span {
        font-size: 14px;
        font-weight: 800;
        color: #BBB;
    }
    .leaderboard-user-element .inner-wagered .content-value span {
        font-size: 14px;
        font-weight: 800;
        color: #fff;
    }

    @media only screen and (max-width: 975px) {

        .leaderboard-user-element {
            width: 100%;
        }

        .leaderboard-user-element:nth-child(1) {
            width: 100%;
        }

        .leaderboard-user-element:nth-child(2) {
            width: 100%;
        }

        .leaderboard-user-element:nth-child(3) {
            width: 100%;
        }

    }

    @media only screen and (max-width: 650px) {

        .leaderboard-user-element {
            height: auto;
        }

        .leaderboard-user-element .element-inner {
            display: grid;
            grid-template-columns: 50px calc(50% - 25px) calc(50% - 25px);
            grid-template-rows: auto auto;
            padding: 5px 0px;
        }

        .leaderboard-user-element .inner-pos {
            width: 30px;
            grid-column: 1;
            grid-row: 1;
        }

        .leaderboard-user-element .inner-user {
            width: 100%;
            grid-column: 2 / 4;
            grid-row: 1;
        }

        .leaderboard-user-element .inner-prize {
            width: 100%;
            grid-column: 2;
            grid-row: 2;
            margin-top: 20px;
        }

        .leaderboard-user-element .inner-wagered {
            width: 100%;
            grid-column: 3;
            grid-row: 2;
            margin-top: 20px;
        }

        .leaderboard-user-element .prize-title,
        .leaderboard-user-element .wagered-title {
            display: block;
        }

        .leaderboard-user-element .prize-content,
        .leaderboard-user-element .wagered-content {
            margin-top: 5px;
            justify-content: flex-start;
        }
        

    }
</style>
