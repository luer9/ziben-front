<template>
  <div id="mountNode6"></div>
</template>
<script>
import G2 from '@antv/g2'
import DataSet from '@antv/data-set';
import $ from 'jquery';
export default {
  name:'',
  data () {
    return {
      chart: null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm =>{
      vm.drawChart();
    })
  },
  mounted () {
    this.drawChart();
  },
  methods: {
    drawChart () {
      let size = this.getViewportSize();
      let width = size.width/2 - 40;
      let height = size.height/2;
      // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
      // 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
      this.chart && this.chart.destroy();
      $.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/coffe2.json', function(filedata) {
        var rollupData = {};
        var tem_fileData = filedata;
        var data = combineData(tem_fileData);
        var chart = new G2.Chart({
          container: 'mountNode6',
          height: height,
          width: width,
          padding: [60, 140, 30, 70]
        });
        chart.source(data, {
          date: {
            type: 'timeCat',
            ticks: ['2010-01', '2010-04', '2010-07', '2010-10', '2011-01', '2011-04', '2011-07', '2011-10']
          }
        });
        chart.axis('date', {
          label: {
            textStyle: {
              fill: '#aaaaaa'
            }
          }
        });
        chart.axis('value', {
          label: {
            textStyle: {
              fill: '#aaaaaa'
            },
            formatter: function formatter(text) {
              return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            }
          }
        });
        chart.legend({
          attachLast: true
        });
        chart.tooltip({
          triggerOn: 'click',
          shared: false,
          crosshairs: false,
          htmlContent: function htmlContent(title, items) {
            var dataType = items[0].name;
            var container = '<div class="g2-tooltip">';
            var titleDom = '<div class="g2-tooltip-title" style="margin-bottom: 4px;">' + title + '</div>';
            var listDom = '<ul class="g2-tooltip-list">';
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              var itemDom = '<li data-index={index}>' + '<span style="background-color:' + item.color + ';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' + item.name + '<span class="g2-tooltip-value">' + item.value + '</span>' + '</li>';
              listDom += itemDom;
            }
            listDom += '</ul>';
            var tailDom = '<li class="g2-tooltip-tail" data-dimension="' + dataType + '">点击下钻</li>';
            var childrenLength = Object.keys(tem_fileData[dataType].children).length;
            if (childrenLength > 0) {
              return container + titleDom + listDom + tailDom + '</div>';
            } else {
              return container + titleDom + listDom + '</div>';
            }
          }
        });
        chart.line().position('date*value').color('type').size(3);
        chart.render();
        $(document).on('click', '.g2-tooltip-tail', function() {
          var target = $(this)[0];
          drillingDown($(target));
        });
      });
      
      function  combineData(data) {
        var output = [];
        for (var key in data) {
          var d = data[key];
          output = output.concat(d.data);
        }
        return output;
      }

      function rollingUp(dimension) {
        var selected = rollupData[dimension];
        var data = combineData(selected);
        chart.source(data);
        chart.repaint();
        delete rollupData[dimension];
        tem_fileData = selected;
      }

      function drillingDown($target) {
        var data_type = $target.data('dimension');
        var selected = tem_fileData[data_type];
        rollupData[data_type] = tem_fileData;
        var d = combineData(selected.children);
        if (d.length > 0) {
          chart.source(d);
          chart.repaint();
          tem_fileData = selected.children;
          //绘制面包屑
          var $breadMarker = $('<span class="marker">' + data_type + '></span>');
          $breadMarker.data('dimension', data_type);
          $('.breadcrumb').append($breadMarker);
          //点击事件
          $breadMarker.click(function() {
            var dataDim = $(this).data('dimension');
            rollingUp(dataDim);
            //remove the related bread marker
            var index = $(this).index();
            var markerNumber = $('.breadcrumb .marker').length;
            var delete_markers = [];
            for (var i = index; i < markerNumber; i++) {
              var $marker = $('.breadcrumb').children()[i];
              delete_markers.push($marker);
            }
            delete_markers.forEach(function(marker) {
              marker.remove();
            });
          });
        }
      }

    },
    
  }
}
</script>
<style>
.g2-tooltip {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  color: rgb(87, 87, 87);
  font-size: 12px;
  line-height: 20px;
  top: 10px;
  padding: 10px 10px 6px 10px;
  box-shadow: 0px 0px 10px #aeaeae;
}

.g2-tooltip-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.g2-tooltip-value {
  margin-left: 30px;
  display: inline;
  float: right;
}

.g2-tooltip-tail {
  background-color: #f9f9f9;
  color: #909090;
  font-size: 12px;
  padding-bottom: 10px;
  margin-top: 10px;
  list-style-type: none;
  text-align: center;
  padding-top: 10px;
  cursor: pointer;
}

/*面包屑样式*/
.breadcrumb {
  width: 100%;
  height: 30px;
  float: left;
  color: #8c8c8c;
  font-size: 14px;
  margin-top: 20px;
  position: absolute;
  left: 0px;
  bottom:0px;
}

.breadcrumb .marker {
  width: auto;
  height: 100%;
  float: left;
  margin-right: 10px;
  cursor: pointer;
}
</style>