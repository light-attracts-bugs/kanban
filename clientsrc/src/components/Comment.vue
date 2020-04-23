<template>
  <div class="comment bg-light w-75 h-75 m-auto">
    {{commentData.body}}
    {{commentData.creatorName}}
    <button class="btn-sm btn-dangerS" @click="deleteComment">delete</button>
  </div>
</template>


<script>
  export default {
    name: "comment",
    props: ["commentData"],
    data() {
      return {};
    },
    computed: {},
    methods: {
      async deleteComment() {
        await this.$store.dispatch("deleteComment", this.commentData);
        this.$store.dispatch("getComments", this.commentData.taskId);
      }
    },
    components: {}
  };
</script>


<style scoped>
</style>