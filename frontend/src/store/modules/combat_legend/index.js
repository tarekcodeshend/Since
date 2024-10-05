const state = {
    combat_legendFilterAnimation: 'normal',
    combat_legendFilterCount: 2,
    combat_legendFilterSort: 'HIGHEST PRICE',
    combat_legendGames: [],
    combat_legendHistory: [],
    combat_legendGameData: {
        game: null,
        loading: false
    },
    combat_legendRobloxServerLink: null
}

const getters = {
    combat_legendFilterAnimation: state => state.combat_legendFilterAnimation,
    combat_legendFilterCount: state => state.combat_legendFilterCount,
    combat_legendFilterSort: state => state.combat_legendFilterSort,
    combat_legendGames: state => state.combat_legendGames,
    combat_legendHistory: state => state.combat_legendHistory,
    combat_legendGameData: state => state.combat_legendGameData
}

const mutations = {
    combat_legend_set_filter_animation(state, value) {
        state.combat_legendFilterAnimation = value;
    },
    combat_legend_set_filter_count(state, value) {
        state.combat_legendFilterCount = value;
    },
    combat_legend_set_filter_sort(state, value) {
        state.combat_legendFilterSort = value;
    },
    combat_legend_set_games(state, games) {
        state.combat_legendGames = games;
    },
    combat_legend_add_games(state, game) {
        state.combat_legendGames.push(game);
    },
    combat_legend_update_games(state, game) {
        state.combat_legendGames.splice(state.combat_legendGames.findIndex((element) => element._id === game._id), 1, game);
    },
    combat_legend_remove_games(state, game) {
        state.combat_legendGames.splice(state.combat_legendGames.findIndex((element) => element._id === game._id), 1);
    },
    combat_legend_set_history(state, history) {
        state.combat_legendHistory = history;
    },
    combat_legend_add_history(state, game) {
        state.combat_legendHistory.unshift(game);
    },
    combat_legend_remove_last_history(state, game) {
        state.combat_legendHistory.pop();
    },
    combat_legend_set_game_data_game(state, game) {
        state.combat_legendGameData.game = game;
    },
    combat_legend_set_game_data_loading(state, status) {
        state.combat_legendGameData.loading = status;
    },
    combat_legend_set_roblox_server_link(state, status) {
        state.combat_legendRobloxServerLink = status;
    }
}

const actions = {
    combat_legendSetFilterAnimation({ commit }, value) {
        commit('combat_legend_set_filter_animation', value);
    },
    combat_legendSetFilterCount({ commit }, value) {
        commit('combat_legend_set_filter_count', value);
    },
    combat_legendSetFilterSort({ commit }, value) {
        commit('combat_legend_set_filter_sort', value);
    },
    combat_legendSetGameData({ commit }, game) {
        commit('combat_legend_set_game_data_game', game);
    },
    combat_legendSocketInit({ commit }, data) {
        commit('combat_legend_set_games', data.games);
        commit('combat_legend_set_history', data.history);
    },
    combat_legendSocketGame({ getters, commit }, data) {
        if(data.game.state !== 'completed') {
            if(getters.combat_legendGames.some((element) => element._id === data.game._id) === true) { commit('combat_legend_update_games', data.game); } 
            else { commit('combat_legend_add_games', data.game); }
        } else {
            commit('combat_legend_remove_games', data.game);
            commit('combat_legend_add_history', data.game);
            if(getters.combat_legendHistory.length > 25) { commit('combat_legend_remove_last_history'); }
        }

        if(getters.combat_legendGameData.game !== null && getters.combat_legendGameData.game._id === data.game._id) { commit('combat_legend_set_game_data_game', data.game); }
    },
    combat_legendGetGameDataSocket({ getters, commit, dispatch }, data) {
        if(getters.socketCombat_legend === null || getters.combat_legendGameData.loading === true) { return; }
        commit('combat_legend_set_game_data_loading', true);

        getters.socketCombat_legend.emit('getGameData', data, (res) => {
            if(res.success === true) {
                commit('combat_legend_set_game_data_game', res.game);
            } else {
                dispatch('notificationShow', res.error);
            }

            commit('combat_legend_set_game_data_loading', false);
        });
    },
    combat_legendSendCreateSocket({ getters, commit, dispatch }, data) {
        if(getters.socketCombat_legend === null || getters.socketSendLoading !== null) { return; }
        commit('socket_set_send_loading', 'Combat_legendCreate');

        getters.socketCombat_legend.emit('sendCreate', data, (res) => {
            if(res.success === false) {
                dispatch('notificationShow', res.error);
            }

            commit('socket_set_send_loading', null);
        });
    },
    combat_legendSendBotSocket({ getters, commit, dispatch }, data) {
        if(getters.socketCombat_legend === null || getters.socketSendLoading !== null) { return; }
        commit('socket_set_send_loading', 'Combat_legendBot');

        getters.socketCombat_legend.emit('sendBot', data, (res) => {
            if(res.success === false) {
                dispatch('notificationShow', res.error);
            }

            commit('socket_set_send_loading', null);
        });
    },
    combat_legendSendJoinSocket({ getters, commit, dispatch }, data) {
        if(getters.socketCombat_legend === null || getters.socketSendLoading !== null) { return; }
        commit('socket_set_send_loading', 'Combat_legendJoin');

        getters.socketCombat_legend.emit('sendJoin', data, (res) => {
            if(res.success === false) {
                dispatch('notificationShow', res.error);
            }

            commit('socket_set_send_loading', null);
        });
    },
    combat_legendSendJoinRoblox({ getters, commit, dispatch }, data) {
        if(getters.socketCombat_legend === null || getters.socketSendLoading !== null) { return; }
        commit('socket_set_send_loading', 'Combat_legendJoinRoblox');

        getters.socketCombat_legend.emit('sendJoinRoblox', data.data, (res) => {
            if(res.success === false) {
                dispatch('notificationShow', res.error);
            }else if(res.success == true){
                commit('combat_legend_set_roblox_server_link', res.data.roblox_server_link);
                data.callback(res.data.roblox_server_link);
            }

            commit('socket_set_send_loading', null);
        });
    },
}

const combat_legend = {
    state,
    mutations,
    actions,
    getters
}

export default combat_legend;
