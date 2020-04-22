<template>
  <div class="board bg-secondary">
    Board
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <list v-for="list in lists" :key="list.id" :listData="list"></list>
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required />
      <button type="submit">Create List</button>
    </form>
  </div>
</template>

<script>
  import list from "../components/List";
  export default {
    name: "board",
    props: ["board"],
    data() {
      return {
        newList: {}
      };
    },
    computed: {
      board() {
        //FIXME This does not work on page reload because the activeBoard is empty in the store
        return this.$store.state.activeBoard;
      },
      lists() {
        //FIXME This does not work on page reload because the activeList is empty in the store
        return this.$store.state.lists;
      },
    },

    methods: {
      addList() {
        this.newList.boardId = this.$route.params.boardId;
        console.log(this.newList)
        this.$store.dispatch("addList", this.newList);
        this.newList = {};
      }
    },
    mounted() {
      this.$store.dispatch("getLists", this.$route.params.boardId);
    },
    props: ["boardId"],
    components: { list }
  };
</script>