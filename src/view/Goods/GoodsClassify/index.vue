<template>
  <div>
    <Breadcrumb :pathList="$route.matched"></Breadcrumb>
    <el-card>
      <el-button type="primary" @click="addVisible = true">添加分类</el-button>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px; margin-top: 20px"
        row-key="cat_id"
        border
        :indent="20"
        :tree-props="{
          children: 'children',
        }"
      >
        <el-table-column prop="index" label="#" width="80px"></el-table-column>
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column prop="name" label="是否有效">
          <template v-slot="scope">
            <i v-if="!scope.row.cat_deleted" class="el-icon-success"></i>
            <i v-else class="el-icon-error"></i>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="排序">
          <template v-slot="scope">
            <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag v-else-if="scope.row.cat_level === 1" type="success"
              >二级</el-tag
            >
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button size="mini" type="primary"
            ><i class="el-icon-edit"></i> 编辑</el-button
          >
          <el-button size="mini" type="danger"
            ><i class="el-icon-delete"></i> 删除</el-button
          >
        </el-table-column>
      </el-table>
      <el-dialog
        title="添加商品分类"
        :visible.sync="addVisible"
        width="50%"
        @close="close"
      >
        <el-form :model="form" :rules="rules" label-width="100px" ref="myform">
          <el-form-item prop="name" label="分类名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <el-cascader
              ref="casc"
              v-model="value"
              :options="tableDataList"
              @change="handleChange"
              :props="{
                expandTrigger: 'hover',
                label: 'cat_name',
                value: 'cat_id',
              }"
            ></el-cascader
          ></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGoods">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getCategories, addCate } from '@/api/goods'
export default {
  created () {
    this.getCategories()
  },
  data () {
    return {
      value: '',
      addVisible: false,
      params: {
        pagenum: 1,
        pagesize: 4
      },
      tableData: [],
      tableDataList: [],
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2-7之间', trigger: 'blur' }
        ]
      },
      data: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      }
    }
  },
  methods: {
    async getCategories () {
      try {
        this.params.pagesize = 4
        const res = await getCategories(this.params)
        this.params.pagesize = null
        const res1 = await getCategories(this.params)
        this.tableDataList = res1.data.data
        this.tableData = res.data.data.result
        this.tableData.forEach((item, index) => {
          item.index = index + 1
        })
      } catch (error) {
        console.log(error)
      }
    },
    handleChange (value) {
      this.data.cat_pid = value[value.length - 1]
      this.data.cat_level = this.$refs.casc.getCheckedNodes()[0].level
      console.log(this.data.cat_level)
    },
    async addGoods () {
      this.addVisible = false
      try {
        this.data.cat_name = this.form.name
        await addCate(this.data)
        this.$message.success('创建成功')
        this.getCategories()
      } catch (error) {
        this.$message.error('创建失败')
      }
    },
    close () {
      this.$refs.myform.resetFields()
      this.value = ''
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { Breadcrumb }
}
</script>

<style scoped>
.el-icon-success {
  color: green;
}
</style>
