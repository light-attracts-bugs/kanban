<template>
  <div class="list bg-danger text-center mx-1 my-3 col-3 rounded shadow">
    <div class="row text-center">
      <div class="col-12 text-right">
        <div
          class="btn-group rounded mt-1 text-right shadow"
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <button type="button" class="btn btn-warning">Edit</button>
          <button type="button" class="btn btn-info">Delete</button>

          <!-- <div class="btn-group" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-secondary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Move To...</button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <a class="dropdown-item" href="#">Dropdown link</a>
              <a class="dropdown-item" href="#">Dropdown link</a>
            </div>
          </div>-->
        </div>
      </div>
    </div>
    <p>{{listData.title}}</p>
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
  props: ["listData"],
  computed: {},
  methods: {},
  components: { task }
};
</script>


<style scoped>
</style>