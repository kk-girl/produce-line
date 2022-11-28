<template>
  <el-container class="home-container">
    <!-- 通过mode属性可以使导航菜单变更为水平模式 -->
    <el-header>
      <div class="home_header">
        <div>
          <img style="padding-left: 24px;" src="@/assets/imgs/logo.png" />
        </div>
        <div>
          <el-menu :default-active="activePath" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item class="elmenu1" index="1">数据服务</el-menu-item>
            <el-menu-item :index="'/algorithm'" @click="saveNavState('/algorithm')">算法管理</el-menu-item>
            <el-menu-item index="3">流程管理</el-menu-item>
            <el-menu-item :index="'/order'" @click="saveNavState('/order')">订单管理</el-menu-item>
            <el-menu-item index="5">生产监控</el-menu-item>
          </el-menu>
        </div>
        <div class="admin">
          <div>
            <p>黎林林</p>
          </div>
          <div>
            <el-button :class="'iconfont icon-a-1_6'" size="mini" id="jiantou"></el-button>
          </div>
          <div>
            <img src="@/assets/imgs/admin.png" class="adminimg" />
          </div>
        </div>
      </div>

      <hr class="mainhr" />

    </el-header>
    <el-main>
      <!-- <hr class="mainhr" /> -->
      <!-- 路由占位符 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  //数据
  data() {
    return {
      activePath: '/algorithm'
    }
  },

  //方法
  methods: {
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }

  }

}
</script>

<style lang="less" scoped>
#jiantou {
  border: none;
  margin-top: 8px;
  font-size: large;
}

.home-container {
  height: 100%;
}

.el-header {
  // display: flex;
  // justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-left: 0px;
  padding-right: 20px;
}

.home_header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-left: 0px;
  padding-right: 20px;
}

.el-main {
  height: 100%;
}

.el-menu-item {
  padding-left: 100px;
  font-size: 16px;
}

.elmenu1 {
  padding-left: 0px;
}

/* 点击出来的下划线进行隐藏 */
.el-menu-item.is-active {
  border-bottom: none !important;
  color: rgba(0, 0, 0, 0);
}

/* 点击出来的下划线动效残留进行隐藏 */
.el-menu--horizontal>.el-menu-item {
  border-bottom: none;
}

/* 整体的下划线进行隐藏 */
.el-menu.el-menu--horizontal {
  border-bottom: none;
}

.admin {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-right: 24px;
}

.adminimg {
  border: 1px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-top: 5px;
}

.el-main {
  padding: 0px;
}

.mainhr {
  //height: 1px;
  border: solid 1px #ebeef5;
}

/deep/.el-menu--horizontal>.el-menu-item.is-active {
  color: #0a8410;
  font-weight: 600;
}

// /deep/.el-menu-item.is-active {
//   color: #0a8410;
//   font-weight: 600;
// }
</style>