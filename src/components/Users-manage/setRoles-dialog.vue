<template>
  <el-dialog
    title="编辑角色"
    :model-value="isAddRoles"
    width="420px"
    @close="closeDialog"
  >
    <el-form ref="form" :model="form" label-width="80px" size="mini">
      <el-form-item label="角色">
        <el-button
          icon="el-icon-search"
          @click="handleRoleDialogClick"
        ></el-button>
        <br />
        <!-- <el-popover
          placement="top-start"
          :width="200"
          trigger="click"
          :key="index"
          :content="item.roleName"
        > -->
        <el-tag
          class="tag"
          closable
          v-for="(item, index) in form.assignedRoles"
          :key="index"
          size="small"
          @close="handleCloseTag(item)"
          @click="handleClick(item)"
        >
          {{ item.roleName }}
        </el-tag>
        <!-- </el-popover> -->
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="closeDialog">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveDialog">
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <changeRolesDialog
    v-if="isSelectRole"
    v-model:isSelectRole="isSelectRole"
    :row="clickRow"
  ></changeRolesDialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import { useCurrentInstance } from "@/utils/toolset";
import changeRolesDialog from "@/components/Users-manage/changeRoles-dialog.vue";
import { ElMessage } from "element-plus";
interface Obj {
  [key: string]: string | number;
}
export default defineComponent({
  components: {
    changeRolesDialog,
  },
  props: ["isAddRoles", "row"],
  setup(props, context) {
    console.log("props", props);
    const { proxy } = useCurrentInstance(); // 拿全局api
    const parent = { ...context }; // 解构
    const { isAddRoles, row } = toRefs(props); // 解构
    // https://github.com/element-plus/element-plus/issues/2775
    const state = reactive({
      isAddRoles: isAddRoles.value,
      defaultProps: {
        label: "name",
        children: "children",
      },
      checkedNode: [], // 选中的tree节点
      form: {
        id: row.value.id,
        assignedRoles: [],
      },
      isSelectRole: false, //选择角色
      row,
    });
    const getRolesById = () => {
      proxy.$authApi.getUserRolesById(state.row.id).then((res: any) => {
        console.log("根据id拿用户下的角色", res);
        state.form.assignedRoles = res.data.roleNames;
        console.log("state.form.assignedRoles ", state.form.assignedRoles);
      });
    };
    const closeDialog = () => {
      // EventBus
      parent.emit("update:isAddRoles", false);
    };
    // 打开角色选择
    const handleRoleDialogClick = () => {
      console.log("打开角色选择");
      state.isSelectRole = true;
    };
    const handleCloseTag = () => {
      console.log("---");
    };
    const handleClick = () => {
      console.log("===");
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
      getRolesById();
      console.log("onMounted");
    });
    return {
      ...toRefs(state),
      closeDialog,
      saveDialog,
      handleRoleDialogClick,
      handleCloseTag,
      handleClick,
    };
  },
});
</script>

<style>
.dialog-con {
  height: 400px;
  overflow-y: scroll;
}
.tag {
  margin: 0 3px 3px 0;
  vertical-align: middle;
  cursor: pointer;
}
</style>
