<template>
  <div class="task bg-info text-center w-75 h-75 m-auto" @dragstart="moveTask()">
    <div class="row text-center">
      <div class="col-12 text-right">
        <div class="btn-group rounded mt-1 text-right shadow" role="group"
          aria-label="Button group with nested dropdown">
          <button type="button" class="btn btn-warning">Edit</button>
          <button type="button" class="btn btn-info">Delete</button>
        </div>
      </div>
    </div>
    <p>{{taskData.title}}</p>
    <p>{{taskData.description}}</p>
    <div class="row text-center">
      <div class="col-12">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="comment" aria-label="Recipient's username"
            aria-describedby="button-addon2" v-model="newComment.body" />
          <div class="input-group-append">
            <button class="btn btn-outline-light btn-success" type="button" id="button-addon2" @click="addComment()">Add
              Comment</button>
          </div>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-12">
          <comment v-for="comment in comments" :key="comment.id" :commentData="comment"  :taskId="taskData.id"></comment>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import Comment from "../components/Comment";
  export default {
    name: "task",
    data() {
      return {
        newComment: {
          // name:this.$store.state.user.name
        }
      };
    },
    props: ["taskData"],
    computed: {
      comments() {
        return this.$store.state.comments[this.taskData.id];
      }
    },
    methods: {
      getComments() {
        this.$store.dispatch("getComments", this.taskData.id);
      },
      addComment() {
        this.newComment.creatorName = this.$auth.user.name;
        this.newComment.taskId = this.taskData.id;
        console.log(this.newComment);
        this.$store.dispatch("addComment", this.newComment);
        this.newComment = {};
        this.getComments();
      },
      deleteTask() {
        this.$store.dispatch("deleteTask", this.taskData);
        this.$store.dispatch("getTasks", this.taskData.listId);
      },
      moveTask() {
        this.$emit("dragstart");
        //2nd way
        //event.dataTransfer.setData("data", JSON.stringify(this.taskData));
        //event.dataTransfer.setData("list", this.listId);
      }
    },
      mounted() {
      this.$store.dispatch("getComments", this.taskData.id);
    },
    components: { Comment }
  };
</script>


<style scoped>
</style>