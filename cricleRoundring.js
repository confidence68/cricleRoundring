/**
 * 
 * @param {type} radius 圆环半径
 * @param {type} lineWidth 圆环宽度
 * @param {type} strokeStyle 默认背景
 * @param {type} fillStyleArray 数组，圆环色块颜色
 * @param {type} capType 类型：round是圆角，square正方形顶帽，butt是正常
 * @returns {Circle} criclex、cricley圆心坐标
 * author haorooms
 * 
 */
function Circle(radius, lineWidth, strokeStyle, fillStyleArray, capType) {
    this.radius = radius;    // 圆环半径
    this.lineWidth = lineWidth;  // 圆环边的宽度
    this.strokeStyle = strokeStyle; //边的颜色
    this.fillStyle = fillStyleArray;  //填充色
    this.lineCap = capType;
}
Circle.prototype.draw = function (ctx,criclex,cricley) {
    ctx.beginPath();
    ctx.arc(criclex, cricley, this.radius, 0, Math.PI * 2, true);  // 坐标为90的圆，这里起始角度是0，结束角度是Math.PI*2
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke();  // 这里用stroke画一个空心圆，想填充颜色的童鞋可以用fill方法
};
function Ring(radius, lineWidth, strokeStyle, fillStyleArray, capType) {
    Circle.call(this, radius, lineWidth, strokeStyle, fillStyleArray, capType);
}
Ring.prototype = Object.create(Circle.prototype);

Ring.prototype.drawRing = function (ctx, startAngle, percentArray ,criclex,cricley) {
    startAngle = startAngle || 3 * Math.PI / 2;
    percentArray = percentArray || [];
    this.draw(ctx,criclex,cricley);  // 调用Circle的draw方法画圈圈
    var _this = this;
    // angle
    percentArray.forEach(function (item, index) {
        ctx.beginPath();
        var anglePerSec = 2 * Math.PI / (100 / item); // 蓝色的弧度
        ctx.arc(criclex, cricley, _this.radius, startAngle, startAngle + anglePerSec, false); //这里的圆心坐标要和cirle的保持一致
        startAngle = startAngle + anglePerSec;
        ctx.strokeStyle = _this.fillStyle[index];
        ctx.lineCap = _this.lineCap;
        ctx.stroke();
        ctx.closePath();
    })
    //小圆圈覆盖
    ctx.beginPath();
    ctx.arc(criclex, cricley, _this.radius, startAngle, startAngle, false); //这里的圆心坐标要和cirle的保持一致
    ctx.strokeStyle = _this.fillStyle[0];
    ctx.lineCap = _this.lineCap;
    ctx.stroke();
    ctx.closePath();
}