<template>
  <el-container class="main">
    <el-header>
      <h3>浙江XX后台管理系统</h3>
      <el-popover placement="top" width="320" v-model="visible">
        <h3>是否确认退出</h3>
        <div style="text-align: right; margin: 0">
          <el-button size="small" type="text" @click="visible = false"
            >取消
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="(visible = false), $router.push('/login')"
          >
            确定</el-button
          >
        </div>
        <el-button slot="reference">退出</el-button>
      </el-popover>
    </el-header>
    <el-container>
      <el-aside :width="flag ? '200px' : '64px'">
        <el-button plain class="btn" @click="change">{{
          flag ? "折叠" : "展开"
        }}</el-button>
        <el-menu
          :collapse="!flag"
          :collapse-transition="false"
          :unique-opened="true"
          background-color="#050322"
          active-text-color="red"
          router
          :default-active="this.$route.path"
        >
          <el-submenu :index="item.id + ''" v-for="item in list" :key="item.id">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">{{ item.authName }}</span>
            </template>
            <el-menu-item
              v-for="(item1, index1) in item.children"
              :key="index1"
              :index="'/' + item1.path"
            >
              <i class="el-icon-menu"></i>
              {{ item1.authName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenu } from '@/api/user'
export default {
  async created () {
    try {
      const res = await getMenu()
      this.list = res.data.data
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      flag: true,
      visible: false,
      list: []
    }
  },
  methods: {
    change () {
      this.flag = !this.flag
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  height: 100vh;
  .el-header {
    background-color: #050322;
    color: #dfdfdf;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      line-height: 60px;
      font-size: 26px;
      margin-left: 30px;
      font-weight: 400;
    }
    & > .el-button {
      width: 70px;
      height: 40px;
      color: #666;
    }
  }
  .el-aside {
    background-color: rgb(5, 3, 34);
    .close {
      width: 64px;
    }
    .btn {
      width: 100%;
      background-color: rgb(249, 99, 99);
    }
    .el-menu {
      width: 100%;
      color: #fff;
      /deep/.el-submenu__title {
        color: #fff !important;
      }
      .el-menu-item {
        color: #fff;
      }
    }
  }
}
.el-main{
  background-color:#eaedf1;
  padding-left:20px;
  padding-right:20px;
}
.el-submenu {
  width: 200px;
}
</style>
