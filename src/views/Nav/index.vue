<template>
  <!-- 本地开发环境下 flex布局 显示侧边栏 方便调试 -->
  <div :class="showSidebar ? 'nav' : ''">
    <el-tabs
      class="nav-left"
      v-model="activeLable"
      @tab-click="choiceLabel"
      :tab-position="'left'"
      v-if="showSidebar"
    >
      <el-tab-pane
        v-for="item of localTabs"
        :key="item.id"
        :label="item.label"
        :name="item.id"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
interface Tab {
  [key: string]: string;
}
[];
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { env } from "@/utils";
export default {
  setup() {
    const state = reactive({
      localTabs: [{ label: "角色管理", id: "role-manage" }],
    });
    const router = useRouter();
    const activeLable = ref("role-manage");
    const showSidebar = ref(env.showSidebar());

    const choiceLabel = (tab: Tab) => {
      router.push(`/authority/${tab.name}`);
    };
    return {
      ...toRefs(state),
      showSidebar,
      activeLable,
      choiceLabel
    };
  },
};
</script>

<style scoped></style>
