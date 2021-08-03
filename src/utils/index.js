import NZHCN from 'nzh/cn'
import mathjs from '@/utils/mathjs'

export default {
  transNumberToChinese (num) {
    return NZHCN.encodeS(num)
  },
  multiply (value, ratio = 100) {
    return parseFloat(mathjs.chain(value).multiply(ratio).done().toPrecision(12))
  },
  // 计算单个御魂中某个属性的总值
  getAttrSum (equip, attrName) {
    let sum = 0
    sum += equip[`${attrName}`] || 0

    // 主属性
    if (equip.mainAttr.type === attrName) {
      sum = sum + equip.mainAttr.value
    }
    // （首领魂）固定属性
    if (equip.single_attrs.length > 0 && equip.single_attrs[0].type === attrName) {
      sum = sum + equip.single_attrs[0].value
    }
    return sum
  },
}
