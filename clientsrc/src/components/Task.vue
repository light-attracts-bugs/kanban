<template>
  <div class="task bg-info text-center w-75 h-75 m-auto" @dragstart="startZone()">
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
            aria-describedby="button-addon2" v-model="newComment.description" />
          <div class="input-group-append">
            <button class="btn btn-outline-light btn-success" type="button" id="button-addon2" @click="addComment()">Add
              Comment</button>
          </div>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-12">
          <comment v-for="comment in comments" :key="comment.id" :taskData="task"></comment>
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
        newComment: {}
      };
    },
    props: ["taskData"],
    computed: {
      comments() {
        return this.$store.state.comments;
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
      startZone() {
        this.$emit("dragstart");
      }
    },
    components: { Comment }
  };
</script>


<style scoped>
</style>