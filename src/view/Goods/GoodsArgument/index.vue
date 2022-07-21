<template>
  <div>
    <Breadcrumb :pathList="$route.matched"></Breadcrumb>
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        :closable="false"
        type="warning"
        show-icon
        style="margin-bottom: 20px"
      >
      </el-alert>
      选择商品分类:
      <el-cascader
        v-model="value"
        :options="categoriesList"
        :props="{
          expandTrigger: 'hover',
          label: 'cat_name',
          value: 'cat_id',
        }"
        @change="handleChange"
        style="margin-bottom: 20px"
      ></el-cascader>
      <el-tabs v-model="activeName" @click.native="tableChange">
        <el-tab-pane label="动态参数" name="first"
          ><TableList
            v-if="activeName === 'first'"
            :activeName="activeName"
            :cateList="cateList"
            :attrId="attrId"
            @changeTable="getlist"
          ></TableList
        ></el-tab-pane>
        <el-tab-pane label="静态参数" name="second"
          ><TableList
            v-if="activeName === 'second'"
            :activeName="activeName"
            :cateList="cateListjing"
            :attrId="attrId"
            @changeTable="getlist"
          ></TableList
        ></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getCategories, cateList } from '@/api/goods'
import TableList from './components/TableList'
export default {
  created () {
    this.getCategories()
  },
  data () {
    return {
      value: [],
      categoriesList: [], // 选择器的数据
      activeName: 'first',
      cateList: [], // 表格的数据
      cateListjing: [],
      attrId: ''
    }
  },
  methods: {
    async getCategories () {
      try {
        const res = await getCategories()
        this.categoriesList = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async handleChange (value) {
      this.attrId = value[value.length - 1]
      this.getlist()
    },
    async getlist () {
      try {
        const res = await cateList(this.attrId, 'many')
        res.data.data.forEach(item => {
          if (item.attr_vals === '') {
            item.attr = []
          } else {
            item.attr = item.attr_vals.split(' ')
          }
        })
        this.cateList = res.data.data
        console.log(this.cateList)
        const res1 = await cateList(this.attrId, 'only')
        res1.data.data.forEach(item => {
          if (item.attr_vals === '') {
            item.attr = []
          } else {
            item.attr = item.attr_vals.split(' ')
          }
        })
        this.cateListjing = res1.data.data
      } catch (error) {
        console.log(error)
      }
    },
    tableChange () {
      if (this.attrId === '') {
        this.$message.error('请选择三级分类')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { Breadcrumb, TableList }
}
</script>

<style scoped>
</style>
