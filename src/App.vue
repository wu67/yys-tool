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

<script lnag="ts">
export default defineComponent({
  name: 'App',
})
</script>

<script lnag="ts" setup>
import { defineComponent, ref } from 'vue'
import useCommon from './useCommon'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ElConfigProvider, ElMenu, ElMenuItem } from 'element-plus'

const { getUserData } = useCommon()
const $store = useStore()
const $route = useRoute()
const $router = useRouter()

const currentNav = ref('')
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

$store.dispatch('getAllHeroData')
$store.dispatch('getEquipData')

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
    navList.value.forEach((item) => {
      if ($route.fullPath.indexOf(item.path) !== -1) {
        currentNav.value = item.path
      }
    })
  }, 500)
})

const onMenuSelect = (path) => {
  if ($route.fullPath.indexOf(path) === -1) {
    $router.replace(`/${path}`)
  }
}

const locale = ref(zhCn)
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  width: 100%;
  min-width: 1600px;
  position: relative;
}
</style>

<style lang="scss" scoped>
@import '@/assets/css/flex-custom.scss';
@import '@/assets/css/border-box.scss';
.menu-wrap {
  padding: 0 calc((100% - 1600px) / 2);
  background-color: #545c64;
  margin-bottom: 10px;
  width: 100%;
}
</style>
