<template>
  <div>
    <Breadcrumb :pathList="$route.matched"></Breadcrumb>
    <el-card>
      <el-input
        placeholder="请输入内容"
        v-model="inputValue"
        class="input-with-select"
        style="width: 700px; margin-bottom: 20px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table border stripe :data="orderList">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
          <template v-slot="scope">
            <el-tag
              :type="scope.row.order_pay === '0' ? 'danger' : 'success'"
              effect="dark"
              >{{ scope.row.order_pay === "0" ? "未支付" : "已支付" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template v-slot="scope">
            {{ scope.row.create_time | formdate }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button @click="address" type="primary" size="mini"
              ><i class="el-icon-edit"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改收货地址" :visible.sync="dialogVisible" width="30%">
        <el-cascader
          v-model="value"
          :options="cityOptions"
          :props="{ expandTrigger: 'hover', emitPath: false }"
          @change="handleChange"
        ></el-cascader>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getOrders } from '@/api/orders'
import dayjs from 'dayjs'
import cityOptions from '@/provinces-china-master/city_data2017_element'
export default {
  created () {
    this.getOrders()
  },
  data () {
    return {
      value: '',
      dialogVisible: false,
      inputValue: '',
      orderList: [],
      params: {
        pagenum: 1,
        pagesize: 10
      },
      cityOptions: cityOptions
    }
  },
  methods: {
    async getOrders () {
      try {
        const res = await getOrders(this.params)
        this.orderList = res.data.data.goods
        console.log(this.orderList)
      } catch (error) {
        console.log(error)
      }
    },
    address () {
      this.dialogVisible = true
    },
    handleChange (value) {
      this.value = value.join('/')
    }
  },
  computed: {},
  watch: {},
  filters: {
    formdate (value) {
      return dayjs.unix(value).format('YYYY-MM-DD')
    }
  },
  components: { Breadcrumb }
}
</script>

<style scoped>
</style>
