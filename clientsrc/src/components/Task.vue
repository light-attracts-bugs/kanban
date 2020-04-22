<template>
  <div class="task bg-info text-center w-75 h-75 m-auto">
    Task
    <p>{{taskData.title}}</p>
    <comment />
  </div>
</template>


<script>
  import comment from "../components/Comment";
  export default {
    name: "task",
    data() {
      return {};
    },
    props: ["taskData"],
    computed: {},
    methods: {},
    components: { comment }
  };
</script>


<style scoped>
</style>