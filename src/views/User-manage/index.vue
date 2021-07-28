<template>
  <div class="role-manage-con">
    <common-page-header :title="title" :showSearchHandle="true">
      <div class="headerBtnWrap">
        <el-button class="el-icon-plus" type="text" plain @click="handleCreate">
          新增角色
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
      </vtable>
    </div>
  </div>
</template>

<script lang="ts">
import commonPageHeader from "@/components/common/CommonPageHeader.vue";
import vtable from "@/components/common/TablePage.vue";
import { defineComponent, ref, reactive, toRefs } from "vue";
export default defineComponent({
  components: {
    commonPageHeader,
    vtable,
  },
  setup() {
    const title = ref("用户管理");
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
    });
    const handleCreate = () => {
      console.log("新增");
    };
    /** 页数 */
    const handleCurrentChange = (val: number) => {
      state.page.PageIndex = val;
      //   this.getRoles();
    };
    return {
      ...toRefs(state),
      title,
      handleCreate,
      handleCurrentChange,
    };
  },
});
</script>

<style>
.headerBtnWrap:before {
  content: "";
  display: block;
  width: 1px;
  height: 24px;
  background-color: rgba(200, 200, 200, 1);
  background-color: rgba(var(--palette-neutral-20, 200, 200, 200), 1);
  position: absolute;
  left: -10px;
  top: 20px;
}
</style>
