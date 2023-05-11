<template>
  <el-config-provider :locale="locale">
    <div class="menu-wrap">
      <el-menu
        :default-active="currentNav"
        background-color="#545c64"
        active-text-color="#ffd04b"
        text-color="#eee"
        mode="horizontal"
        @select="onMenuSelect"
      >
        <el-menu-item
          v-for="nav in navList"
          :key="nav.path"
          :index="nav.path"
        >
          {{ nav.name }}
        </el-menu-item>
      </el-menu>
    </div>
    <router-view v-if="!loading" />
  </el-config-provider>
</template>

<script lang="ts">
export default defineComponent({
  name: 'App',
})
</script>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import useCommon from './useCommon'
import { useRoute, useRouter } from 'vue-router'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ElConfigProvider, ElMenu, ElMenuItem, ElMessage } from 'element-plus'
import { useIndexStore } from './stores'
const { getUserData } = useCommon()
const $indexStore = useIndexStore()
const $route = useRoute()
const $router = useRouter()

const currentNav = ref('')

interface iNavItem {
  name: string
  path: string
}

const navList = ref([
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
    path: 'equipAnalysis',
  },
  {
    name: '用户数据',
    path: 'userData',
  },
  {
    name: '关于',
    path: 'aboutThis',
  },
])

$indexStore.getAllHeroData()
$indexStore.getEquipData()

const loading = ref(true)
getUserData().then((userList) => {
  if (userList.length < 1 && $route.fullPath.indexOf('aboutThis') === -1) {
    loading.value = false
    onMenuSelect('userData')
    currentNav.value = 'userData'
    return
  }

  loading.value = false

  setTimeout(() => {
    navList.value.forEach((item: iNavItem) => {
      if ($route.fullPath.indexOf(item.path) !== -1) {
        currentNav.value = item.path
      }
    })
  }, 500)
})

const onMenuSelect = (path: string) => {
  getUserData().then((userList) => {
    if (userList.length < 1 && ['aboutThis', 'userData'].indexOf(path) === -1) {
      ElMessage.info('未读取到游戏数据')
    } else if ($route.fullPath.indexOf(path) === -1) {
      $router.replace(`/${path}`)
    }
  })
}

const locale = ref(zhCn)
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '\5fae\8f6f\96c5\9ed1', Arial, sans-serif;
}

#app {
  height: 100%;
  width: 100%;
  min-width: 1600px;
  position: relative;
}
</style>

<style lang="scss" scoped>
.menu-wrap {
  padding: 0 calc((100% - 1600px) / 2);
  background-color: #545c64;
  margin-bottom: 10px;
  width: 100%;
}
</style>
