<template>
  <div id="table_page">
    <el-table
      ref="vtable"
      v-loading="loading"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @select="select"
      @select-all="select"
      @current-change="rowChange"
      @selection-change="handleSelectionChange"
      :data="data"
      stripe
      style="width: 100%"
      highlight-current-row
      :header-cell-style="headerStyle"
      :cell-style="cellStyle"
      :row-style="rowStyle"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
      ></el-table-column>

      <el-table-column v-if="expand" type="expand">
        <template #default="{ row, $index }">
          <slot name="expandTemp" :index="$index" :row="row"></slot>
        </template>
      </el-table-column>

      <template v-for="(item, index) in column">
        <el-table-column
          v-if="!item.slot"
          :key="index"
          :prop="item.prop"
          :width="item.width"
          :label="item.label"
          :show-overflow-tooltip="true"
          :align="item.align || 'center'"
          :fixed="item.fixed"
        >
        </el-table-column>

        <el-table-column
          v-if="item.slot"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          :fixed="item.fixed"
          :align="item.align || 'center'"
        >
          <template #default="{ row, $index }">
            <slot
              :name="item.slot"
              :index="$index"
              :row="row"
              :value="row[item.prop]"
              :prop="item.prop"
            ></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="page"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :current-page="page.PageIndex"
      :total="page.PageTotal"
      :page-size="page.PageSize"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
interface Page {
  PageIndex: number;
  PageSize: number;
  PageTotal: number;
}
interface Obj {
  [key: string]: any;
}
import { defineComponent, ref } from "vue";
import { ElTable } from "element-plus";
export default defineComponent({
  props: {
    data: {
      type: Array,
      required: true,
    },
    selection: {
      type: Boolean,
    },
    expand: {
      type: Boolean,
      default: false,
    },
    column: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
    },
    page: {
      required: true,
      type: [Object, Boolean],
      default: () => {
        return {
          PageIndex: 20,
          PageTotal: 0,
          PageSize: 1,
        };
      },
    },
    rowStyle: {
      type: [Function, Object],
      default: () => {
        return {};
      },
    },
    cellStyle: {
      type: [Function, Object],
      default: () => {
        return {};
      },
    },
    headerStyle: {
      type: [Function, Object],
      default: () => {
        return {
          backgroundColor: "rgb(221, 221, 221)",
          color: "black",
        };
      },
    },
    index: {
      type: Boolean,
      default: false,
    },
    check: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    rowClick: {
      type: Function,
      default: () => {
        /* */
      },
    },
  },
  emits: [
    "page",
    "select",
    "rowDblclick",
    "rowChange",
    "handleSelectionChange",
  ],
  setup(props, context) {
    const vtable = ref(null);
    const handleCurrentChange = (val: number) => {
      context.emit("page", val);
    };
    const select = (selection: Obj[], row: Obj) => {
      context.emit("select", selection, row);
    };
    const rowDblclick = (row: Obj[], column: Obj, event: any) => {
      context.emit("rowDblclick", row, column, event);
    };
    const toggle = () => {
      (vtable.value as typeof ElTable).toggleAllSelection();
    };
    const rowChange = (selection: Obj[], row: Obj) => {
      context.emit("rowChange", selection, row);
    };
    const handleSelectionChange = (selection: Obj[]) => {
      context.emit("handleSelectionChange", selection);
    };
    return {
      handleCurrentChange,
      select,
      rowDblclick,
      toggle,
      rowChange,
      handleSelectionChange,
    };
  },
});
</script>

<style scoped>
#table_page .el-table {
  position: relative;
  margin-bottom: 33px;
}

#table_page .el-pagination {
  float: right;
  position: fixed;
  bottom: 0;
  z-index: 10;
  right: 0;
  background: #fff;
  text-align: right;
  border-top: 1px solid #eee;
  width: 100%;
}
</style>
