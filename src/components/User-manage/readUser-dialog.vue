<template>
  <el-dialog
    title="查看用户"
    :model-value="isReadUsers"
    width="420px"
    @close="closeDialog"
  >
    <template #footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="closeDialog">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveDialog"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted, watch } from "vue";
import { useCurrentInstance } from "@/utils/toolset";
import { ElMessage } from "element-plus";
interface Obj {
  [key: string]: string | number;
}
export default defineComponent({
  props: ["isReadUsers"],
  setup(props, context) {
    console.log("props", props);
    const { proxy } = useCurrentInstance(); // 拿全局api
    const parent = { ...context }; // 解构
    const { isReadUsers } = toRefs(props); // 解构
    const state = reactive({});
    const closeDialog = () => {
      // EventBus
      parent.emit("update:isReadUsers", false);
    };

    // submit
    const saveDialog = () => {
      console.log("submit");
    };
    onMounted(() => {
      console.log("onMounted");
    });
    return {
      ...toRefs(state),
      closeDialog,
      saveDialog,
    };
  },
});
</script>

<style>
.dialog-con {
  height: 400px;
  overflow-y: scroll;
}
</style>
