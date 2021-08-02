<template>
  <el-dialog
    :title="dialogTypeNmae + '角色'"
    :model-value="isUpdateDialog"
    width="420px"
    @close="closeDialog"
  >
    <el-form ref="refForm" :model="form" label-width="80px" size="mini">
      <el-form-item label="显示名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description"></el-input>
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
import { defineComponent, ref, reactive, toRefs, onMounted, watch } from "vue";
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
      form: row.value.row || {}, // 创建时form为空对象
      dialogTypeNmae: "",
    });
    const closeDialog = () => {
      // EventBus
      parent.emit("update:isUpdateDialog", false);
    };
    const editRole = () => {
      console.log("编辑角色");
    };
    const createRole = () => {
      console.log("编辑角色");
    };
    // submit
    const saveDialog = () => {
      // 编辑
      if (state.dialogType === "edit") {
        proxy.$authApi.editRole(state.form).then((res: any) => {
          ElMessage.success({
            message: "更新成功！",
            type: "success",
          });
        });
        parent.emit("update:isUpdateDialog", false);
      }
      // 创建
      if (state.dialogType === "create") {
        proxy.$authApi.createRole(state.form).then((res: any) => {
          ElMessage.success({
            message: "创建成功！",
            type: "success",
          });
          console.log("parent", parent);
          parent.emit("update:flush");
        });
        parent.emit("update:isUpdateDialog", false);
      }
    };
    onMounted(() => {
      state.dialogType === "edit"
        ? (state.dialogTypeNmae = "编辑")
        : (state.dialogTypeNmae = "创建");
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
