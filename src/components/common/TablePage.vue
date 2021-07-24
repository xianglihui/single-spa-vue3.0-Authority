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
      size="mini"
      stripe
      style="width: 100%"
      highlight-current-row
      :header-cell-style="headerStyle"
      :cell-style="cellStyle"
      :row-style="rowStyle"
    >
      <el-table-column v-if="selection" type="selection" width="55"></el-table-column>

      <el-table-column v-if="expand" type="expand">
         <template #default="{ row, $index }">
            <slot
              name="expandTemp"
              :index="$index"
              :row="row"
            ></slot>
          </template>
      </el-table-column>

      <template v-for="(item,index) in column">

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
import { Component, Vue } from "vue-property-decorator";
import { Table } from "element-ui";

@Component({
  props: {
    data: {
      type: Array,
      required: true
    },
    selection: {
      type: Boolean
    },
    expand: {
      type: Boolean,
      default: false,
    },
    column: {
      type: Array,
      required: true
    },
    height: {
      type: String
    },
    page: {
      required: true,
      type: [Object, Boolean],
      default: () => {
        return {
          PageIndex: 20,
          PageTotal: 0,
          PageSize: 1
        };
      }
    },
    rowStyle: {
      type: [Function, Object],
      default: () => {
        return {};
      }
    },
    cellStyle: {
      type: [Function, Object],
      default: () => {
        return {};
      }
    },
    headerStyle: {
      type: [Function, Object],
      default: () => {
        return {
          backgroundColor: "rgb(221, 221, 221)",
          color: "black"
        };
      }
    },
    index: {
      type: Boolean,
      default: false
    },
    check: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    rowClick: {
      type: Function,
      default: () => {/* */}
    }
  },
  components: {}
})
export default class TablePage extends Vue {
  // @Prop({required: true}) readonly data: any[]
  // @Prop({required: true}) readonly column: object[]
  // @Prop() readonly selection: boolean
  // @Prop() readonly height: string
  // @Prop({required: true, default: { PageIndex: 20, PageTotal: 0,  PageSize: 1}}) readonly page: object | boolean
  // @Prop({default: {}}) readonly rowStyle: function | object
  // @Prop({default: {}}) readonly cellStyle: function | object
  // @Prop({default: { backgroundColor: "rgb(221, 221, 221)", color: "black"}}) readonly headerStyle: function | object
  // @Prop() readonly index: boolean
  // @Prop() readonly check: boolean
  // @Prop() readonly loading: boolean
  // @Prop() readonly rowClick: function

  public handleCurrentChange(val: number) {
    this.$emit("page", val);
  }

  public select(selection: object[], row: object) {
    this.$emit("select", selection, row);
  }

  public rowDblclick(row: object[], column: object, event: any) {
    this.$emit("rowDblclick", row, column, event);
  }

  public clear() {
    (this.$refs["vtable"] as Table).clearSelection();
  }

  public toggle() {
    (this.$refs["vtable"] as Table).toggleAllSelection();
  }

  public rowChange(selection: object[], row: object) {
    this.$emit("rowChange", selection, row);
  }

  public handleSelectionChange(selection: object[]) {
    this.$emit("handleSelectionChange", selection);
  }
}
</script>

<style scoped>
#table_page {
  /* height: 100%; */
}
/* #table_page .el-table {
        height: calc(100% - 50px);
    } */
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
