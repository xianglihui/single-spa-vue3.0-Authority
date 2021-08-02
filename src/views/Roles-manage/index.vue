<template>
  <div class="role-manage-con">
    <common-page-header :title="title" :showSearchHandle="true">
      <div class="headerBtnWrap">
        <el-button class="el-icon-plus" type="text" plain @click="handleCreate">
          创建角色
        </el-button>
      </div>
      <template v-slot:search>
        <div class="content-header">
          <el-form
            :model="form"
            :inline="true"
            class="searchFrom"
            ref="searchForm"
          >
            <div class="search-input-box">
              <el-form-item label prop="name" class="item-keyword">
                <el-input
                  v-model="form.name"
                  @keyup.enter="getRoles({ PageIndex: 1 })"
                  placeholder="请输角色名称"
                  clearable
                  size="mini"
                ></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </template>
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
          <el-button @click="deleteRole(scope.row)" type="danger" size="mini">
            删除
          </el-button>
          <el-button @click="addRole(scope.row)" type="primary" size="mini">
            设置权限
          </el-button>
          <el-button @click="updateRole(scope.row)" type="primary" size="mini">
            编辑
          </el-button>
          <el-button @click="readUsers(scope.row)" type="primary" size="mini">
            查看用户
          </el-button>
        </template>
      </vtable>
    </div>
    <!-- v-model配合update:isEditDialog使用 -->
    <!-- 编辑角色权限 -->
    <editRolePermisson
      v-if="isEditDialog"
      v-model:isEditDialog="isEditDialog"
      :row="clickRow"
    />
    <!-- 编辑/新增角色 -->
    <updateRoleInfo
      v-if="isUpdateDialog"
      v-model:isUpdateDialog="isUpdateDialog"
      :dialogType="operationType"
      :row="clickRow"
      @update:flush="getRoles"
    />
    <!-- 查看用户 -->
    <readUsers
      v-if="isReadUsers"
      v-model:isReadUsers="isReadUsers"
      :row="clickRow"
    ></readUsers>
  </div>
</template>

<script lang="ts">
import commonPageHeader from "@/components/common/CommonPageHeader.vue";
import vtable from "@/components/common/TablePage.vue";
import editRolePermisson from "@/components/Roles-manage/addRole-dialog.vue";
import updateRoleInfo from "@/components/Roles-manage/updateRole-dialog.vue";
import readUsers from "@/components/Roles-manage/readUser-dialog.vue";
import { useCurrentInstance } from "@/utils/toolset";
import { ElMessage } from "element-plus";
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
interface Obj {
  [key: string]: string | number;
}
export default defineComponent({
  components: {
    commonPageHeader,
    vtable,
    editRolePermisson,
    updateRoleInfo,
    readUsers,
  },
  setup() {
    const title = ref("角色");
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
          label: "角色类型",
          prop: "name",
          align: "left",
        },
        {
          label: "描述",
          prop: "description",
          align: "left",
        },
        {
          label: "操作",
          slot: "operate",
          width: "360",
        },
      ],
      form: {
        name: "",
        skipCount: 0,
        maxResultCount: 20,
      },
      clickRow: {},
      isEditDialog: false, // 编辑权限dialog开关
      isUpdateDialog: false, //角色信息dialog开关
      isReadUsers: false, //查看用户dialog开关
      operationType: "", // /角色操作类型 create edit
    });

    /** 页数 */
    const handleCurrentChange = (val: number) => {
      state.page.PageIndex = val;
      //   this.getRoles();
    };
    // 获取角色列表
    const getRoles = () => {
      proxy.$authApi.getRoles().then((res: any) => {
        console.log("获取角色列表", res);
        state.tableData = res.data;
        state.page.PageTotal = res.data.length;
      });
    };
    // 删除角色
    const deleteRole = (row: Obj) => {
      const id = row.id;
      console.log("id", id);
      proxy.$authApi.deleteRoles(id).then((res: any) => {
        console.log("删除角色", res);
        ElMessage.success({
          message: "删除成功！",
          type: "success",
        });
        getRoles();
        // state.tableData = res.data;
      });
    };
    /**
     * 新增权限
     * 由于mock的局限性 接口写的比较乱 基本逻辑如下：
     * 管理员进入页面，编辑某个角色，能拿到数据1、完整的权限树，2、角色拥有的权限树（用于tree回显数据），3、用户拥有的权限，以上为get操作
     * 通过点击权限树能拿到当前树数据，保存后更新index页面，属于patch操作
     * 业务逻辑如下：
     * 角色可以设置多个权限，用于用户管理的配置，属于一对多的关系，属于一个角色可以分配给N个用户
     */
    const addRole = (scope: Obj) => {
      state.clickRow = scope;
      state.isEditDialog = true;
    };
    /**
     * 编辑角色（更新用户信息）
     */
    const updateRole = (scope: Obj) => {
      state.clickRow = scope;
      state.operationType = "edit";
      state.isUpdateDialog = true;
    };
    /**
     * 新增角色
     */
    const handleCreate = () => {
      state.operationType = "create";
      state.isUpdateDialog = true;
    };
    // 查看角色用户
    const readUsers = (scope: Obj) => {
      state.clickRow = scope;
      state.isReadUsers = true;
    };
    onMounted(() => {
      getRoles();
    });
    return {
      ...toRefs(state),
      title,
      handleCreate,
      deleteRole,
      addRole,
      updateRole,
      handleCurrentChange,
      getRoles,
      readUsers,
    };
  },
});
</script>

<style></style>
