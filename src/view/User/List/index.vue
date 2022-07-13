<template>
  <div>
    <Breadcrumb :pathList="$route.matched"></Breadcrumb>
    <el-card class="box-card">
      <el-input placeholder="请输入内容" v-model="inputValue" clearable>
        <template slot="append"><i class="el-icon-search"></i></template>
      </el-input>
      <el-button type="primary" @click="addVisible = true">添加用户</el-button>

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
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="handleDelete(row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button @click="wheDelUser(row)" size="mini" type="danger"
              ><i class="el-icon-delete"></i
            ></el-button>
            <el-button @click="power(row)" size="mini" type="warning"
              ><i class="el-icon-setting"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      @close="close"
      title="编辑用户"
      :visible.sync="dialogVisible"
      width="960px"
    >
      <div>
        用户名称 &nbsp;
        <el-input :placeholder="userName" :disabled="true"> </el-input>
      </div>
      <el-form :model="userForm" :rules="rules" ref="userList">
        <el-form-item prop="email">
          <div class="userEmail">
            <p>邮箱&nbsp; &nbsp;</p>
            <el-input v-model="userForm.email" class="myemail"> </el-input>
          </div>
        </el-form-item>
        <el-form-item prop="mobile">
          &nbsp;&nbsp;&nbsp;手机号 &nbsp;
          <el-input v-model="userForm.mobile"> </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisible" width="25%">
      <div class="digtitle">
        <i class="el-icon-warning"></i>
        <span>此操作将永久删除该用户，是否继续</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="nodel">取 消</el-button>
        <el-button type="primary" @click="deluser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="powerVisible" width="30%">
      <p>
        当前的用户:<span>{{ userName }}</span>
      </p>
      <p>
        当前的角色:<span>{{ powerName }}</span>
      </p>
      <span>分配新角色：</span>
      <el-dropdown trigger="click">
        <el-input
          v-model="powerValue"
          class="power"
          :readonly="true"
          suffix-icon="el-icon-arrow-down el-icon--right"
          placeholder="请选择"
        >
        </el-input>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="powerClick(item)"
            v-for="item in powerLiset"
            :key="item.id"
            >{{ item.roleName }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <span slot="footer" class="dialog-footer">
        <el-button @click="powerVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePower">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户对话框"
      :visible.sync="addVisible"
      width="50%"
      @close="addClose"
    >
      <el-form :model="addUserForm" :rules="addRules" ref="addForm">
        <el-form-item prop="username" label="用户名" label-width="80px">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" label-width="80px">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" label-width="80px">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号" label-width="80px">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getTableList, changeStatus, updateUser, delUser, getPower, updatePower } from '@/api/user'
import { validatePhone, validateEmail } from '@/utils/validate.js'
export default {
  created () {
    this.getTableList()
  },
  data () {
    const validatePhoneFn = (rule, value, callback) => {
      if (validatePhone(value)) {
        callback()
      } else {
        callback(new Error('手机号码格式不正确'))
      }
    }
    const validateEmailFn = (rule, value, callback) => {
      if (validateEmail(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式不正确'))
      }
    }
    return {
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2-7个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2-7个字符之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { validator: validateEmailFn, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { validator: validatePhoneFn, trigger: 'blur' }
        ]
      },
      addVisible: false,
      powerId: '', // 角色id
      powerName: '', // 角色名称
      powerLiset: [], // 角色列表
      powerValue: '', // 用户的角色
      powerVisible: false, // 设置弹出层
      delVisible: false, // 删除弹出层
      userId: '', // 用户id
      userName: '', // 用户名称
      userForm: {
        email: '',
        mobile: ''
      },
      rules: {
        mobile: [{ validator: validatePhoneFn, trigger: 'blur' }],
        email: [{ validator: validateEmailFn, trigger: 'blur' }]
      },
      dialogVisible: false, // 编辑弹出层
      inputValue: '', // 搜索时的value值
      params: { // 获取用户列表需要传递的参数
        pagenum: 1,
        pagesize: 10
      },
      tableData: [] // 用户列表
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
    },
    //! 修改按钮
    handleDelete (row) {
      console.log(row)
      this.userForm.email = row.email
      this.userForm.mobile = row.mobile
      this.userName = row.username
      this.userId = row.id
      this.dialogVisible = true
    },
    //! 确定修改用户数据信息
    async sure () {
      try {
        this.dialogVisible = false
        await this.$refs.userList.validate()
        await updateUser(this.userId, this.userForm)
        this.$message.success('修改成功')
        this.getTableList()
      } catch (error) {
        this.$refs.userList.resetFields()
        this.$message.error('修改失败')
      }
    },
    //! 关闭时取消表单验证的效果
    close () {
      this.$refs.userList.resetFields()
      this.userName = ''
    },
    //! 点击删除按钮时
    wheDelUser (row) {
      this.delVisible = true
      this.userId = row.id
    },
    //! 取消删除用户
    nodel () {
      this.delVisible = false
      this.$message('已取消删除')
    },
    //! 确定删除用户
    async deluser () {
      try {
        await delUser(this.userId)
        this.getTableList()
      } catch (error) {
        this.$message.error('删除失败')
      }
      this.delVisible = false
      this.$message.success('删除成功')
    },
    //! 点击设置按钮 获取角色列表
    async power (row) {
      this.userName = row.username
      this.powerName = row.role_name
      this.userId = row.id
      try {
        const res = await getPower()
        this.powerLiset = res.data.data
      } catch (error) {
        console.log(error)
      }
      this.powerVisible = true
    },
    //! 点击下单菜单中的选项时
    powerClick (item) {
      this.powerValue = item.roleName
      this.powerId = item.id
    },
    //! 点击确定修改按钮
    async updatePower () {
      this.powerVisible = false
      try {
        const res = await updatePower({ id: this.userId, rid: this.powerId })
        console.log(res)
        if (res.data.meta.status === 400) {
          this.$message.error('分配失败')
        }
      } catch (error) {
        this.$message.error('分配失败')
      }
    },
    addClose () {
      this.$refs.addForm.resetFields()
    }
  },
  computed: {},
  watch: {
  },
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
.el-dialog {
  .el-input[data-v-09b32354] {
    width: 830px;
  }
}
.userEmail {
  display: flex;
  align-items: center;
  p {
    text-indent: 2em;
    height: 40px;
    line-height: 40px;
  }
}
.myemail {
  margin-bottom: 0;
}
.digtitle {
  display: flex;
  align-items: center;
  .el-icon-warning {
    margin-right: 10px;
    color: #e6a23c;
    font-size: 24px;
  }
}
.power {
  margin-top: 20px;
  width: 220px !important;
}
p {
  line-height: 30px;
}
</style>
