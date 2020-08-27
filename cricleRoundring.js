/**
 * 
 * @param {type} radius 圆环半径
 * @param {type} lineWidth 圆环宽度
 * @param {type} strokeStyle 默认背景
 * @param {type} fillStyleArray 数组，圆环色块颜色
 * @param {type} capType 类型：round是圆角，square正方形顶帽，butt是正常
 * @returns {Circle} criclex、cricley圆心坐标
 * author haorooms
 * fix bruce wang
 */

 // 继承属性公用方法
function inheritPrototype(subType, superType){ 
    let prototype = Object.create(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 指定对象
}

// 圆的构造函数
function Circle(radius, lineWidth, strokeStyle, fillStyleArray, capType) {
    this.radius = radius;    // 圆环半径
    this.lineWidth = lineWidth;  // 圆环边的宽度
    this.strokeStyle = strokeStyle; //边的颜色
    this.fillStyle = fillStyleArray;  //填充色
    this.lineCap = capType;
}
// 圆的一个方法 draw
Circle.prototype.draw = function (ctx,criclex,cricley) {
    // 开始绘制
    ctx.beginPath();
    // 绘制外圆, 圆心为(criclex, cricley), 半径为radius, 起始弧度为0, 结束弧度为2PI, 是否是逆时针(true) (画布的0度是正右边开始)   
    ctx.arc(criclex, cricley, this.radius, 0, Math.PI * 2, true);
    // 圆的border的宽度是lineWidth
    ctx.lineWidth = this.lineWidth;
     // 描边色
    ctx.strokeStyle = this.strokeStyle;
    // 画一个空心圆
    ctx.stroke();  
};


// 圆环的构造函数 借用构造函数继承
function Ring(radius, lineWidth, strokeStyle, fillStyleArray, capType) {
    Circle.call(this, radius, lineWidth, strokeStyle, fillStyleArray, capType);
}

// 圆环继承圆的方法
inheritPrototype(Ring, Circle);

// 圆环的私有方法 drawRing
Ring.prototype.drawRing = function (ctx, startAngle, percentArray ,criclex,cricley) {
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




// export default Ring;