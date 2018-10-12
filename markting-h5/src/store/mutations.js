import * as types from './mutation-types'

const mutations = {
  [types.SAVE_USER_NAME](state, username) {
    state.username = username;
  },
}

export default mutations;

