<template>
  <div id="mountNode7"></div>
</template>
<script>
import G2 from '@antv/g2'
import DataSet from '@antv/data-set';
import $ from 'jquery'
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
      $.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/oil-price.json', function(data) {
        var chart = new G2.Chart({
          container: 'mountNode7',
          height: height,
          width: width,
          padding: [20, 140, 70, 35]
        });
        chart.source(data);
        chart.scale('date', {
          range: [0, 1],
          tickCount: 10,
          type: 'timeCat'
        });
        chart.axis('date', {
          label: {
            textStyle: {
              fill: '#aaaaaa'
            }
          }
        });
        chart.axis('price', {
          label: {
            textStyle: {
              fill: '#aaaaaa'
            }
          }
        });
        chart.tooltip({
          crosshairs: 'y',
          share: true
        });
        chart.legend({
          attachLast: true
        });
        chart.line().position('date*price').shape('hv').color('country');

        chart.render();
      });
    }
  }
}
</script>