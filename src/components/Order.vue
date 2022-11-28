<template>
  <el-container>
    <el-header class="order_header">
      <img style="width: 100%;height:100%;margin: 20px 0px;" src="@/assets/imgs/order/banner.png" />
    </el-header>
    <el-main class="order_main">
      <div class="order_main_head">
        <p class="order_main_head_p">
          订单管理&nbsp;&nbsp;&nbsp;Order&nbsp;Management
        </p>
        <el-button class="order_main_head_btn" @click="goCreateOrder">
          + &nbsp; 创建订单
        </el-button>
      </div>
      <!-- 下方表格 -->
      <div class="order_table">
        <el-table :data="orderlist.slice((currentChangeIndex - 1) * pageSize, currentChangeIndex * pageSize)" stripe
          style="width: 100%" :header-cell-style="{ textAlign: 'center', background: '#d9e0f0', color: '#000000' }"
          :cell-style="{ textAlign: 'center' }">
          <el-table-column label="订单编号" prop="oiOrderId" width="200"></el-table-column>
          <el-table-column label="产品名称" prop="oiName" width="300"></el-table-column>
          <el-table-column label="订单创建时间" prop="oiCreateTime" width="300"></el-table-column>
          <el-table-column label="订单创建者" prop="oiOperator" width="300"></el-table-column>
          <el-table-column label="订单状态" prop="oiOrderStatus" width="200"></el-table-column>
          <!-- 为什么不能加fixed="right"固定行？ -->
          <el-table-column label="操作" min-width="300">
            <div slot-scope="scope" class="order_btn">
              <el-button type="text" size="small" class="order_btn_c">详情</el-button>
              <el-button type="text" size="small" class="order_btn_c">提交</el-button>
              <el-button type="text" size="small" class="order_btn_c">编辑</el-button>
              <el-button type="text" size="small" class="order_btn_c">暂停</el-button>
              <el-button type="text" size="small" class="order_btn_c" @click="deleteOrder(scope.row.oiOrderId)">删除
              </el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>

      <!--分页-->
      <div class="orderlist_pagination">
        <el-pagination @current-change="handleCurrentChange" :page-size="pageSize"
          layout="total, prev, pager, next, jumper" :total="this.orderlist.length">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      orderlist: [
        // {
        //   //模拟数据
        //   orderId: '1',
        //   orderName: '遥感制图',
        //   orderTime: '2022-11-15',
        //   orderAuthor: '张三',
        //   orderState: '处理成功'
        // },
        // {
        //   //模拟数据
        //   orderId: '2',
        //   orderName: 'gis重点项目',
        //   orderTime: '2022-11-15',
        //   orderAuthor: '张三',
        //   orderState: '处理成功'
        // }
      ],

      //分页当前页
      currentChangeIndex: 1,

      //每页显示条数
      pageSize: 10

    }
  },

  created() {
    this.requestOrders()
  },

  methods: {
    //跳转到创建订单页面
    goCreateOrder() {
      this.$router.push({ path: "/orderCreate", });
    },

    //查询订单列表
    async requestOrders() {
      const { data: res } = await this.$http.get("/order/findAllOrders")
      if (res.code != 200) return

      this.orderlist = res.data.item
      //console.log(this.orderlist)
    },

    //分页
    handleCurrentChange(currentPage) {
      this.currentChangeIndex = currentPage
    },

    //删除
    deleteOrder(id) {
      //console.log(id)
      this.$confirm('你确定要删除这条数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: "warning"
      }).then(() => {
        this.$http.get('/order/deleteOrderById/' + id
        ).then(resp => {
          if (resp.data.msg === '请求成功') {
            this.$message.success("恭喜你,删除成功")
            // window.location.reload()
            this.requestOrders()
          } else {
            this.$message.warning('删除失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // alert(id)

    },
  }
}

</script>

<style lang="less">
@import '@/assets/css/order.less';
</style>