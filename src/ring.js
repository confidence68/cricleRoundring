import { inheritPrototype } from "./utils";
import { Circle } from "./cricle";


/**
 * 圆环的构造函数 借用构造函数继承
 * @param {*} radius 圆环半径
 * @param {*} lineWidth 圆环宽度
 * @param {*} strokeStyle 默认背景
 * @param {Array} fillStyleArray 圆环色块颜色
 * @param {*} capType 末端线帽的样式
 */
function Ring(radius, lineWidth, strokeStyle, fillStyleArray, capType) {
    Circle.call(this, radius, lineWidth, strokeStyle, fillStyleArray, capType);
}

// 圆环继承圆的方法
inheritPrototype(Ring, Circle);

/**
 * 圆环的私有方法 drawRing
 * @param {*} ctx canvas对象
 * @param {*} startAngle 画圆环的开始弧度
 * @param {Array} percentArray  每一项的占比
 * @param {*} criclex 圆心的x坐标
 * @param {*} cricley 圆心的y坐标
 */
Ring.prototype.drawRing = function (ctx, startAngle, percentArray, criclex, cricley) {
    startAngle = startAngle || (3 * Math.PI) / 2;
    percentArray = percentArray || [];
    // 调用Circle的draw方法画圈
    this.draw(ctx, criclex, cricley);
    let _this = this;
    // 画不同颜色弧段的圆
    percentArray.forEach(function (item, index) {
        // 开始绘制
        ctx.beginPath();
        // 每一项所拥有的弧长 PS: 2PI(一个圆的总弧长) 
        let anglePerSec = (2 * Math.PI) / (100 / item);
        // 以(criclex,cricley)为圆心, 绘制一条弧线，弧线半径为 radius，起始角度(startAngle)和结束角度(startAngle + anglePerSec), 是否逆时针(false)
        ctx.arc(criclex, cricley, _this.radius, startAngle, startAngle + anglePerSec, false);
        // 改变初始角度
        startAngle = startAngle + anglePerSec;
        // 描边色
        ctx.strokeStyle = _this.fillStyle[index];
        // 设置线条末端线帽的样式
        ctx.lineCap = _this.lineCap;
        //描边的方式,画上面设计的步骤
        ctx.stroke();
        ctx.closePath();
    });
    //小圆圈覆盖
    // 开始绘制
    ctx.beginPath();
    // 一单位的弧长
    let unitArc = 1 /  _this.radius;
    // 以(criclex,cricley)为圆心, 绘制一条弧线，弧线半径为 radius，起始角度(startAngle + unitArc)和结束角度startAngle + unitArc, 是否逆时针(false)
    ctx.arc(criclex, cricley, _this.radius, startAngle + unitArc, startAngle + unitArc, false);
    // 描边色
    ctx.strokeStyle = _this.fillStyle[0];
     // 设置线条末端线帽的样式
    ctx.lineCap = _this.lineCap;
    ctx.stroke();
    ctx.closePath();
}
export default Ring;