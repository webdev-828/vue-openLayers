<template>
  <div>
    <div class="map" id="map"></div>
    <form class="form-inline">
      <label>Shape type &nbsp;</label>
      <select id="type">
        <option value="Circle">Box</option>
        <option value="None">None</option>
      </select>
    </form>
    <div>使用 Alt+Shift+Drag 旋转地图</div>
  </div>

</template>

<script>

import Map from "ol/map";
import View from "ol/view";
import TileLayer from "ol/layer/tile";
import SourceLayer from "ol/source/tilewms";
import Source from "ol/source/vector";
import Vector from "ol/layer/vector";

import Contorl from "ol/control";
import Select from "ol/interaction/select";

import Draw from "ol/interaction/draw";
import Geom from "ol/geom/polygon";
import Style from "ol/style/circle";
import Feature from "ol/feature";
import Sphere from "ol/sphere";

export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  mounted: function() {
    var raster = new TileLayer({
      source: new SourceLayer({
        url: "http://127.0.0.1/geoserver/hongwan/wms",
        params: {
          LAYERS: "hongwan:hongwan",
          TILED: true
        },
        serverType: "geoserver",
        transition: 0
      })
    });

    var source = new Source({
      //平铺
      wrapX: false
    });

    var vector = new Vector({
      //图层源
      source: source
    });

    var map = new Map({
      target: "map",
      controls: Contorl.defaults({
        attributionOptions: {
          collapsible: false
        }
      }),
      layers: [raster, vector],
      view: new View({
        center: [113.45521, 22.16287],
        zoom: 16,
        projection: "EPSG:4326",
        rotation: Math.PI / 1.25
      })
    });

    // 点击选择交互
    var select = new Select();
    map.addInteraction(select);
    var selectedFeatures = select.getFeatures();

    selectedFeatures.on(["add", "remove"], function() {
      var names = selectedFeatures.getArray().map(function(feature) {
        //选中feature处理事件
      });
    });

    var typeSelect = document.getElementById("type");
    var draw; // 全局，便于注销

    function addInteraction() {
      var value = typeSelect.value;
      if (value !== "None") {
        var geometryFunction;
        //绘制属性函数
        geometryFunction = function(coordinates, opt_geometry) {
          //获得起始点与终点
          var center = coordinates[0];
          var end = coordinates[1];
          //坐标转像素
          var centerPixel = map.getPixelFromCoordinate(center);
          var endPixel = map.getPixelFromCoordinate(end);
          //构建几何图形实例
          var geometry = opt_geometry ? opt_geometry : new Geom(coordinates);
          //构成图片的坐标点
          geometry.setCoordinates([
            [
              map.getCoordinateFromPixel(centerPixel),
              map.getCoordinateFromPixel([centerPixel[0], endPixel[1]]),
              map.getCoordinateFromPixel(endPixel),
              map.getCoordinateFromPixel([endPixel[0], centerPixel[1]]),
              map.getCoordinateFromPixel(centerPixel)
            ]
          ]);
          return geometry;
        };

        draw = new Draw({
          source: source,
          type: value,
          geometryFunction: geometryFunction
        });

        //监听器
        var drawStartListener = draw.on("drawstart", function(e) {
          // console.log("e:", e);
        });
        var drawEndListener = draw.on("drawend", function(e) {
          // console.log("e:", e);
        });
        var listenerKey = vector.getSource().on("change", function() {
          if (vector.getSource().getState() === "ready") {
            // vector.getSource().unset(listenerKey); // 注销监听器
          }
        });

        //压力测试，生成若干数量图形
        // for (var i = 0; i < 5000; i++) {
        //   var wgs64Sphere = new Sphere(6378137);
        //   var circle4326 = Geom.circular(
        //     wgs64Sphere,
        //     [113.46051 + i / 50000, 22.16087 + i / 20000],
        //     6,
        //     64
        //   );
        //   vector.getSource().addFeature(new Feature(circle4326));
        // }

        map.addInteraction(draw);
      }
    }

    /**
       * Handle change event.
       */
    typeSelect.onchange = function() {
      map.removeInteraction(draw);
      addInteraction();
    };

    addInteraction();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#map {
  width: 90%;
  height: 90%;
}
</style>
