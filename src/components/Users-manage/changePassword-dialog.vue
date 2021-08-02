<template>
  <el-dialog
    title="修改密码"
    :model-value="isChangePassword"
    width="420px"
    @close="closeDialog"
  >
    <el-form ref="refForm" :model="form" label-width="80px" size="mini">
      <el-form-item label="原密码">
        <el-input v-model="form.originalPassword"></el-input>
      </el-form-item>
      <el-form-item label="修改密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.confirmPassword"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="mini" type="primary" @click="saveDialog">
          确 定
        </el-button>
        <el-button size="mini" @click="closeDialog">关 闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useCurrentInstance } from "@/utils/toolset";
import { ElMessage } from "element-plus";
interface Obj {
  [key: string]: string | number;
}
export default defineComponent({
  props: ["isChangePassword", "row"],
  setup(props, context) {
    console.log("props", props);
    const { proxy } = useCurrentInstance(); // 拿全局api
    const parent = { ...context }; // 解构
    const { isChangePassword, row } = toRefs(props); // 解构
    const state = reactive({
      form: {
        originalPassword: "",
        password: "",
        confirmPassword: "",
      },
      isChangePassword,
      row,
    });

    const closeDialog = () => {
      // EventBus
      parent.emit("update:isChangePassword", false);
    };

    // submit
    const saveDialog = () => {
      console.log("submit");
    };
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
