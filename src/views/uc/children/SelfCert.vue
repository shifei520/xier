<template>
  <div class="self-cert">
    <div class="page-title">我的证书</div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="培训班名称" width="500"> </el-table-column>
      <el-table-column prop="name" label="状态"> </el-table-column>
      <el-table-column prop="address" label="操作"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SelfCert',
  data() {
    return {
      //测试数据
      tableData: [],
    }
  },
}
</script>

<style lang="less" scoped>
.self-cert {
  .page-title {
    margin: 20px 0;
    font-size: 28px;
  }
}
/deep/ .el-table__body-wrapper {
  height: 250px;
}
</style>