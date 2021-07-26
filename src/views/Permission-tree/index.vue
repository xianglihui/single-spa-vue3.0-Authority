<template>
  <div>
    <!-- header -->
    <common-page-header :title="title" :showSearchHandle="true">
      <!-- <div class="headerBtnWrap">
          <el-button class="el-icon-upload" size="mini">
            导入权限文件
          </el-button>
      </div> -->
    </common-page-header>
    <!-- main -->
    <div class="auth-tree-con">
      <div class="auth-tree">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          size="mini"
          clearable
        ></el-input>
        <div class="tree-control">
          <el-button
            @click="collapseAll"
            type="text"
            size="mini"
            icon="el-icon-arrow-up"
            >折叠</el-button
          >
          <el-button
            @click="unFoldAll"
            type="text"
            size="mini"
            icon="el-icon-arrow-down"
            >展开</el-button
          >
        </div>
        <el-tree
          class="tree"
          :data="treeData"
          :props="defaultProps"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          highlight-current
          node-key="id"
          ref="tree"
        ></el-tree>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref, onMounted } from "vue";
import commonPageHeader from "@/components/common/CommonPageHeader.vue";
import { useCurrentInstance } from "@/utils/toolset";
export default {
  components: {
    commonPageHeader,
  },
  setup() {
    const state = reactive({
      title: "权限管理",
      treeData: [], //权限树
      form: {
        name: "",
        code: "",
        icon: "",
        url: "",
        featureType: 0,
        orderIndex: 0,
        namePinyin: "",
        isCollapse: false,
        isShowYS: false,
        id: "",
      },
      test:[{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
      defaultProps: {
        children: "children",
        label: "name",
      },
      currentNode: "", // 当前点击的node
      level4: [], // 第四级 按钮级权限
      operationType: "", // 操作类型 create edit
      deleteAble: false, // 是否可删除
      createAble: false, // 是否可删除
    });
    const { proxy } = useCurrentInstance(); // 拿全局api
    const filterText = ref(""); // 过滤关键词
    console.log("proxy", proxy.$authApi);
    // 全部折叠
    const collapseAll = () => {
      console.log("全部折叠");
    };
    // 全部展开
    const unFoldAll = () => {
      console.log("全部展开");
    };
    const resetForm = (formName: any) => {
        // $refs[formName].resetFields();
        console.log('formName')
    };
    // 获取权限树
    const getAuthTree = () => {
      // console.log("------", proxy.$authApi.getAuthTree() instanceof Promise);
      proxy.$authApi
        .getAuthTree()
        .then((res: any) => {
          console.log("res", res);
          state.treeData = res.data.result;
        })
        .finally(() => {
          state.operationType = "";
          console.log("finally");
          resetForm("form");
        });
    };
    const filterNode = (value: any, data: any) => {
      if (!value) {
        return true;
      }
      return data.name.indexOf(value) !== -1;
    };
    const handleNodeClick = (data: any, node: any) => {
      state.level4 = [];
      if (node.level === 3) {
        for (const i of node.childNodes) {
          (state.level4 as any).push({ key: i.key, label: i.label });
        }
      }
      state.currentNode = data;
      state.operationType = "edit";
      state.form = { ...data };
      state.deleteAble = true;
      state.createAble = true;
    };
    onMounted(() => {
      getAuthTree();
    });
    return {
      ...toRefs(state),
      filterText,
      collapseAll,
      unFoldAll,
      filterNode,
      handleNodeClick
    };
  },
};
</script>

<style lang="less" scoped>
.auth-tree-con {
  display: flex;
  justify-content: flex-start;
  padding: 5px;

  .auth-tree {
    display: inline-block;
    width: 280px;

    // background-color: #e4e4e4 !important;
    .tree-control {
      display: flex;
      justify-content: flex-end;
    }

    .tree {
      overflow-y: scroll;
    }
  }

  .middle {
    // width: calc(100% - 210px);
    width: 520px;
    margin: 0 0 0 10px;

    .edit {
      color: #e6a23c;
    }

    .create {
      color: #67c23a;
    }

    .hint {
      display: inline-block;
      margin: 20px 0 0 40px;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
    }

    .form {
      width: 500px;
      margin: 10px;
    }
  }

  .right {
    margin: 0 0 0 10px;

    .right-item {
      margin: 10px 0;
      color: #4c4c4c;
    }
  }
}
</style>
