<template>
  <div class="task bg-info text-center w-75 h-75 m-auto">
    Task
    <p>{{taskData.title}}</p>
    <comment />
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
    }
  },
  components: { Comment }
};
</script>


<style scoped>
</style>