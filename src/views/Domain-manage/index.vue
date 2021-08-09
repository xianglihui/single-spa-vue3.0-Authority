<template>
  <div>
    <common-page-header :title="title" :showSearchHandle="true">
      <div class="headerBtnWrap">
        <el-button class="el-icon-plus" type="text" plain @click="handleCreate">
          创建用户
        </el-button>
      </div>
    </common-page-header>
    <div class="pageContent">
      <vtable
        ref="vtable"
        :page="page"
        @page="handleCurrentChange"
        :data="tableData"
        :column="column"
        :headerStyle="{ background: '#fff' }"
      >
        <template #operate="scope">
          <el-button @click="deleteUser(scope.row)" type="danger" size="mini">
            删除
          </el-button>
          <el-button @click="addRoles(scope.row)" type="primary" size="mini">
            设置角色
          </el-button>
        </template>
      </vtable>
    </div>
    <!-- dialog -->
  </div>
</template>

<script lang="ts">
interface Obj {
  [key: string]: string | number;
}
import commonPageHeader from "@/components/common/CommonPageHeader.vue";
import vtable from "@/components/common/TablePage.vue";
import { useCurrentInstance } from "@/utils/toolset";
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
export default defineComponent({
  components: {
    commonPageHeader,
    vtable,
  },
  setup() {
    const title = ref("域账号管理");
    const { proxy } = useCurrentInstance(); // 拿全局api
    const state = reactive({
      page: {
        PageIndex: 1,
        PageSize: 20,
        PageTotal: 0,
      },
      tableData: [],
      clickRow: {},
      column: [
        {
          label: "姓名",
          prop: "name",
          align: "left",
        },
        {
          label: "用户名",
          prop: "currentUnitName",
          align: "left",
        },
        {
          label: "业务部门",
          prop: "currentUnitName",
          align: "left",
        },
        {
          label: "操作",
          slot: "operate",
          width: "400",
        },
      ],
    });
    // 获取域账号列表
    const getDomainList = () => {
      proxy.$authApi.getSSOUser().then((res: any) => {
        console.log("获取域账号列表", res);
        state.tableData = res.data;
        // mock环境 就取数组长度
        state.page.PageTotal = res.data.length;
      });
    };
    const handleCreate = () => {
      console.log("创建用户");
    };
    const handleCurrentChange = () => {
      console.log("分页");
    };
    onMounted(() => {
      console.log("onMounted is start");
      getDomainList();
    });
    return {
      ...toRefs(state),
      handleCreate,
      handleCurrentChange,
      title,
    };
  },
});
</script>

<style scoped></style>
