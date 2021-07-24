<template>
  <div :class="showSidebar ? 'nav' : ''"></div>
</template>

<script lang="ts">
import { reactive, toRefs, ref } from "vue";
import { env } from "@/utils";
export default {
  setup() {
    const state = reactive({});
    const showSidebar = ref(env.showSidebar());
    console.log("showSidebar", showSidebar);
    return {
      ...toRefs(state),
      showSidebar,
    };
  },
};
</script>

<style scoped></style>
