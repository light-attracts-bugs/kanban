<template>
  <div class="task bg-info text-center w-75 h-75 m-auto">
    Task
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
  computed: {},
  methods: {},
  components: { comment }
};
</script>


<style scoped>
</style>