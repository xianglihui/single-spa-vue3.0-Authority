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
        v-for="item in localTabs"
        :key="item.id"
        :label="item.label"
        :name="item.id"
      >
      </el-tab-pane>
    </el-tabs>
    <router-view :class="showSidebar ? 'nav-content' : ''"></router-view>
  </div>
</template>

<script lang="ts">
interface Tab {
  [key: string]: string;
  props: any;
}
[];
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { env } from "@/utils";
export default {
  setup() {
    const state = reactive({
      localTabs: [
        { label: "权限树", id: "permission" },
        { label: "角色管理", id: "role" },
        { label: "用户管理", id: "user" },
      ],
    });
    const router = useRouter();
    const activeLable = ref("permission");
    // const showSidebar = ref(env.showSidebar());
    const showSidebar = ref(env.showSidebar());
    const choiceLabel = (tab: Tab) => {
      console.log("tab", tab);
      router.push(`/authority/${tab.props.name}`);
    };
    return {
      ...toRefs(state),
      showSidebar,
      activeLable,
      choiceLabel,
    };
  },
};
</script>

<style scoped>
/* .nav {
  display: flex;
  justify-content: flex-start;
} */
</style>
