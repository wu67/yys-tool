<template>
  <div class="dialogSetNotIncluded">
    <el-dialog
      v-model="dialogVisible"
      :title="`设置未收录 - ${userName}`"
      width="650px"
      :before-close="handleClose"
    >
      <el-transfer
        v-model="checkedData"
        style="margin: 0 auto"
        :data="allData"
        :titles="['已收录', '未收录']"
        filterable
      />
      <div class="flex center">
        <el-button
          type="primary"
          @click="save"
        >
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

// 对话框 设置未收录
<script>
export default defineComponent({
  name: 'DialogSetNotIncluded',
})
</script>
<script setup>
import { defineComponent, ref, watchEffect, unref } from 'vue'
import { ElButton, ElDialog, ElTransfer } from 'element-plus'

const props = defineProps({
  notIncluded: {
    type: Array,
    default() {
      return []
    },
  },
  allHeroList: {
    type: Array,
    default() {
      return []
    },
  },
  userName: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'change-not-included'])

const allData = unref(props.allHeroList).map((hero) => {
  return {
    key: hero.id,
    label: hero.name,
  }
})

const userName = ref(props.userName.value)
const handleClose = function (done) {
  emit('update:modelValue', false)
  if (typeof done === 'function') {
    done()
  }
}

const checkedData = ref(props.notIncluded)
const dialogVisible = ref(false)

watchEffect(() => {
  dialogVisible.value = props.modelValue
})

const save = () => {
  emit(
    'change-not-included',
    unref(checkedData).map((item) => parseInt(item)),
  )
  handleClose()
  dialogVisible.value = false
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
<style lang="scss" scoped>
@import '@/assets/css/flex-custom.scss';
@import '@/assets/css/border-box.scss';
</style>
