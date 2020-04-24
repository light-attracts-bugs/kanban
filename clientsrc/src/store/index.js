import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 8000,
  withCredentials: true,
});

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    activeLists: {},
    tasks: {},
    activeTasks: {},
    comments: {},
    tempTask: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    setActiveBoard(state, board) {
      state.activeBoard = board;
    },
    setLists(state, lists) {
      state.lists = lists;
    },
    setTasks(state, payload) {
      //state.tasks[payload.listId] = payload.tasks
      Vue.set(state.tasks, payload.listId, payload.tasks)
    },
    setComments(state, payload) {
      // state.comments = comments;
      Vue.set(state.comments, payload.taskId, payload.comment)
    },
    setTaskToMove(state, taskData) {
      state.tempTask = taskData
    },
    removeFromList(state, payload) {
      let list = state.lists.find(r => r.id == payload.oldListId)
      list.task = list.tasks.filter(i => i.id != payload.taskToMove.id)
    },
    addToList(state, payload) {
      let list = state.lists.find(r => r.id == payload.newListId)
      list.tasks.push(payload.taskToMove)
    }
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
        let res = await api.get("/profile");
        commit("setUser", res.data);
      } catch (err) {
        console.error(err);
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
      let res = await api.get("boards").then((res) => {
        commit("setBoards", res.data);
      });
    },
    async addBoard({ commit, dispatch }, boardData) {
      let res = await api.post("boards", boardData).then((serverBoard) => {
        dispatch("getBoards");
      });
    },

    async getActiveBoard({ commit, dispatch }, board) {
      try {
        let res = await api.get("boards/" + board);
        commit("setActiveBoard", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async editBoard({ commit, dispatch }, board) {
      try {
        await api.put("boards/" + board.id, board);
      } catch (error) {
        console.error(error);
      }
    },

    async deleteBoard({ commit, dispatch }, boardId) {
      try {
        await api.delete("boards/" + boardId);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- LISTS --
    async getLists({ commit, dispatch }, boardId) {
      try {
        let res = await api.get("/boards/" + boardId + "/lists");
        commit("setLists", res.data);
      } catch (err) {
        console.error(err);
      }
    },

    async addList({ commit, dispatch }, newList) {
      let res = await api.post("lists", newList);
      dispatch("getLists", newList.boardId);
    },

    async editList({ commit, dispatch }, listData) {
      try {
        await api.put("lists/" + listData.id, listData);
      } catch (error) {
        console.error(error);
      }
    },

    async deleteList({ commit, dispatch }, listData) {
      try {
        await api.delete("lists/" + listData.id);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- TASKS --
    async getTasks({ commit, dispatch }, listId) {
      try {
        let res = await api.get("lists/" + listId + "/tasks");
        console.log("getTasks called... res:", res);
        commit("setTasks", { listId, tasks: res.data });
      } catch (err) {
        console.error(err);
      }
    },

    async addTask({ commit, dispatch }, newTask) {
      try {
        let res = await api.post("tasks", newTask);
        dispatch("getTasks", newTask.listId);
      } catch (error) {
        console.error(error);
      }
    },

    async editTask({ commit, dispatch }, taskData) {
      try {
        await api.delete("tasks/" + taskData.id);
      } catch (error) {
        console.error(error);
      }
    },

    async deleteTask({ commit, dispatch }, taskData) {
      try {
        await api.delete("tasks/" + taskData.id);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- COMMENTS --
    async getComments({ commit, dispatch }, taskId) {
      try {
        let res = await api.get("tasks/" + taskId + "/comments");
        console.log("comments", res.data);
        commit("setComments", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async addComment({ commit, dispatch }, newComment) {
      let res = await api.post("comments", newComment);
    },

    async editComment({ commit, dispatch }, commentData) {
      try {
        await api.delete("comments/" + commentData.id);
      } catch (error) {
        console.error(error);
      }
    },

    async deleteComment({ commit, dispatch }, commentData) {
      try {
        await api.delete("comments/" + commentData.id);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
    setTaskToMove({ commit, dispatch }, taskData) {
      commit("setTaskToMove", taskData)
    },
    moveTask({ commit, dispatch }, taskData) {
      commit("removeFromList", taskData)
      commit("addToList", taskData)
    }
  },
});
