<template>
  <div class="list bg-danger text-center w-75 h-75 m-auto">
    <h1 v-if="listData.title">{{listData.title}}</h1>
    <h1 v-else>Loading...</h1>
    <Task v-for="task in tasks" :key="task.id" :taskData="task"></Task>
    <form @submit.prevent="addtask">
      <input type="text" placeholder="title" v-model="newTask.title" required />
      <button type="submit">Create Task</button>
    </form>
  </div>
</template>


<script>
  import Task from "../components/Task.vue";
  export default {
    name: "list",
    props: ["listData"],
    data() {
      return {
        newTask: {}
      };
    },
    computed: {
      list() {
        //FIXME This does not work on page reload because the activeTask is empty in the store
        return this.$store.state.activeList;
      },
      tasks() {
        //FIXME This does not work on page reload because the activeTask is empty in the store
        return this.$store.state.tasks;
      },
    },

    methods: {
      addTask() {
        this.newTask.listId = this.$route.params.listId;
        console.log(this.newTask)
        this.$store.dispatch("addTask", this.newTask);
        this.newTask = {};
      },

      deleteList() {
        this.$store.dispatch("deleteList", this.listData);
        this.$store.dispatch("getLists", this.listData.boardId);
      }
    },
    mounted() {
      this.$store.dispatch("getTasks", this.listData.listId);
    },
    components: { Task }
  };
</script>

<style scoped>
</style>