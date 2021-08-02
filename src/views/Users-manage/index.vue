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
    <!-- dialog -->
    <!-- 修改用户密码 -->
    <userChangePassword
      v-if="isChangePassword"
      v-model:isChangePassword="isChangePassword"
      :row="clickRow"
    ></userChangePassword>
    <!-- 编辑/新增用户 -->
    <updateUserInfo
      v-if="isUpdateDialog"
      v-model:isUpdateDialog="isUpdateDialog"
      :dialogType="operationType"
      :row="clickRow"
      @update:flush="getUsers"
    ></updateUserInfo>
    <!-- 设置角色 -->
    <setRoles v-if="isAddRoles" v-model:isAddRoles="isAddRoles" :row="clickRow">
    </setRoles>
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
import { ElMessage } from "element-plus";
import userChangePassword from "@/components/Users-manage/changePassword-dialog.vue";
import updateUserInfo from "@/components/Users-manage/updateUser-dialg.vue";
import setRoles from "@/components/Users-manage/setRoles-dialog.vue";
export default defineComponent({
  components: {
    commonPageHeader,
    vtable,
    userChangePassword,
    updateUserInfo,
    setRoles,
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
      clickRow: {},
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
      isChangePassword: false, // 修改密码 dialog
      isUpdateDialog: false, // 用户信息dialog开关
      isAddRoles: false,
      operationType: "", // 角色操作类型 create edit
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
    const changePassword = (scope: Obj) => {
      state.clickRow = scope;
      state.isChangePassword = true;
    };
    // 修改(编辑）用户信息
    const updateUser = (scope: Obj) => {
      console.log("修改用户信息");
      state.clickRow = scope;
      state.operationType = "edit";
      state.isUpdateDialog = true;
    };
    /**
     * 设置角色，业务逻辑如下
     * 1、用户与角色是一对多的关系，一个用户可以设置多个角色
     * 2、角色通过角色管理创建/获取
     * 3、最终通过给权限树下某个页面/功能赋予角色
     * 代码逻辑如下
     * 1、用户的角色以tag显示，可删/增
     * 2、添加角色可筛选列表显示
     */
    const addRoles = (scope: Obj) => {
      console.log("设置角色");
      state.clickRow = scope;
      state.isAddRoles = true;
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
