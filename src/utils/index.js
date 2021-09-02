 
 /**
  * 继承属性公用方法
  * @param {*} subType 子类
  * @param {*} superType 父类
  */
 export function inheritPrototype(subType, superType){ 
    let prototype = Object.create(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 指定对象
}