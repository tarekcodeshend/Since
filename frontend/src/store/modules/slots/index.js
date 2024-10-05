const state = {
    slotsFilterSearch: '',
    slotsFilterSort: 'highest',
    slotsFilterSelect: 'featured',
    slotsCount: 1,
    slotsRunning: false,
    slotsBoxes: [],
    slotsGames: [],
    slotsBoxData: {
        box: null,
        url: null,
        loading: false
    }
}

const getters = {
    slotsFilterSearch: state => state.slotsFilterSearch,
    slotsFilterSort: state => state.slotsFilterSort,
    slotsFilterSelect: state => state.slotsFilterSelect,
    slotsCount: state => state.slotsCount,
    slotsRunning: state => state.slotsRunning,
    slotsBoxes: state => state.slotsBoxes,
    slotsGames: state => state.slotsGames,
    slotsBoxData: state => state.slotsBoxData
}

const mutations = {
    slots_set_filter_search(state, value) {
        state.slotsFilterSearch = value;
    },
    slots_set_filter_sort(state, value) {
        state.slotsFilterSort = value;
    },
    slots_set_filter_select(state, value) {
        state.slotsFilterSelect = value;
    },
    slots_set_count(state, value) {
        state.slotsCount = value;
    },
    slots_set_running(state, value) {
        state.slotsRunning = value;
    },
    slots_set_boxes(state, boxes) {
        state.slotsBoxes = boxes;
    },
    slots_set_games(state, games) {
        state.slotsGames = games;
    },
    slots_set_game_data_box(state, box) {
        state.slotsBoxData.box = box;
        state.slotsBoxData.url = box.url;
    },
    slots_set_game_data_loading(state, status) {
        state.slotsBoxData.loading = status;
    }
}

const actions = {
    slotsSetFilterSearch({ commit }, value) {
        commit('slots_set_filter_search', value);
    },
    slotsSetFilterSort({ commit }, value) {
        commit('slots_set_filter_sort', value);
    },
    slotsSetFilterSelect({ commit }, value) {
        commit('slots_set_filter_select', value);
    },
    slotsSetCount({ commit }, value) {
        commit('slots_set_count', value);
    },
    slotsSetRunnning({ commit }, value) {
        commit('slots_set_running', value);
    },
    slotsSetGames({ commit }, games) {
        commit('slots_set_games', games);
    },
    slotsSocketInit({ commit }, data) {
        commit('slots_set_boxes', data.boxes);
    },
    slotsGetBoxDataSocket({ getters, commit, dispatch }, data) {
        if(getters.socketSlots === null || getters.slotsBoxData.loading === true) { return; }
        commit('slots_set_game_data_loading', true);

        getters.socketSlots.emit('getBoxData', data, (res) => {
            if(res.success === true) {
                commit('slots_set_game_data_box', res.box);
            } else {
                dispatch('notificationShow', res.error);
            }

            commit('slots_set_game_data_loading', false);
        });
    },
    slotsSendBetSocket({ getters, commit, dispatch }, data) {
        if(getters.socketSlots === null || getters.socketSendLoading !== null) { return; }
        commit('socket_set_send_loading', 'SlotsBet');

        getters.socketSlots.emit('sendBet', data, (res) => {
            if(res.success === true) {
                commit('auth_update_user', res.user);
                commit('slots_set_games', res.games);
                commit('slots_set_running', true);
            } else {
                dispatch('notificationShow', res.error);
            }

            commit('socket_set_send_loading', null);
        });
    }
}

const slots = {
    state,
    mutations,
    actions,
    getters
}

export default slots;