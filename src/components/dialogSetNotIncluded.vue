<template>
  <div class="dialogSetNotIncluded">
    <el-dialog
      :title="`设置未收录 - ${userName}`"
      :visible.sync="dialogVisible"
      width="650px"
      :before-close="beforeClose"
    >
      <el-transfer
        style="margin: 0 auto;"
        v-model="checkedData"
        :data="allData"
        :titles="['已收录', '未收录']"
        filterable
      ></el-transfer>
      <div class="flex center">
        <el-button type="primary" @click="save">保存</el-button>
      </div>

    </el-dialog>
  </div>
</template>

// 对话框 设置未收录
<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'dialogSetNotIncluded',
  mixins: [],
  components: {},
  filters: {},
  props: {
    notIncluded: {
      type: Array,
      default: () => { return [] }
    },
    userName: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      allData: [],
      checkedData: [],
      dialogVisible: false
    }
  },
  computed: {
    ...mapState([
      'allHeroList'
    ])
  },
  watch: {},
  created () {
    this.dialogVisible = true
    this.checkedData = JSON.parse(JSON.stringify(this.notIncluded)).map(item => `${item}`)
    this.allData = this.allHeroList.map(hero => {
      return {
        key: hero.id,
        label: hero.name
      }
    })
  },
  mounted () {},
  updated () {},
  beforeDestroy () {},
  methods: {
    beforeClose () {
      this.$emit('update:show', false)
    },
    save () {
      this.$emit('change-not-included', this.checkedData.map(item => parseInt(item)))
      this.dialogVisible = false
      this.beforeClose()
    }
  }
}
</script>

<style lang="scss">
.dialogSetNotIncluded {
  $transferPanelHeight: 350px;

  .el-transfer-panel__body {
    height: $transferPanelHeight;
  }

  .el-transfer-panel__list.is-filterable {
    height: $transferPanelHeight - 62px;
  }
}
</style>

<style lang="scss"
       scoped>
@import "~@/assets/css/flex-custom.scss";
.dialogSetNotIncluded {
}
</style>
