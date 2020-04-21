<template>
  <div class="board bg-secondary">
    Board
    <!-- <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>-->
    <list />
  </div>
</template>

<script>
import list from "../components/List";
export default {
  name: "board",
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    }
  },
  props: ["boardId"],
  components: { list }
};
</script>
