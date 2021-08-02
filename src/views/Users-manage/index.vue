<template>
  <div>
    <common-page-header :title="title" :showSearchHandle="true">
      <div class="headerBtnWrap">
        <el-button class="el-icon-plus" type="text" plain> 创建用户 </el-button>
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
        <template #isActive="scope">
          {{ scope.row.isActive ? "启用" : "禁用" }}
        </template>
        <template #operate="scope">
          <el-button
            @click="setUserActive(scope.row)"
            :type="scope.row.isActive ? 'warning' : 'primary'"
            size="mini"
          >
            {{ scope.row.isActive ? "禁用" : "启用" }}
          </el-button>
          <el-button @click="deleteUser(scope.row)" type="danger" size="mini">
            删除
          </el-button>
          <el-button
            @click="changePassword(scope.row)"
            type="primary"
            size="mini"
          >
            修改密码
          </el-button>
          <el-button @click="updateUser(scope.row)" type="primary" size="mini">
            编辑
          </el-button>
          <el-button @click="addRoles(scope.row)" type="primary" size="mini">
            设置角色
          </el-button>
        </template>
      </vtable>
    </div>
  </div>
</template>

<script lang="ts">
import commonPageHeader from "@/components/common/CommonPageHeader.vue";
import vtable from "@/components/common/TablePage.vue";
import { useCurrentInstance } from "@/utils/toolset";
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
export default defineComponent({
  components: {
    commonPageHeader,
    vtable,
  },
  setup() {
    const title = ref("用户管理");
    const { proxy } = useCurrentInstance(); // 拿全局api
    const state = reactive({
      page: {
        PageIndex: 1,
        PageSize: 20,
        PageTotal: 0,
      },
      tableData: [],
      column: [
        {
          label: "用户名",
          prop: "userName",
          align: "left",
        },
        {
          label: "姓名",
          prop: "name",
          align: "left",
        },
        {
          label: "所属角色",
          prop: "roleName",
          align: "left",
        },
        {
          label: "启用状态",
          slot: "isActive",
        },
        {
          label: "操作",
          slot: "operate",
          width: "400",
        },
      ],
    });
    /** 页数
     * mock 暂未做分页
     */
    const handleCurrentChange = (val: number) => {
      state.page.PageIndex = val;
      //   this.getRoles();
    };
    // 获取用户列表
    const getUsers = () => {
      proxy.$authApi.getUsers().then((res: any) => {
        console.log("获取用户列表", res);
        state.tableData = res.data;
        // mock 就取数组长度
        state.page.PageTotal = res.data.length;
      });
    };
    // 删除
    const deleteUser = (row: any) => {
      console.log("删除");
      proxy.$authApi.deleteUserById(row.id).then((res: any) => {
        ElMessage.success({
          message: "删除成功",
          type: "success",
        });
         getUsers();
      });
    };
    // 禁用/启用
    const setUserActive = (row: any) => {
      console.log("row", row);
      console.log("禁用");
      const params = {
        id: row.id,
        isActive: !row.isActive,
      };
      proxy.$authApi.setUserActiveById(params).then((res: any) => {
        ElMessage.success({
          message: "修改成功",
          type: "success",
        });
        getUsers();
      });
    };
    // 修改密码
    const changePassword = () => {
      console.log("修改密码");
    };
    // 修改用户信息
    const updateUser = () => {
      console.log("修改用户信息");
    };
    // 设置角色
    const addRoles = () => {
      console.log("设置角色");
    };
    onMounted(() => {
      getUsers();
    });
    return {
      ...toRefs(state),
      title,
      handleCurrentChange,
      getUsers,
      deleteUser,
      setUserActive,
      changePassword,
      updateUser,
      addRoles,
    };
  },
});
</script>

<style scoped></style>
