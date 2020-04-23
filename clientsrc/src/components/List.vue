<template>
  <div class="list bg-danger text-center mx-1 my-3 col-3 rounded shadow">
    <div class="row text-center">
      <div class="col-12 text-right">
        <div class="btn-group rounded mt-1 text-right shadow" role="group"
          aria-label="Button group with nested dropdown">
          <button type="button" class="btn btn-warning">Edit</button>
          <button type="button" class="btn btn-info">Delete</button>
        </div>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-12">
        <task v-for="task in tasks" :key="task.id" :taskData="task"></task>
      </div>
    </div>
    <p>{{listData.title}}</p>
    <task />
    <div class="row text-center">
      <div class="col-12">
        <input class="rounded shadow w-100 bg-warning my-1" type="text" placeholder="New task title..."
          v-model="newTask.title" />
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Enter a new task here..."
            aria-label="Recipient's username" aria-describedby="button-addon2" v-model="newTask.description" />

          <div class="input-group-append">
            <button class="btn btn-outline-light btn-success" type="button" id="button-addon2" @click="addTask()">Add
              Task</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import task from "../components/Task.vue";
  export default {
    name: "list",
    data() {
      return {
        newTask: {}
      };
    },
    props: ["listData"],
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listData.id];
      }
      // board() {
      //   //FIXME This does not work on page reload because the activeBoard is empty in the store
      //   return this.$store.state.activeList;
      // },
    },
    methods: {
      addTask() {
        this.newTask.listId = this.listData.id;
        console.log(this.newTask);

        this.$store.dispatch("addTask", this.newTask);
        this.newList = {};
        this.$store.dispatch("getTasks", this.listData.id);
      },

      getTasks() {
        this.$store.dispatch("getTasks", this.listData.id);
      }
    },
    mounted() {
      this.$store.dispatch("getTasks", this.listData.id);
    },
    components: { task }
  };
</script>


<style scoped>
</style>