<template>
  <div id="mountNode5"></div>
</template>
<script>
import G2 from '@antv/g2'
import DataSet from '@antv/data-set';
import $ from 'jquery'
export default {
  name:'',
  data () {
    return {
      chart: null,
      chartData: [
        {
          date: '2018/8/1',
          type: 'download',
          value: 4623
        }, {
            date: '2018/8/1',
            type: 'register',
            value: 2208
        }, {
            date: '2018/8/1',
            type: 'bill',
            value: 182
        }, {
            date: '2018/8/2',
            type: 'download',
            value: 6145
        }, {
            date: '2018/8/2',
            type: 'register',
            value: 2016
        }, {
            date: '2018/8/2',
            type: 'bill',
            value: 257
        }, {
            date: '2018/8/3',
            type: 'download',
            value: 508
        }, {
            date: '2018/8/3',
            type: 'register',
            value: 2916
        }, {
            date: '2018/8/3',
            type: 'bill',
            value: 289
        }, {
            date: '2018/8/4',
            type: 'download',
            value: 6268
        }, {
            date: '2018/8/4',
            type: 'register',
            value: 4512
        }, {
            date: '2018/8/4',
            type: 'bill',
            value: 428
        }, {
            date: '2018/8/5',
            type: 'download',
            value: 6411
        }, {
            date: '2018/8/5',
            type: 'register',
            value: 8281
        }, {
            date: '2018/8/5',
            type: 'bill',
            value: 619
        }, {
            date: '2018/8/6',
            type: 'download',
            value: 1890
        }, {
            date: '2018/8/6',
            type: 'register',
            value: 2008
        }, {
            date: '2018/8/6',
            type: 'bill',
            value: 87
        }, {
            date: '2018/8/7',
            type: 'download',
            value: 4251
        }, {
            date: '2018/8/7',
            type: 'register',
            value: 1963
        }, {
            date: '2018/8/7',
            type: 'bill',
            value: 706
        }, {
            date: '2018/8/8',
            type: 'download',
            value: 2978
        }, {
            date: '2018/8/8',
            type: 'register',
            value: 2367
        }, {
            date: '2018/8/8',
            type: 'bill',
            value: 387
        }, {
            date: '2018/8/9',
            type: 'download',
            value: 3880
        }, {
            date: '2018/8/9',
            type: 'register',
            value: 2956
        }, {
            date: '2018/8/9',
            type: 'bill',
            value: 488
        }, {
            date: '2018/8/10',
            type: 'download',
            value: 3606
        }, {
            date: '2018/8/10',
            type: 'register',
            value: 678
        }, {
            date: '2018/8/10',
            type: 'bill',
            value: 507
        }, {
            date: '2018/8/11',
            type: 'download',
            value: 4311
        }, {
            date: '2018/8/11',
            type: 'register',
            value: 3188
        }, {
            date: '2018/8/11',
            type: 'bill',
            value: 548
        }, {
            date: '2018/8/12',
            type: 'download',
            value: 4116
        }, {
            date: '2018/8/12',
            type: 'register',
            value: 3491
        }, {
            date: '2018/8/12',
            type: 'bill',
            value: 456
        }, {
            date: '2018/8/13',
            type: 'download',
            value: 6419
        }, {
            date: '2018/8/13',
            type: 'register',
            value: 2852
        }, {
            date: '2018/8/13',
            type: 'bill',
            value: 689
        }, {
            date: '2018/8/14',
            type: 'download',
            value: 1643
        }, {
            date: '2018/8/14',
            type: 'register',
            value: 4788
        }, {
            date: '2018/8/14',
            type: 'bill',
            value: 280
        }, {
            date: '2018/8/15',
            type: 'download',
            value: 445
        }, {
            date: '2018/8/15',
            type: 'register',
            value: 4319
        }, {
            date: '2018/8/15',
            type: 'bill',
            value: 176
        }
      ]
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
      var chart = new G2.Chart({
        container: 'mountNode5',
        height: height,
        width: width,
        padding: [100, 40, 30, 45] // 上右下左
      });
      chart.source(this.chartData);
      chart.tooltip({
        follow: false,
        crosshairs: 'y',
        htmlContent: function htmlContent(title, items) {
          var alias = {
            download: '当日累计下载量',
            register: '当日累计注册量',
            bill: '当日累计成交量'
          };
          var html = '<div class="custom-tooltip">';
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var color = item.color;
            var name = alias[item.name];
            var value = item.value;
            var domHead = '<div class="custom-tooltip-item" style="border-left-color:' + color + '">';
            var domName = '<div class="custom-tooltip-item-name">' + name + '</div>';
            var domValue = '<div class="custom-tooltip-item-value">' + value + '</div>';
            var domTail = '</div>';
            html += domHead + domName + domValue + domTail;
          }
          return html + '</div>';
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
      chart.legend(false);
      chart.line().position('date*value').color('type');
      chart.render();
      chart.showTooltip({
        x: $("#mountNode").width() - 20,
        y: 100
      });
    }
  }
}
</script>
<style>
.custom-tooltip {
  width: 100% !important;
  height: 10% !important;
  position: absolute;
  top: 0px;
  left: 0px;
  box-shadow: none!important;
}
.custom-tooltip-item {
  width: 150px;
  height: 50px;
  position: relative;
  float: left;
  margin-left: 20px;
  border-left-style: solid;
  border-left-width: 5px
}

.custom-tooltip-item:first-child {
  margin-left: 0
}

.custom-tooltip-item-name {
  width: 80%;
  height: 20px;
  position: absolute;
  top: 0px;
  left: 10px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px
}

.custom-tooltip-item-value {
  width: 80%;
  height: 30px;
  position: absolute;
  bottom: 0px;
  left: 10px;
  color: #262626;
  font-size: 22px;
  /*font-weight: bold*/
}
</style>