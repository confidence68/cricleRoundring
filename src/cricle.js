
/**
 * 圆的构造函数
 * @param {*} radius 半径
 * @param {*} lineWidth border宽
 * @param {*} strokeStyle 默认的背景色
 * @param {*} fillStyleArray 填充色
 * @param {*} capType 末端线帽的样式
 */
function Circle(radius, lineWidth, strokeStyle, fillStyleArray, capType) {
    this.radius = radius;  
    this.lineWidth = lineWidth;  
    this.strokeStyle = strokeStyle; 
    this.fillStyle = fillStyleArray;
    this.lineCap = capType;
}
/**
 * 圆的一个方法 draw
 * @param {*} ctx canvas对象
 * @param {*} criclex 圆心的x坐标
 * @param {*} cricley 圆心的y坐标
 */
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

export default Circle;