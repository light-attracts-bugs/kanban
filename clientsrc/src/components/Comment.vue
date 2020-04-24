<template>
  <div class="comment row bg-light m-2 rounded shadow">
    <div class="col-12 my-2">
      <div class="row text-right">
        <div class="col-12">
          <!-- <button type="submit">
            <i class="fas fa-pencil-alt text-warning"></i>
          </button>-->
          <button class="btn btn-sm" @click="deleteComment()">
            <i class="fas fa-trash-alt text-danger"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p>"{{commentData.body}}"</p>
          <p class="text-right">-{{commentData.creatorName}}</p>
        </div>
      </div>
    </div>
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
      //this.$store.dispatch("getComments", this.comment.taskId);
      this.$store.dispatch("getComments", this.commentData.taskId);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>