<template>
  <div id="app">
    <div class="menu-wrap">
      <el-menu :default-active="currentNav"
               @select="onMenuSelect"
               background-color="#545c64"
               text-color="#eee"
               active-text-color="#ffd04b"
               mode="horizontal">
        <el-menu-item v-for="nav in navList"
                      :index="nav.path"
                      :key="nav.path">{{ nav.name }}</el-menu-item>
      </el-menu>
    </div>
    <router-view v-if="!loading"></router-view>
  </div>
</template>

<script>
import baseMixin from '@/mixin'

export default {
  name: 'App',
  mixins: [
    baseMixin
  ],
  components: {},
  data () {
    return {
      loading: true,
      currentNav: '',
      navList: [
        {
          name: '碎片列表',
          path: 'heroList',
        },
        {
          name: '御魂列表',
          path: 'equipList',
        },
        {
          name: '御魂分析',
          path: 'equipAnalysis'
        },
        {
          name: '用户数据',
          path: 'userData',
        },
        {
          name: '关于',
          path: 'aboutThis'
        }
      ]
    }
  },
  created () {
    this.$store.dispatch('getAllHeroData')
    this.$store.dispatch('getEquipData')
    this.getUserData().then(userList => {
      if (userList.length < 1) {
        this.loading = false
        this.onMenuSelect('userData')
        this.currentNav = 'userData'
        return
      }
      this.loading = false
      for (let item of this.navList) {
        if (this.$route.fullPath.indexOf(item.path) !== -1) {
          this.currentNav = item.path
        }
      }
    })
  },
  mounted () {
  },
  methods: {
    onMenuSelect (path) {
      if (this.$route.fullPath.indexOf(path) === -1) {
        this.$router.replace(`/${path}`)
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  width: 100%;
  position: relative;
}

.menu-wrap {
  padding: 0 calc((100% - 1600px) / 2);
  background-color: #545c64;
  margin-bottom: 10px;
}
</style>
