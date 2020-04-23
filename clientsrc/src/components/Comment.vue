<template>
  <div class="comment bg-light w-75 m-auto rounded shadow">Comment here...
    <p>{{commentData.body}}</p>

  </div>
</template>


<script>
export default {
  name: "comment",
  data() {
    return {};
  },
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