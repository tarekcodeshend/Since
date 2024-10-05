const state = {
    rouletteData: {
        game: null,
        bets: [],
        history: [],
        loading: false
    },
}

const getters = {
    rouletteData: state => state.rouletteData
}

const mutations = {
    roulette_set_data_game(state, game) {
        state.rouletteData.game = game;
    },
    roulette_set_data_bets(state, bets) {
        state.rouletteData.bets = bets;
    },
    roulette_add_data_bets(state, bet) {
        state.rouletteData.bets.unshift(bet);
    },
    roulette_set_data_history(state, history) {
        state.rouletteData.history = history;
    },
    roulette_add_data_history(state, game) {
        state.rouletteData.history.unshift(game);
    },
    roulette_remove_last_data_history(state) {
        state.rouletteData.history.pop();
    },
    roulette_set_data_loading(state, status) {
        state.rouletteData.loading = status
    }
}


const actions = {
    rouletteSocketInit({ commit }, data) {
        commit('roulette_set_data_game', data.game);
        commit('roulette_set_data_bets', data.bets);
        commit('roulette_set_data_history', data.history);
    },
    rouletteSocketGame({ getters, commit }, data) {
        commit('roulette_set_data_game', data.game);

        if(data.game.state === 'completed') {
            commit('roulette_add_data_history', data.game);
            if(getters.rouletteData.history.length > 100) { commit('roulette_remove_last_data_history'); }
        } else if(data.game.state === 'created') {
            commit('roulette_set_data_bets', []);
        }
    },
    rouletteSocketBet({ commit }, data) {        
        commit('roulette_add_data_bets', data.bet);
    },
    // rouletteGetDataSocket({ getters, commit, dispatch }, data) {
    //     if(getters.rouletteData.loading === true) { return; }
    //     commit('roulette_set_data_loading', true);

    //     getters.socketRoulette.emit('getData', data, (res) => {
    //         if(res.success === true) {
    //             commit('roulette_set_data_game', res.game);
    //             commit('roulette_set_data_bets', res.bets);
    //             commit('roulette_set_data_history', res.history);
    //         } else {
    //             dispatch('notificationShow', res.error);
    //         }

    //         commit('roulette_set_data_loading', false);
    //     });
    // },
    rouletteSendBetSocket({ getters, commit, dispatch }, data) {
        if(getters.socketSendLoading !== null) { return; }
        commit('socket_set_send_loading', 'rouletteBet');

        getters.socketRoulette.emit('sendBet', data, (res) => {
            if(res.success === true) {
                commit('auth_update_user', res.user);
            } else {
                dispatch('notificationShow', res.error);
            }

            commit('socket_set_send_loading', null);
        });
    }
}

const roulette = {
    state,
    mutations,
    actions,
    getters
}

export default roulette;