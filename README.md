## 前言
百度echart中并没有圆角环形图，highchart的圆角环形图和项目中的有些出入，因此，写了一个，在这里分享一下

## 示例图片

![示例图片](https://github.com/confidence68/cricleRoundring/blob/master/exmaple.png)

## 参数


	 * @param {type} radius 圆环半径
	 * @param {type} lineWidth 圆环宽度
	 * @param {type} strokeStyle 默认背景
	 * @param {type} fillStyleArray 数组，圆环色块颜色
	 * @param {type} capType 类型：round是圆角，square正方形顶帽，butt是正常
	 * @param {type} percentArray ，数字，每个占据的百分比
	 * @param {type} startAngle 开始的角度
	 * @returns {Circle} 



## 使用方法


	            var canvas = document.getElementById('canvas');
	            var ctx = canvas.getContext('2d');
	            var ring = new Ring("80", "25", "#ccc", ["#a1b91d", "#e9636a", "#e7ba21"], "round");
	            ring.drawRing(ctx, 2 * Math.PI / 3, [20, 50, 30]);//占据的百分比分别是20%，50%，30%



## demo案例

http://resource.haorooms.com/uploads/demo/canvas/cricleRoundring/yuanhuan.html

