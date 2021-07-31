<template>
  <el-dialog
    title="设置权限"
    :model-value="isEditDialog"
    width="420px"
    @close="closeDialog"
  >
    <!-- default-checked-keys 默认勾选的节点的 key 的数组 -->
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
import { ElMessage } from "element-plus";
interface Obj {
  [key: string]: string | number;
}
export default defineComponent({
  props: ["isEditDialog", "row"],
  setup(props, context) {
    console.log("props", props);
    const { proxy } = useCurrentInstance(); // 拿全局api
    const parent = { ...context }; // 解构
    const { isEditDialog, row } = toRefs(props); // 解构
    // https://github.com/element-plus/element-plus/issues/2775
    const tree = ref(null) as any;
    const state = reactive({
      allTree: [], // 权限树
      isEditDialog: isEditDialog.value,
      defaultProps: {
        label: "name",
        children: "children",
      },
      checkedNode: [], // 选中的tree节点
      form: {
        id: row.value.id,
        grantedPermissions: [], // checked tree node
      },
      row,
      tree,
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
     * 获取所有权限树 getRolePermissonTree与getRoleAllPres接口返回的数据是可以合并到getAllTree中，mock时为修改比较方便，所以分开请求
     */
    const getAllTree = () => {
      proxy.$authApi
        .features()
        .then((res: any) => {
          console.log("获取所有权限树", res);
          state.allTree = res.data;
          console.log("state.allTree", state.allTree);
        })
        .then(() => {
          getRolePermissonTree();
        })
        .then(() => {
          getRoleAllPres();
        });
    };
    /**
     * 获取用户权限树 回显用户权限
     * 超级管理员 id：1
     */
    const getRolePermissonTree = () => {
      proxy.$authApi.GetRolesTreeById(state.row.id).then((res: any) => {
        console.log("获取用户权限树", res);
        const names = res.data.result.map((item: { name: string }) => {
          return item.name.toString();
        });
        // 回显
        state.checkedNode = names;
        console.log("tree", state.tree);
        state.tree.getHalfCheckedKeys().concat(state.tree.getCheckedKeys());
      });
    };
    // 获取用户原来的所有权限
    const getRoleAllPres = () => {
      proxy.$authApi.GetRolesById(state.row.id).then((res: any) => {
        console.log("获取用户原来的所有权限", res);
        /**
         * 这里传全部数据，是因为mock无法通过map数据后的id去更新原有的数组，实际场景应该是直接拿id就可以去后端patch数据，不需要全部数据
         */
        // state.form.grantedPermissions = res.data.grantedPermissions.map(
        //   (item: any) => {
        //     return item.name.toString();
        //   }
        // );
        state.form.grantedPermissions = res.data.grantedPermissions;
        console.log("state.form", state.form);
      });
    };
    // 在权限树上增/删用户权限
    const handleChenk = (data: any, node: any) => {
      const codes = [];
      for (const i of node.halfCheckedNodes) {
        codes.push(i.code);
      }
      state.form.grantedPermissions = node.checkedKeys.concat(codes);
    };
    // submit
    const saveDialog = () => {
      console.log("保存");
      console.log("state.form", state.form);
      proxy.$authApi
        .addRolePermission(state.form)
        .then((res: any) => {
          console.log("res", res);
          ElMessage.success({
            message: "角色编辑成功",
            type: "success",
          });
        })
        .catch(() => {
          ElMessage.error({
            message: "角色编辑权限失败",
            type: "error",
          });
        });
    };
    onMounted(() => {
      getAllTree();
    });
    return {
      ...toRefs(state),
      closeDialog,
      saveDialog,
      handleChenk,
      tree,
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
