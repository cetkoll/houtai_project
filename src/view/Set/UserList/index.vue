<template>
  <div>
    <Breadcrumb :pathList="$route.matched"></Breadcrumb>
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="expand" label="#">
          <template slot-scope="{ row }">
            <div
              class="open"
              v-for="(item, index) in row.children"
              :key="index"
            >
              <div class="left">
                <el-tag>{{ item.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </div>
              <div class="both">
                <div
                  class="middle"
                  v-for="(item1, index1) in item.children"
                  :key="index1"
                >
                  <el-tag type="success">{{ item1.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                  <div class="right">
                    <el-tag
                      closable
                      :disable-transitions="false"
                      v-for="(item2, index2) in item1.children"
                      :key="index2"
                      @close="delSet(index2, item1.children, row.id, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index" :index="index">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini"
              ><i class="el-icon-edit"></i>编辑</el-button
            >
            <el-button size="mini" type="danger"
              ><i class="el-icon-delete"></i>删除</el-button
            >
            <el-button size="mini" type="warning" @click="setTree(row)"
              ><i class="el-icon-setting"></i>分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="delVisible" width="25%">
        <div class="digtitle">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除该用户，是否继续</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            @click="
              delVisible = false;
              $message('取消删除');
            "
            >取 消</el-button
          >
          <el-button type="primary" @click="delSure">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogVisible"
        width="50%"
        @close="defaultList = []"
      >
        <!-- 树形结构 -->
        <el-tree
          :data="treeData"
          ref="tree"
          show-checkbox
          @check-change="show"
          label="authName"
          node-key="id"
          :props="defaultProps"
          default-expand-all
          check-on-click-node
          :default-checked-keys="defaultList"
        >
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="lastTree">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getRoles, delUserSet, getTree, setTree } from '@/api/set'
export default {
  created () {
    this.getRoles()
  },
  data () {
    return {
      setTreeList: [], //! 设置后的树选项对应id
      treeData: [], //! 树的数据
      dialogVisible: false,
      tagItem: {}, //! 删除标签时的当前标签数组
      tagIndex: 0, //! 删除标签时当前标签的索引
      delVisible: false,
      tableData: [], //! 表格数据
      roleId: '', //! 当前项的用户id
      rightId: '', //! 当前用户的权限id
      defaultProps: { //! 渲染树的配置
        label: 'authName'
      },
      defaultList: [] //! 默认选中树中的选项
    }
  },
  methods: {
    //! 表格索引值
    index (index) {
      return ++index
    },
    //! 获取表格的数据
    async getRoles () {
      try {
        const res = await getRoles()
        this.tableData = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    //! 点击删除标签时
    delSet (tag, item, role, right) {
      this.delVisible = true
      this.tagIndex = tag
      this.tagItem = item
      this.roleId = role
      this.rightId = right
    },
    //! 确定删除标签
    async delSure () {
      this.delVisible = false
      try {
        await delUserSet({ roleId: this.roleId, rightId: this.rightId })
        this.tagItem.splice(this.tagIndex, 1)
        this.$message.success('删除权限成功')
      } catch (error) {
        this.$message.error('删除权限失败')
      }
    },
    //! 获取树的数据
    async setTree (row) {
      this.roleId = row.id
      this.getDefault(row.children)
      try {
        const res = await getTree('tree')
        this.treeData = res.data.data
      } catch (error) {
        console.log(error)
      }
      this.dialogVisible = true
    },
    //! 树中默认选中的项
    getDefault (item) {
      item.forEach(item1 => {
        if (item1.children) {
          this.getDefault(item1.children)
        } else {
          this.defaultList.push(item1.id)
        }
      })
    },
    //! 选中或者取消选项时
    show () {
      this.setTreeList = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
    },
    //! 确定树中的操作时
    async lastTree () {
      const rids = this.setTreeList.join(',')
      try {
        await setTree({ roleId: this.roleId, rids })
        this.$message.success('设置成功')
      } catch (error) {
        this.$message.error('设置失败')
      }
      this.getRoles()
      this.dialogVisible = false
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: { Breadcrumb }
}
</script>

<style scoped lang="less">
.digtitle {
  display: flex;
  align-items: center;
  .el-icon-warning {
    margin-right: 10px;
    color: #e6a23c;
    font-size: 24px;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-row {
  padding: 0 70px;
}
.el-tag {
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
  margin-right: 15px;
  margin-bottom: 10px;
}
.el-icon-caret-right {
  margin-left: -10px;
}
.open {
  width: 100%;
  margin: 0 60px 0 60px;
  display: flex;
  padding-top: 10px;
  align-items: center;
  flex-wrap: no-wrap;
  border-bottom: 1px solid #c9d7eb;
  .left {
    flex: 3;
  }
  .both {
    flex: 7;
    .middle {
      display: flex;
      padding-top: 10px;
      align-items: center;
      flex-wrap: no-wrap;
      border-bottom: 1px solid #c9d7eb;
      .right {
        margin-left: 150px;
      }
      .el-icon-caret-right {
        margin-top: -7px;
      }
    }
    .middle:last-child {
      border-bottom: 0;
    }
  }
}
.el-table {
  margin-top: 15px;
}
</style>
