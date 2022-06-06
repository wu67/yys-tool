/* eslint-disable */

/**
 * 御魂(装备)原型. 仅含最基本的信息, 是对御魂类型本身的描述.
 **/
export interface IEquipTypePrototype {
  id: number
  name: string
  /**
   * 有效属性. 作者根据目前版本的理解自行定义的. 位于assets/equip.json
   */
  effectiveAttr: string[]
}

/**
 * 御魂单条属性的原型定义.
 */
export interface IEquipAttrPrototype {
  /**
   * 御魂属性英文名
   */
  key: string
  /**
   * 御魂属性名
   */
  name: string
  /**
   * 御魂属性简称
   */
  nick: string
  /**
   * 最小成长值
   */
  minStep?: number
  /**
   * 平均数成长值
   */
  avgStep?: number
  /**
   * 最高成长值
   */
  maxStep?: number
}

/**
 * 御魂数据结构. 导出的原始数据, 未经处理的.
 **/
export interface IEquip {
  id: string
  suit_id: number
  quality: number
  pos: number
  equip_id?: number
  level: number
  born: number
  lock?: boolean
  garbage?: boolean
  base_attr: IEquipAttr
  random_attrs: IEquipAttr[]
  random_attr_rates?: IEquipAttr[]
  single_attrs: IEquipAttr[]
  timestamp_from_id?: number
  random_attr_map?: Map<EquipAttrEnum, number>
}

/**
 * 经过处理后的御魂数据结构
 */
export interface IEquipCustom extends IEquip {
  effectAttrCount: number
  randomAttrsLength?: number
  mainAttr: {
    type: string
    value: number
  }
}

export type SubAttr = {
  // eslint-disable-next-line
  [k in EquipAttrEnum]?: number
}
export interface IEquipAttr {
  type: EquipAttrEnum
  value: number
}

/**
 * 御魂属性枚举
 */
export enum EquipAttrEnum {
  Hp = 'Hp',
  Defense = 'Defense',
  Attack = 'Attack',
  HpRate = 'HpRate',
  DefenseRate = 'DefenseRate',
  AttackRate = 'AttackRate',
  Speed = 'Speed',
  CritRate = 'CritRate',
  CritPower = 'CritPower',
  EffectHitRate = 'EffectHitRate',
  EffectResistRate = 'EffectResistRate',
}

/**
 * 式神基础数据
 */
export interface IBaseHero {
  id: number
  name: string
  /**
   * 稀有度: SP SSR SR R N MATERIAL(素材)
   */
  rarity: string
  /**
   * 是否联动式神
   */
  interactive?: boolean
}

/**
 * 经处理过的式神数据
 */
export interface IHero extends IBaseHero {
  shards: number[]
  /**
   * 收录状态. 用户手动维护的额外数据(未收录id), 导出器和痒痒熊导出的数据无法判断是否为已收录, 只能判断当前仓库中有没有该卡.
   */
  included: string[]
  /**
   * 当前 式神录/仓库 中是否存在该卡
   */
  have: string[]
  /**
   * 需求量。所有账号共计
   */
  required: number | string
  /**
   * 持有量。所有账号共计
   */
  holdings: number
  /** 
   * 召唤所需数量 
   **/
  bookMaxShards: number
}

/**
 * 单个用户数据的持有碎片数组 中的 数据项结构. 痒痒熊导出数据的部分结构
 */
export interface hero_book_shards {
  book_max_shards: number
  books: number
  hero_id: number
  shards: number
}
