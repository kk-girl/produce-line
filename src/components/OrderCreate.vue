<template>
  <el-container>
    <el-aside width="420px" class="orderCreate_params">
      <div>
        <div class="orderCreate_params_title">
          <img class="orderCreate_params_img" src="@/assets/imgs/orderCreate/rectangle.png" />
          <P class="orderCreate_params_text">创建订单</P>
        </div>
        <div class="order_create_params_form">
          <el-form ref="orderCreateParams" label-width="auto" class="order_create_params">
            <el-form-item label="订单编号">
              <el-input placeholder="请输入订单编号"></el-input>
            </el-form-item>
            <el-form-item label="订单发起人">
              <el-input placeholder="请输入订单发起人"></el-input>
            </el-form-item>
            <el-form-item label="订单模式">
              <el-select class="m-2" placeholder="请选择" style="width:254px;">
                <el-option v-for="item in pattern" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="流程">
              <el-select class="m-2" placeholder="请选择流程" style="width:254px;">
              </el-select>
            </el-form-item>
            <template>
              <div class="order_params_flow">
                <p>流程号：&nbsp;PL1668734337241</p>
                <p>中文名：&nbsp;流程中文名</p>
                <p>英文名：&nbsp;englishName</p>
                <p>流程描述：&nbsp;描述</p>
              </div>
            </template>
            <!-- <el-select v-model="editPaperForm.assign" class="m-2" placeholder="请选择">
              <el-option v-for="item in Rewardlistdetail" :key="item.id" :label="item.title" :value="item.id" />
            </el-select> -->
            <el-form-item label="卫星种类">
              <el-select class="m-2" placeholder="请选择卫星种类" style="width:254px;">
              </el-select>
            </el-form-item>
            <el-form-item label="卫星名称">
              <el-select class="m-2" placeholder="请选择卫星名称" style="width:254px;">
              </el-select>
            </el-form-item>
            <el-form-item label="卫星载荷">
              <el-select class="m-2" placeholder="请选择卫星载荷" style="width:254px;">
              </el-select>
            </el-form-item>
            <el-form-item label="卫星拍摄时间">
              <el-select class="m-2" placeholder="请选择卫星拍摄时间" style="width:254px;">
              </el-select>
            </el-form-item>
            <el-form-item label="分辨率">
              <el-select class="m-2" placeholder="请选择分辨率" style="width:254px;">
              </el-select>
            </el-form-item>
            <el-form-item label="坐标信息">
              <el-input type="textarea" :rows="5"></el-input>
              <el-button @click="polygonTool.open()">选取范围</el-button>
            </el-form-item>
            <el-form-item label="所选影像信息">
              <el-input type="textarea" :rows="5"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button class="order_create_search_btn">检索</el-button>
        </div>
      </div>
      <div class="order_create_foot_btn">
        <el-button class="order_create_foot_btn_c">取消</el-button>
        <el-button class="order_create_foot_btn_c">提交订单</el-button>
        <el-button class="order_create_foot_btn_c">修改算法</el-button>
      </div>
    </el-aside>
    <el-main>
      <!-- 1.创建地图容器元素 -->
      <div id="map"></div>
    </el-main>
  </el-container>

</template>

<script>
//引入天地图,tk：在官网申请
//const MAP_URL = 'https://api.tianditu.gov.cn/api?v=4.0&tk=2806f65f26666577f3dc6f20d185477e';

// 引入刚才的map.js 注意路径
import map from '@/common/orderCreate/map'
export default {
  mixins: [map],
  data() {
    return {
      //模式选择
      pattern: [{ value: '2010', label: '普通模式' },
      { value: '2011', label: '紧急模式' }],

      //卫星选择列表
      SatelliteTypeInfo: [],

      //卫星参数表单
      satelliteForm: {},
      //地图
      map: {},
    }
  },

  mounted() {
    // 挂载完成后渲染地图
    this.onLoad();
  },

  created() {

  },


  methods: {
    onLoad() {
      let T = window.T
      this.map = new T.Map('map')
      //定位中心点 如果不写的话无法定位就不能显示 
      this.map.centerAndZoom(new T.LngLat(114.363950, 34.809420), 15)

      // 添加地图类型控件
      this.addCtrl()

      //画矩形
      rectTool = new T.RectangleTool(map);
      //this.draw()
    },
  }
}

</script>

<style lang="less">
@import '@/assets/css/global.less';
@import '@/assets/css/elstyle.less';
@import '@/assets/css/orderCreate.less';

#map {
  width: 100%;
  height: 100%;

}
</style>