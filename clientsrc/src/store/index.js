import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 8000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    activeLists: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    },
    setLists(state, lists) {
      state.lists = lists
    },
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    async getBoard({ commit }, boardId) {
      try {
        let res = await api.get(`boards/${boardId}`);
        commit("setActiveBoard", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async getBoards({ commit, dispatch }) {
      let res = await api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    async addBoard({ commit, dispatch }, boardData) {
      let res = await api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    //#endregion


    //#region -- LISTS --
    async getLists({ commit, dispatch }, boardId) {
      try {
        let res = await api.get("/boards/" + boardId + "/lists")
        commit("setLists", res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async addList({ commit, dispatch }, newList) {
      let res = await api.post('lists', newList)
      dispatch('getLists', newList.boardId)
    }
  },

  //#endregion
})
