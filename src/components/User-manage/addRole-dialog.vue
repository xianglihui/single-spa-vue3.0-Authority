<template>
  <el-dialog
    title="设置权限"
    :model-value="isEditDialog"
    width="420px"
    @close="closeDialog"
  >
    <div class="dialog-con">
      <el-tree
        @check="handleChenk"
        :data="allTree"
        :props="defaultProps"
        :default-checked-keys="checkedNode"
        highlight-current
        show-checkbox
        node-key="code"
        ref="tree"
      />
    </div>
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
export default defineComponent({
  props: ["isEditDialog", "row"],
  setup(props, context) {
    console.log("props", props);
    const { proxy } = useCurrentInstance(); // 拿全局api
    const parent = { ...context }; // 解构
    const { isEditDialog, row } = toRefs(props); // 解构
    const state = reactive({
      allTree: [], // 权限树
      isEditDialog: isEditDialog.value,
      defaultProps: {
        label: "name",
        children: "children",
      },
      checkedNode: [], // 选中的tree节点
      form: {
        roleId: 0,
        grantedPermissionNames: [], // checked tree node
      },
      row,
    });
    watch(
      isEditDialog,
      (newVal) => {
        state.isEditDialog = newVal;
      },
      { immediate: true }
    );
    const closeDialog = () => {
      // EventBus
      parent.emit("update:isEditDialog", false);
    };
    /**
     * json-server mock all-tree可以与我的权限列表合并成一个请求返回，由于更新用户角色权限时不需要更新all-tree，就单独做请求 2021-07-31
     * 获取所有权限树
     */
    const getAllTree = () => {
      proxy.$authApi.features().then((res: any) => {
        console.log("获取所有权限树", res);
        state.allTree = res.data;
        console.log("state.allTree",state.allTree)
      });
    };
    // 获取用户权限 超级管理员 id：1
    const getPolePermisson = () => {
      console.log("row.id", state.row.id);
      proxy.$authApi.GetRolesById(state.row.id).then((res: any) => {
        console.log("获取用户权限", res);
      });
    };
    const handleChenk = (data: any, node: any) => {
      const codes = [];
      for (const i of node.halfCheckedNodes) {
        codes.push(i.code);
      }
      state.form.grantedPermissionNames = node.checkedKeys.concat(codes);
    };
    const saveDialog = () => {
      console.log("保存");
    };
    onMounted(() => {
      getAllTree();
      getPolePermisson();
    });
    return {
      ...toRefs(state),
      closeDialog,
      handleChenk,
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
