<template>
  <div class="task bg-info text-center rounded shadow m-auto" @dragstart="moveTask()">
    <div class="row text-center my-4">
      <div class="col-12 text-right">
        <div
          class="btn-group rounded mt-1 text-right shadow"
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <!-- <button type="button" class="btn btn-warning">Edit</button> -->
          <button
            type="button"
            class="btn btn-secondary mt-1 mr-2"
            @click="deleteTask()"
          >Delete This Task</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <h2 class="font-bolder m2 rounded">{{taskData.title}}</h2>
        <h4 class="font-bolder m1 rounded">{{taskData.description}}</h4>
      </div>
    </div>
    <comment
      v-for="comment in comments"
      :key="comment.id"
      :commentData="comment"
      :taskId="taskData.id"
    ></comment>

    <div class="row text-center mx-3">
      <div class="col-12">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="comment"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            v-model="newComment.body"
            onfocus="this.value=''"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-light btn-success"
              type="button"
              id="button-addon2"
              @click="addComment()"
            >
              Add
              Comment
            </button>
          </div>
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
      //console.log(this.newComment);
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