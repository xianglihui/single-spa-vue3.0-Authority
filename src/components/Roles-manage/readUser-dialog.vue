<template>
  <el-dialog
    title="查看用户"
    :model-value="isReadUsers"
    width="420px"
    @close="closeDialog"
  >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="用户类型">
        <template #scope="scope">
          {{ userTypeList[+scope.row.userType] }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="handlePageCurrentChange"
    ></el-pagination>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="closeDialog">关 闭</el-button>
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
  props: ["isReadUsers", "row"],
  setup(props, context) {
    console.log("props", props);
    const { proxy } = useCurrentInstance(); // 拿全局api
    const parent = { ...context }; // 解构
    const { isReadUsers, row } = toRefs(props); // 解构
    const state = reactive({
      tableData: [],
      totalCount: 0, //mock环境下不便做分页
      isReadUsers,
      row,
    });
    const getRoleUsers = () => {
      proxy.$authApi.getRolesUserById(state.row.id).then((res: any) => {
        console.log("查看角色", res);
        state.tableData = res.data.result;
      });
    };
    const handlePageCurrentChange = (index: number) => {
      console.log("handlePageCurrentChange");
    };
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
      getRoleUsers();
    });
    return {
      ...toRefs(state),
      closeDialog,
      saveDialog,
      handlePageCurrentChange,
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
