import Ring from './ring';
/**
 * Charts 构造函数
 */
function Charts() {
  this.context = null;
  this.width = 720;
  this.height = 600;
};
/**
 * 初始化图表方法 init
 */
Charts.prototype.init = function(container){
    let ConvaDom = document.createElement("canvas");
    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight;
    let styleString = `width:${containerWidth}px;height:${containerHeight}px;user-select: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);padding: 0px;margin: 0px;border-width: 0px;`

    ConvaDom.setAttribute('width', containerWidth);
    ConvaDom.setAttribute('height', containerHeight);
    ConvaDom.setAttribute('style', styleString);
    container.appendChild(ConvaDom);
    const context = ConvaDom.getContext("2d");
    this.context  = context;
    this.width = containerWidth;
    this.height = containerHeight;
    return context;
};
/**
 * 获取圆环的半径和环宽
 */
Charts.prototype.getRadisAndRingwidth = function(radius=['100%', '0%']){
    let min = Math.min(this.width, this.height);
    function formate(str){
        return parseFloat(str.slice(0, -1));
    }
    return {
        radius: min * formate(radius[0]) / 100 / 2,
        lineWidth: min * formate(radius[1]) / 100 / 2
    }
};
/**
 * 颜色处理
 */
Charts.prototype.workWithColor = function(color){
    if(color instanceof Object){
        [{
            offset: 0, color: 'red' // 0% 处的颜色
        }, {
            offset: 1, color: 'blue' // 100% 处的颜色
        }]
    
        let colorGradient = null;
        if(color.type === 'linear'){
            colorGradient = this.context.createLinearGradient(color.x, color.y, color.x2, color.y2);
        }
        if(color.type === 'radial'){
            colorGradient = this.context.createRadialGradient(color.x, color.y, color.r, color.x, color.y, color.r);
        }
        color.colorStops.forEach(item => {
            colorGradient.addColorStop(item.offset, item.color);
        });
        return colorGradient;
    }
    return color
    
};
/**
 * 获取颜色列表
 */
Charts.prototype.getColorList = function(data){ // 获取颜色列表
    return data.map(item=>{
        return this.workWithColor(item.itemStyle.color);
    })
};
/**
 * 获取百分比列表
 */
Charts.prototype.getPercentList = function(data){ // 
    // let t = 0;
    const numList = data.map(item=>{
        return parseFloat(item.value);
    })
    const total = numList.reduce((total, item)=>total+item);
    let flagNum = 0;
    const list = numList.map((item, index)=>{
        if(index === numList.length-1){
            return 100 - flagNum;
        }
        const percent = Math.round(item/total*100);
        flagNum +=percent;
        return percent;
    })
    return list;
};
/**
 * 设置图表属性
 * @param {Object} options 属性
 */
Charts.prototype.setOption = function(options){
    let radisAndRingwidth = this.getRadisAndRingwidth(options.series[0].radius);
    let colorList = this.getColorList(options.series[0].data);
    let valueList = this.getPercentList(options.series[0].data);
    let cList = [];
    let vList = [];
    valueList.forEach((val, index) => {
        if (val) {
          vList.push(val);
          cList.push(colorList[index]);
        }
      });
    let ring = new Ring(radisAndRingwidth.radius, radisAndRingwidth.lineWidth, '#eeeeee', cList, options.series[0].capType);
    ring.drawRing(this.context, 2 * Math.PI / vList.length, vList, this.width / 2, this.height / 2);
};

const charts = new Charts();
export default charts;
