<template>
  <el-container class="main-container">
    <el-header class="algor_header">
      <img style="width: 100%;height:100%;margin: 20px 0px;" src="@/assets/imgs/algorithm/banner.jpg" />
    </el-header>
    <el-container>
      <el-aside width="300px">
        <el-scrollbar style="height:100%">
          <p class="algor_list">算法列表</p>
          <div>
            <el-input placeholder="请输入关键字查询" v-model="filterText" class="algor_input">
              <i slot="suffix" class="iconfont icon-a-huaban1fuben7"></i>
              <!-- <el-button class="algor_button" slot="append" icon="iconfont icon-a-huaban1fuben7"></el-button> -->
            </el-input>
          </div>
          <div class="algor_tree">
            <el-tree class="algor_data_tree" :data="algorDataTree" :props="defaultProps" :highlight-current="true"
              :default-expand-all="false" ref="tree" :filter-node-method="filterNode" @node-click="handleNodeClick">
            </el-tree>
          </div>
        </el-scrollbar>
      </el-aside>
      <el-main class="algor_main">
        <p class="algor_list">
          算法主要信息
        </p>
        <div class="algor_main_header">
          <div class="algor_main_left">
            <p class="algor_main_t">{{ paraMainData.algChName }}</p>
            <p class="algor_main_p">{{ paraMainData.algEnName }}</p>
            <p class="algor_main_p">版本：{{ paraMainData.algVersion }}</p>
            <p class="algor_main_p">作者：{{ paraMainData.algAuthor }}</p>
          </div>
          <div class="algor_btn">
            <el-button>
              <i class="iconfont icon-a-1_2" style="font-size: 16px"></i>
              操作
            </el-button>
            <el-button @click="flash()">
              <i class="iconfont icon-a-1_3" style="font-size: 16px"></i>
              刷新
            </el-button>
            <el-button @click="deleteAlgor()">
              <i class="iconfont icon-a-1_4" style="font-size: 16px"></i>
              删除
            </el-button>
            <el-button>
              <i class="iconfont icon-a-1_5" style="font-size: 16px"></i>
              上传算法
            </el-button>
          </div>
        </div>
        <div class="algor_main_abstract">
          <p>
            <!-- {{ paraMainData.algDes }} -->
            叶面积指数，亦称叶面积系数。是指单位土地面积上植物叶片总面积占土地面积的倍数。
            它与植被的密度、结构（单层或复层）、树木的生物学特性（分枝角、叶着生角、耐荫性等)和
            环境条件（光照、水分、土壤营养状况）有关，是表示植被利用光能状况和冠层结构的一个综合指标。
          </p>
        </div>
        <!-- 上层表格 -->
        <div class="algor_header_table">
          <div style="width:50%">
            <p>Utility参数表</p>
            <el-table :data="utilityData" border style="width: 100%;margin-right: 20px;"
              :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
              <el-table-column prop="utSataName" label="卫星型号" width="250">
              </el-table-column>
              <el-table-column prop="utSensorName" label="传感器" width="250">
              </el-table-column>
              <el-table-column prop="utResolution" label="分辨率">
              </el-table-column>
            </el-table>
          </div>
          <div style="width:50%">
            <p style="padding-left:20px;">算法环境信息</p>
            <el-table :data="envirData" border style="width: 100%;margin-left: 20px;"
              :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
              <el-table-column prop="envCPU" label="CPU型号" width="250">
              </el-table-column>
              <el-table-column prop="envGPU" label="GPU型号" width="250">
              </el-table-column>
              <el-table-column prop="envOperatingSystem" label="操作系统">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 下层表格 -->
        <div class="algor_foot_table">
          <p>输入输出参数信息表</p>
          <el-table :data="inParaData" border style="width: 100%" :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }">
            <el-table-column label="算法id" prop="algId" min-width="100"></el-table-column>
            <el-table-column prop="algorCnName" label="中文名字" width="100"></el-table-column>
            <el-table-column prop="algorDataType" label="数据类型" width="100"></el-table-column>
            <el-table-column prop="algorDetail" label="详细信息" width="100"></el-table-column>
            <el-table-column prop="algorEnName" label="英文名" width="100"></el-table-column>
            <el-table-column label="参数id" prop="pmId" width="100"></el-table-column>
            <el-table-column prop="algorMax" label="最大值" width="100"></el-table-column>
            <el-table-column prop="algorMin" label="最小值" width="100"></el-table-column>
            <el-table-column label="无数据时" width="100"></el-table-column>
            <el-table-column prop="algorOperate" label="操作" width="100"></el-table-column>
            <el-table-column label="选择" width="100"></el-table-column>
            <el-table-column prop="algorResource" label="来源" width="100"></el-table-column>
            <el-table-column prop="algorType" label="类型" width="100"></el-table-column>
            <el-table-column label="创建时间" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
              <div slot-scope="scope" class="argor_foot_table_button">
                <el-button type="text" size="small" class="argor_foot_table_button_c">编辑</el-button>
                <el-button type="text" size="small" class="argor_foot_table_button_c">保存</el-button>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  //侦听器
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },

  data() {
    return {
      algorMainData: [
        //模拟数据
        //   {
        //   algorId: '61',
        //   chineseName: '土壤水分数',
        //   dataTpye: 'tif',
        //   detail: '实测的土壤',
        //   dataId: '86',
        //   englishName: 'SoilMoistu',
        //   dataMax: '',
        //   datamin: '',
        //   noneData: '',
        //   operate: '',
        //   select: '',
        //   source: '',
        //   fileType: '',
        //   createTime: ''
        // }
      ],

      //参数信息表
      utilityData: [],

      //算法环境信息表
      envirData: [],

      //树形控件信息
      algorDataTree: [
        //模拟数据
        //   {
        //   label: '几何类产品',
        //   children: [{
        //     label: '正射产品DOM',
        //     children: [{
        //       label: '叶面积反演'
        //     }]
        //   },
        //   {
        //     label: '高程产品DOM',
        //     children: [{
        //       label: '其它'
        //     }]
        //   }]
        // }
      ],

      defaultProps: {
        children: 'children',
        label: 'label'
      },

      //算法搜索
      filterText: '',

      //算法主要信息列表
      paraMainData: {
        algEnName: '',
        algChName: '',
        algDes: '',
        algVersion: '',
        algAuthor: '',
        algManOpr: ''
      },

      //Utility参数表
      utilityData: [],

      //输入输出参数信息
      inParaData: [],

      //算法树子项id
      index: ''
    }
  },

  created() {
    //渲染算法列表
    this.convert();
  },

  methods: {
    // 获取树的列表
    async convert() {
      const { data: res } = await this.$http.get("alg/algClass")
      //console.log(res)
      // 转换成字符串
      let jsonStr = JSON.stringify(res.data.item).replaceAll('"name"', '"label"');
      //  字符串转成json
      this.algorDataTree = JSON.parse(jsonStr);
    },

    // 树形列表，搜索对应树
    filterNode(value, TreeData) {
      if (!value) return true;
      return TreeData.label.indexOf(value) !== -1;
    },

    // 点击树形结构，通过获取id，index等于id
    handleNodeClick(data) {
      //console.log(data.id); 
      this.index = data.id;
      this.querryData(data.id);
    },

    // 通过id查询详细信息函数 判断id是否为number类型，是则发起请求
    async querryData(id) {
      if (typeof (id) == "number") {
        const { data: res } = await this.$http.get("alg/getParamsById/" + id)
        this.paraDes = res.data.item;
        //console.log(this.paraDes)

        // 输入输出参数信息表
        this.inParaData = [];
        for (let i = 0; i < res.data.item.algParameters.length; i++) {
          var obj = new Object();
          //   "参数英文名",英文名
          obj.algorEnName = res.data.item.algParameters[i].pmEnName;
          //   "参数中文名",中文名字
          obj.algorCnName = res.data.item.algParameters[i].pmChName;
          //   "参数说明",详细信息
          obj.algorDetail = res.data.item.algParameters[i].pmDes;
          //   "参数类型",类型
          obj.algorType = res.data.item.algParameters[i].pmType;
          //   "参数数据类型",数据类型
          obj.algorDataType = res.data.item.algParameters[i].pmDataType;
          //   "参数来源",来源
          obj.algorResource = res.data.item.algParameters[i].pmResource;
          //   "参数值",
          obj.algorValue = res.data.item.algParameters[i].pmValue;
          //   "最大值",最大值
          obj.algorMax = res.data.item.algParameters[i].pmMaxValue;
          //   "最小值",最小值
          obj.algorMin = res.data.item.algParameters[i].pmMinValue;
          //   "参数标识 ",操作
          obj.algorOperate = res.data.item.algParameters[i].pmOperate;
          //算法Id
          obj.algId = res.data.item.algParameters[i].algId;
          //参数Id
          obj.pmId = res.data.item.algParameters[i].pmId;
          this.inParaData.push(obj);
        };

        // 算法环境信息
        this.envirData = [];
        for (let i = 0; i < res.data.item.algEnvironments.length; i++) {
          var obj = new Object();
          //CPU型号
          obj.envCPU = res.data.item.algEnvironments[i].envCPU;
          //GPU型号
          obj.envGPU = res.data.item.algEnvironments[i].envGPU;
          //操作系统
          obj.envOperatingSystem = res.data.item.algEnvironments[i].envOperatingSystem;
          this.envirData.push(obj);
        };

        // utility参数信息
        this.utilityData = [];
        for (let i = 0; i < res.data.item.algUtilityParameters.length; i++) {
          var obj = new Object();
          //卫星型号
          obj.utSataName = res.data.item.algUtilityParameters[i].utSataName;
          //传感器
          obj.utSensorName = res.data.item.algUtilityParameters[i].utSensorName;
          //分辨率
          obj.utResolution = res.data.item.algUtilityParameters[i].utResolution;
          this.utilityData.push(obj);
        };

        // // 算法主要信息参数信息
        // this.paraMainData = [];
        // var obj = new Object();
        // //算法英文名
        // obj.algEnName = this.paraDes.algEnName;
        // //算法中文名
        // obj.algChName = this.paraDes.algChName;
        // //算法描述信息
        // obj.algDes = this.paraDes.algDes;
        // //算法版本号
        // obj.algVersion = this.paraDes.algVersion;
        // // 算法作者
        // obj.algAuthor = this.paraDes.algAuthor;
        // //人工操作
        // obj.algManOpr = this.paraDes.algManOpr;
        // this.paraMainData.push(obj);

        //算法英文名
        this.paraMainData.algEnName = this.paraDes.algEnName;
        //算法中文名
        this.paraMainData.algChName = this.paraDes.algChName;
        //算法描述信息
        this.paraMainData.algDes = this.paraDes.algDes;
        //算法版本号
        this.paraMainData.algVersion = this.paraDes.algVersion;
        // 算法作者
        this.paraMainData.algAuthor = this.paraDes.algAuthor;
        //人工操作
        this.paraMainData.algManOpr = this.paraDes.algManOpr;

        // console.log("打印各个列表");
        // console.log(this.paraMainData);
        // console.log(this.EnvironmentData);
        // console.log(this.inParaData);
        // console.log(this.utilityData);
      }
      else {
        return
      }
    },

    //刷新
    flash() {
      location.reload();
    },

    //删除
    async deleteAlgor() {
      let data = { algId: this.index };

      const { data: res } = await this.$http.post("/alg/deleteAlgById/" + data.algId)

      if (res.code == 200) {
        this.$message.success('删除成功！')
      }

      //this.flash();
    },
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/global.less';
@import '@/assets/css/elstyle.less';
@import '@/assets/css/algorithm.less';

.el-button {
  // width: 88px;
  //height: 36px;
  background-color: #0a8410 !important;
  border-radius: 5px;
  color: #fff !important;
}
</style>