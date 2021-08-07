<template>
  <el-dialog
    :title="dialogTypeNmae + '用户'"
    :model-value="isUpdateDialog"
    width="420px"
    @close="closeDialog"
  >
    <el-form ref="refForm" :model="form" label-width="80px" size="mini">
      <el-form-item label="用户名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.adminComment"></el-input>
      </el-form-item>
    </el-form>
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
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
} from "vue";
import { useCurrentInstance } from "@/utils/toolset";
import { ElMessage } from "element-plus";
interface Obj {
  [key: string]: string | number;
}
export default defineComponent({
  props: ["isUpdateDialog", "row", "dialogType"],
  setup(props, context) {
    console.log("props", props);
    const { proxy } = useCurrentInstance(); // 拿全局api
    const parent = { ...context }; // 解构
    const { isUpdateDialog, row, dialogType } = toRefs(props); // 解构
    console.log("row", row.value);
    const state = reactive({
      isUpdateDialog: isUpdateDialog.value,
      dialogType: dialogType.value,
      form: {},
      dialogTypeNmae: "",
    });
    // 刷新与关闭
    const emitFlush = () => {
      parent.emit("update:isUpdateDialog", false);
      parent.emit("update:flush");
    };
    const closeDialog = () => {
      // EventBus bug：关闭时父组件也更新数据，这跟内存指向有关系，暂时使用刷新列表或者深拷贝解决此类问题 2021-8-7
      // parent.emit("update:isUpdateDialog", false);
      emitFlush();
    };
    // submit
    const saveDialog = () => {
      // 编辑
      if (state.dialogType === "edit") {
        proxy.$authApi.editUser(state.form).then((res: any) => {
          ElMessage.success({
            message: "更新成功！",
            type: "success",
          });
          emitFlush();
        });
      }
      // 创建
      if (state.dialogType === "create") {
        proxy.$authApi.crateUser(state.form).then((res: any) => {
          ElMessage.success({
            message: "创建成功！",
            type: "success",
          });
          console.log("parent", parent);
        });
        emitFlush();
      }
    };
    onMounted(() => {
      state.dialogType === "edit"
        ? (state.dialogTypeNmae = "编辑")
        : (state.dialogTypeNmae = "创建");
      if (state.dialogType === "edit") {
        state.form = row.value;
      }
    });
    onUnmounted(() => {
      console.log("onUnmounted");
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
