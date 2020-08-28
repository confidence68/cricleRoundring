## 前言



项目中有用到一些常用图表库没有的图表,就此收集下,现在只有圆角环形图



## 使用方法

### 安装

\```

npm i beyond-echarts

\```

### 页面使用1

\```

import Charts from "beyond-echarts";



const container = document.querySelector('#pie');

charts.init(container);

charts.setOption(option);

\```

### 页面使用2

```

<script type="text/javascript"  src="../dist/beyond-echarts.js"></script>



<script type="text/javascript">

​    const container = document.querySelector('#pie');

​    beyondEcharts.init(container);

​    beyondEcharts.setOption(option1);

</script>
```



## 配置 (和echarts一样)

```
const option = {

​                        series:[ {

​                            type: 'pie',

​                            capType: 'round',

​                            radius: ['65%', '35%'],

​                            data: [

​                                {

​                                    value: 400, 

​                                    name: '直接访问',

​                                    itemStyle: {

​                                        color: {

​                                            type: 'linear',

​                                            x: 0,

​                                            y: 0,

​                                            x2: 0,

​                                            y2: 1,

​                                            colorStops: [{

​                                                offset: 0, color: '#FFCE35' // 0% 处的颜色

​                                            }, {

​                                                offset: 1, color: '#FFA219' // 100% 处的颜色

​                                            }],

​                                            global: false // 缺省为 false

​                                        }

​                                    }

​                                },

​                                {

​                                    value: 800, 

​                                    name: '直接访问',

​                                    itemStyle: {

​                                        color: {

​                                            type: 'linear',

​                                            x: 0,

​                                            y: 0,

​                                            x2: 0,

​                                            y2: 1,

​                                            colorStops: [{

​                                                offset: 0, color: '#29C38C' // 0% 处的颜色

​                                            }, {

​                                                offset: 1, color: '#0DB880' // 100% 处的颜色

​                                            }],

​                                            global: false // 缺省为 false

​                                        }

​                                    }

​                                },

​                                {

​                                    value: 405, 

​                                    name: '直接访问',

​                                    itemStyle: {

​                                        color: {

​                                            type: 'linear',

​                                            x: 0,

​                                            y: 0,

​                                            x2: 0,

​                                            y2: 1,

​                                            colorStops: [{

​                                                offset: 0, color: '#F74B53' // 0% 处的颜色

​                                            }, {

​                                                offset: 1, color: '#FB828B' // 100% 处的颜色

​                                            }],

​                                            global: false // 缺省为 false

​                                        }

​                                    }

​                                },

​                            ]

​                        }]

​                } 
```

[echarts Api文档](https://echarts.apache.org/en/api.html)        

## demo 

https://github.com/BruceWang99/cricleRoundring/blob/master/demo/index.html