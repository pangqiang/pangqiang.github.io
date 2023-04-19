---
title: echart异形柱状图
tags: JS
---
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ECharts 折线图示例</title>
    <!-- 引入 ECharts.js -->
    <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
</head>
<body>
    <!-- 用于显示折线图的 DOM 节点 -->
    <div id="chart" style="width: 800px; height: 600px;"></div>
    <script>
        // 初始化 ECharts 实例
        var myChart = echarts.init(document.getElementById('chart'));

        // 指定图表的配置项和数据
        var option = {
            // 设置图表的标题
            title: {
                text: '山峰起伏状数据统计图表'
            },
            // 设置图表的 x 轴
            xAxis: {
                type: 'category',
                data: ['一月', '二月', '三月', '四月', '五月', '六月']
            },
            // 设置图表的 y 轴
            yAxis: {
                type: 'value'
            },
            // 设置图表的数据系列
            series: [{
                name: '数据',
                type: 'line',
                // 设置数据
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                // 设置线条样式
                lineStyle: {
                    width: 3,
                    color: 'green'
                },
                // 设置区域填充样式
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'white' // 0% 处的颜色
                        }, {
                            offset: 0.5, color: 'lightgreen' // 50% 处的颜色
                        }, {
                            offset: 1, color: 'green' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            }]
        };

        // 使用刚指定的配置项和数据显示图表
        myChart.setOption(option);
    </script>
</body>
</html>
```
