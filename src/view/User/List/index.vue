<template>
  <div>
    <Breadcrumb :pathList="$route.matched"></Breadcrumb>
    <el-card class="box-card">
      <el-input placeholder="请输入内容" v-model="inputValue" clearable>
        <template slot="append"><i class="el-icon-search"></i></template>
      </el-input>
      <el-button type="primary">添加用户</el-button>

      <el-table stripe :data="tableData" border style="width: 100%">
        <el-table-column type="index" :index="tableIndex" label="#" width="50">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="355">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="350">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" width="355">
        </el-table-column>
        <el-table-column label="状态" width="320">
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="changeStatue($event, row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            ><i class="el-icon-edit"></i
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)"
            ><i class="el-icon-delete"></i
          ></el-button>
          <el-button
            size="mini"
            type="warning"
            @click="handleDelete(scope.$index, scope.row)"
            ><i class="el-icon-setting"></i
          ></el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getTableList, changeStatus } from '@/api/user'
export default {
  created () {
    this.getTableList()
  },
  data () {
    return {
      value: false,
      inputValue: '',
      params: {
        pagenum: 1,
        pagesize: 10
      },
      tableData: []
    }
  },
  methods: {
    //! 自定义索引值
    tableIndex (index) {
      return ++index
    },
    //! 修改用户状态
    async changeStatue (data, row) {
      try {
        await changeStatus({ uId: row.id, type: !row.mg_state })
        this.$message({
          message: '修改状态成功',
          type: 'success'
        })
        this.getTableList()
      } catch (error) {
        console.log(error)
        this.$message.error('修改状态失败 请稍后再试')
      }
    },
    //! 获取用户列表
    async getTableList () {
      try {
        const res = await getTableList(this.params)
        this.tableData = res.data.data.users
        this.tableData.forEach(item => {
          item.status = item.mg_state ? 1 : 0
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { Breadcrumb }
}
</script>

<style scoped lang="less">
.el-input {
  width: 530px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.el-card {
  width: 1660px;
  height: 456px;
}
.cell {
  .el-button {
    text-align: center;
    padding: 0;
    height: 28px;
    width: 48px;
  }
}
</style>
