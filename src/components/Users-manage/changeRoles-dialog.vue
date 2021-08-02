<template>
  <el-dialog
    title="选择角色"
    :model-value="isSelectRole"
    width="420px"
    @close="closeDialog"
  >
    <el-row :gutter="24">
      <el-col :span="14">
        <div style="width: 340px">
          <div>
            <el-input
              v-model="searchStr"
              placeholder="请输入角色"
              size="mini"
              style="width: 330px; margin: 0 8px"
            />
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @current-change="handleTableCurrentChange"
            highlight-current-row
          >
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column prop="name" label="角色名称"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <!-- <el-table-column
              prop="roleTypeName"
              label="角色类型"
            ></el-table-column> -->
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            small
            layout="total, prev, pager, next"
            :total="pageTotal"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
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
  props: ["isSelectRole", "row"],
  setup(props, context) {
    console.log("props", props);
    const { proxy } = useCurrentInstance(); // 拿全局api
    const parent = { ...context }; // 解构
    const { isSelectRole, row } = toRefs(props); // 解构
    // https://github.com/element-plus/element-plus/issues/2775
    const state = reactive({
      allTree: [], // 权限树
      isSelectRole: isSelectRole.value,
      defaultProps: {
        label: "name",
        children: "children",
      },
      checkedNode: [], // 选中的tree节点
      tableData: [],
      searchStr: "", // 搜索内容
      currentPage: 1, // 当前页index
      row,
    });
    // GetAuthRoles
    const getRoles = () => {
      proxy.$authApi.getRoles().then((res: any) => {
        console.log("getRoles", res);
        state.tableData = res.data;
      });
    };
    const closeDialog = () => {
      // EventBus
      parent.emit("update:isSelectRole", false);
    };
    const handleTableCurrentChange = (newRow: any) => {
      console.log("handleTableCurrentChange", newRow);
    };
    const handleCurrentChange = (val: number) => {
      console.log("分页");
    };
    // submit
    const saveDialog = () => {
      console.log("保存");
    };
    onMounted(() => {
      getRoles();
      console.log("onMounted");
    });
    return {
      ...toRefs(state),
      closeDialog,
      saveDialog,
      handleCurrentChange,
      handleTableCurrentChange,
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
