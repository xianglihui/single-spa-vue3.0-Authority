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
          <el-button @click="updateRole(scope)" type="primary" size="mini">
            编辑
          </el-button>
          <el-button @click="readRole(scope.row)" type="primary" size="mini">
            查看用户
          </el-button>
        </template>
      </vtable>
    </div>
    <!-- v-model配合update:isEditDialog使用 -->
    <editRolePermisson
      v-if="isEditDialog"
      v-model:isEditDialog="isEditDialog"
      :row="clickRow"
    ></editRolePermisson>
  </div>
  <!-- dialog -->
</template>

<script lang="ts">
import commonPageHeader from "@/components/common/CommonPageHeader.vue";
import vtable from "@/components/common/TablePage.vue";
import editRolePermisson from "@/components/User-manage/addRole-dialog.vue";
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
      isEditDialog: false,
    });
    const handleCreate = () => {
      console.log("新增");
    };
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
    // 编辑权限
    const addRole = (scope: Obj) => {
      console.log("编辑权限", scope);
      state.clickRow = scope;
      console.log("state.clickRow", state.clickRow);
      state.isEditDialog = true;
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
      handleCurrentChange,
    };
  },
});
</script>

<style></style>
