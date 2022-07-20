<template>
  <div>
    <Breadcrumb :pathList="$route.matched"></Breadcrumb>
    <el-card>
      <el-input
        @keyup.native.enter="onSearch"
        v-model="search"
        placeholder="请输入内容"
      >
        <el-button
          @click="onSearch"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button type="primary" @click="$router.push('/addGoods')"
        >添加商品</el-button
      >
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column
          type="index"
          :index="index"
          label="#"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="goods_name"
          label="商品名称"
        >
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="{ row }">
            {{ row.add_time | formdate }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" size="small"
              ><i class="el-icon-edit"></i>编辑</el-button
            >
            <el-button type="danger" size="small"
              ><i class="el-icon-delete"></i>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationSum"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getGoodsList } from '@/api/goods'
import dayjs from 'dayjs'
export default {
  created () {
    this.getGoodsList()
  },
  data () {
    return {
      paginationSum: 0,
      search: '',
      tableData: [],
      params: {
        query: '',
        pagenum: 1,
        pagesize: 5
      }
    }
  },
  methods: {
    index (index) {
      return ++index
    },
    async getGoodsList () {
      try {
        const res = await getGoodsList(this.params)
        this.paginationSum = res.data.data.total
        this.tableData = res.data.data.goods
      } catch (error) {
        console.log(error)
      }
    },
    onSearch () {
      this.params.query = this.search
      this.getGoodsList()
    },
    handleSizeChange (val) {
      this.params.pagesize = val
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      this.params.pagenum = val
      this.getGoodsList()
    }
  },
  computed: {},
  watch: {},
  filters: {
    formdate (value) {
      return dayjs.unix(value).format('YYYY-MM-DD')
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style scoped lang="less">
.el-input {
  width: 480px;
  margin-right: 30px;
}
i {
  margin-right: 5px;
}
.el-table {
  margin-top: 15px;
}
</style>
