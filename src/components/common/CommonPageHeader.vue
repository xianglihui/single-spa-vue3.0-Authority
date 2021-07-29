<template>
  <div class="commonPageHeader">
    <div class="common-content-header">
      <div class="title">{{ title }}</div>
      <slot></slot>
      <span
        class="iconfont icon-shaixuan"
        v-if="showSearchHandle"
        :title="toggleSearch ? '隐藏筛选框' : '显示筛选框'"
        @click="toggeleSearchFn"
      ></span>
    </div>
    <div class="content-search" v-if="toggleSearch">
      <slot name="search"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    showSearchHandle: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // console.log("props", props);
    const toggleSearch = ref(true);
    const datas = ref(props.title);
    const toggeleSearchFn = () => {
      toggleSearch.value = !toggleSearch.value;
    };
    return {
      toggleSearch,
      datas,
      toggeleSearchFn,
    };
  },
});
</script>
<style>
.commonPageHeader {
  margin: 0 10px;
  font-size: 18px;
}
.common-content-header {
  border-bottom: 1px solid #eee;
  height: 60px;
  line-height: 60px;
}
.commonPageHeader .title {
  font-weight: bold;
  color: #666;
  float: left;
  max-width: 60%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.BtnWrap {
  float: left;
  margin-left: 10px;
}
.BtnWrap:before {
  content: "";
  display: block;
  float: left;
  height: 20px;
  width: 1px;
  margin: 20px 10px;
  background-color: #999;
}
.BtnWrap .el-button {
  border: none;
}
.commonPageHeader .headerBtnWrap {
  position: relative;
  float: left;
  margin-left: 30px;
}
.commonPageHeader .headerBtnWrap:before {
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
.commonPageHeader .icon-shaixuan {
  float: right;
  margin-right: 15px;
  cursor: pointer;
  font-size: 18px;
  color: rgba(0, 120, 212, 1);
}
.commonPageHeader .el-button {
  border: none;
}
.commonPageHeader .el-button:before {
  font-size: 15px;
  margin-right: 5px;
}
</style>
