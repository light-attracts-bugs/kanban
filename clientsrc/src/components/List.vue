<template>
  <div class="list bg-danger text-center w-75 h-75 m-auto">
    List
    <p>{{list.title}}</p>
    <task />
  </div>
</template>


<script>
  import task from "../components/Task.vue";
  export default {
    name: "list",
    data() {
      return {};
    },
    props: ["list"],
    computed: {},
    methods: {},
    components: { task }
  };
</script>


<style scoped>
</style>