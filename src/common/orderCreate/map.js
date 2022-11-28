
export default {
  methods: {

    //切换图层
    addCtrl() {
      var ctrl = new T.Control.MapType([
        {
          title: "地图", //地图控件上所要显示的图层名称
          icon: "http://api.tianditu.gov.cn/v4.0/image/map/maptype/vector.png", //地图控件上所要显示的图层图标（默认图标大小80x80）
          layer: TMAP_NORMAL_MAP, //地图类型对象，即MapType。
        },

        {
          title: "卫星",
          icon: "http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellite.png",
          layer: TMAP_SATELLITE_MAP,
        },

        {
          title: "卫星混合",
          http: "http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellitepoi.png",
          layer: TMAP_HYBRID_MAP,
        },
        /*
       {
         title: "地形",
         icon: " http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrain.png",
         layer: TMAP_TERRAIN_MAP,
       },
       {
         title: "地形混合",
         icon: " http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrainpoi.png",
         layer: TMAP_TERRAIN_HYBRID_MAP,
       },*/
      ]);
      this.map.addControl(ctrl);
    },

    //标注范围
    // draw() {
    //   let imageURL = "http://localhost:8080/geoserver/gwc/service/wmts?layer=china%3AL10&style=&tilematrixset=WebMercatorQuad&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}"
    //   //创建自定义图层对象
    //   let lay = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
    //   //将图层增加到地图上
    //   map.addLayer(lay);

    //   polygonTool = new T.PolygonTool(map, {
    //     showLabel: false,  // 不显示面积信息
    //     color: "#ffcd42", weight: 3, opacity: 0.5, fillColor: "#ffdc00", fillOpacity: 0.5
    //   });
    //   //polygonTool.open()
    //   //polygonTool.addEventListener('draw', this.drawFinish)  // 监听双击绘制完成事件，调用drawFinish方法
    // },
  }
}

