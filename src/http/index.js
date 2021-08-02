import instance from './config'

const baseAPI  = {
  getAllHeroName: p => instance({
    method: 'get',
    url: `/app/all_shishen.json?t=12345f`,
    params: p
  }),
  getHeroAttr: p => instance({
    method: 'get',
    url: `/g37/get_hero_attr`,
    headers: {
      'content-type': 'text/javascript; charset=utf-8'
    },
    params: p
  })
}
// https://g37simulator.webapp.163.com/get_hero_attr?heroid=200&awake=0&level=1&star=2&_=1626421496657&callback=jsonp3

// 全部
// https://g37simulator.webapp.163.com/get_heroid_list?rarity=0&page=1&per_page=200&callback=jsonp23

// sp
// https://g37simulator.webapp.163.com/get_heroid_list?rarity=5&interactive=0&material_type=0&page=1&per_page=200&name=&_=1626674357621&callback=jsonp17

// ssr
// https://g37simulator.webapp.163.com/get_heroid_list?rarity=4&interactive=0&material_type=0&page=1&per_page=200&name=&_=1626674378285&callback=jsonp18

// sr
// https://g37simulator.webapp.163.com/get_heroid_list?rarity=3&interactive=0&material_type=0&page=1&per_page=200&name=&_=1626674399019&callback=jsonp19

// r
// https://g37simulator.webapp.163.com/get_heroid_list?rarity=2&interactive=0&material_type=0&page=1&per_page=200&name=&_=1626674411025&callback=jsonp20

// n
// https://g37simulator.webapp.163.com/get_heroid_list?rarity=1&interactive=0&material_type=0&page=1&per_page=200&name=&_=1626674426152&callback=jsonp21

// 呱
// https://g37simulator.webapp.163.com/get_heroid_list?rarity=0&interactive=0&material_type=101&page=1&per_page=200&name=&_=1626674442029&callback=jsonp22

// 联动
// https://g37simulator.webapp.163.com/get_heroid_list?rarity=0&interactive=1&material_type=0&page=1&per_page=200&name=&_=1626674276219&callback=jsonp16
export default baseAPI
