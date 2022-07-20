<template>
  <div>
    <Breadcrumb :pathList="$route.matched"></Breadcrumb>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" :index="index" label="#">
        </el-table-column>
        <el-table-column prop="authName" label="姓名"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column label="权限等级">
          <template v-slot="{ row }">
            <el-tag v-if="row.level === '0'">等级一</el-tag>
            <el-tag v-else-if="row.level === '1'" type="success">等级二</el-tag>
            <el-tag v-else type="warning">等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getTree } from '@/api/set'
export default {
  created () {
    this.getTree()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    index (index) {
      return ++index
    },
    async getTree () {
      try {
        const res = await getTree('list')
        this.tableData = res.data.data
        console.log(res)
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

<style scoped>
</style>
