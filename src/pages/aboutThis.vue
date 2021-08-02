<template>
  <div class="page-about">
    <h2>关于此工具yys-tool</h2>
    <p>本工具部署于GitHub，开发的初衷只是方便自己统计多个游戏角色下的碎片，以及看一下御魂的小数点。后续可能会增加其他功能，但不保证。</p>
    <p style="font-weight: 600;">有用自取，但请勿用于商业用途，本人不对因使用本工具 与 网易或其他公司 造成的商业纠纷 负责</p>
    <p>郑重承诺，本工具不会上传你的御魂数据到任何远程/服务器/云等，所有数据均存在你自己浏览器的存储区中，不想用了直接浏览器F12在控制台清空本地对应域名下所有数据就行。（因此使用浏览器的隐私/私密模式的话大概率会无法正常使用）</p>
    <p>目前暂时仅支持最后一版的<a href="https://github.com/OnmyojiX/yyx-snapshot/releases">痒痒熊快照</a>导出的御魂数据。不支持 <a
      href="https://bbs.nga.cn/read.php?tid=23251576">'御魂导出器'</a>则是因为我的其中一个账号角色用它导出会出现数据错误，并且它只能导出御魂和预设，无法导出仓库式神数据，这会导致碎片统计无法使用。除非后续火电大佬更新御魂导出器的导出数据范围，不然后续都 不会 考虑兼容'御魂导出器'。</p>
    <br>
    <p>使用方法：导出你的御魂数据 <a href="https://bbs.nga.cn/read.php?tid=16557282">相关页面1</a> <a
      href="https://bbs.nga.cn/read.php?tid=23251576">相关页面2</a>， 然后在'用户数据'页面'新增'， 在弹窗中选择你刚才导出的json数据，确定即可。</p>
    <br>
    <p>注：部分原始数据来源于阴阳师官网，部分逻辑参考了痒痒熊，部分界面样式（御魂数据页）参考了御魂hub</p>

    <p>使用中发现有bug可以到 <a href="https://github.com/wu67/yys-tool/issues">此处</a> 反馈，但不接受任何角度的指责，因为此工具只是本人在用爱发电，谁也没给本人发工资</p>
  </div>
</template>

<script>
export default {
  name: 'aboutThis',
  mixins: [],
  components: {},
  filters: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  updated () {},
  beforeDestroy () {},
  methods: {}
}
</script>

<style lang="scss"
       scoped>
.page-about {
  padding: 10px 40px 20px;
  height: 100%;
  width: 1600px;
  margin: 0 auto;
}

a {
  color: #1890ff;
}
</style>
