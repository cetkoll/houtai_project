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
          :collapse-transition="true"
          :unique-opened="true"
          background-color="#050322"
          active-text-color="red"
          default-active="1-1"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              用户列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              角色列表</el-menu-item
            >
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              权限列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              商品列表</el-menu-item
            >
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              分类参数</el-menu-item
            >
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              商品分类</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              订单列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              数据报表</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      flag: true,
      visible: false
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
.el-submenu {
  width: 200px;
}
</style>
