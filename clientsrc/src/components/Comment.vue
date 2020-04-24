<template>
  <div class="comment bg-light w-75 m-auto rounded shadow">
    Comment here...
    <p>{{commentData.body}}</p>
    <button type="submit">
      <i class="fas fa-pencil-alt text-warning"></i>
    </button>
    <button class="btn btn-sm" @click="deleteComment()">
      <i class="fas fa-trash-alt text-danger"></i>
    </button>
  </div>
</template>


<script>
export default {
  name: "comment",
  data() {
    return {};
  },
  props: ["commentData"],
  computed: {},
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.commentData);
      this.$store.dispatch("getComments", this.comment.taskId);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>