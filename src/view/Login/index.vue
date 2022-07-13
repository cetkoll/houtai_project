<template>
  <div>
    <div class="login">
      <el-card class="box-card">
        <h2>后台管理系统</h2>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              prefix-icon="el-icon-s-custom"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              prefix-icon="el-icon-lock"
              @keyup.enter.native="login"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="clean">重置</el-button>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度应在3到8位之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度应在3到8位之间', trigger: 'blur' }
        ]
      },
      list: {} // 给用户提示错误信息
    }
  },
  methods: {
    clean () {
      this.$refs.ruleForm.resetFields()
    },
    login () {
      this.$refs.ruleForm.validate(async value => {
        if (value) {
          try {
            const res = await login(this.ruleForm)
            this.list = res.data.meta
            if (this.list.msg === '用户名不存在') {
              this.$message.error('用户名不存在')
            } else if (this.list.msg === '密码错误') {
              this.$message.error('密码错误')
            } else {
              this.$message({
                message: '登陆成功',
                type: 'success'
              })
              this.$store.commit('setToken', res.data.data.token)
              this.$router.push('/user')
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          this.$message.error('请输入正确的格式')
        }
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #5c719f;
  .box-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    h2 {
      text-align: center;
    }
    .demo-ruleForm {
      margin-top: 30px;
    }
  }
}
</style>
