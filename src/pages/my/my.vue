<!-- <script setup lang="ts">
import { useMemberStore } from '@/stores'
const memberStore = useMemberStore()
import { http } from '@/utils/http'

const requestData = async () => {
  const res = await http({
    method: 'GET',
    url: '/home/banner',
    header: {}
  })
  console.log('请求成功' + res.result)
}
const requestData1 = async () => {
  try {
    const res1 = await http({
      method: 'GET',
      url: '/member/address'
      // url: '/hhhh/address'
    })
  } catch (error) {
    console.log('没有用户信息，要登录')
  }

}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button @tap="
      memberStore.setProfile({
        nickname: '黑马先锋',
        token: 'GGGGGGGGGGGGGGGGGGGG'
      })
      " size="mini" plain type="primary">
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="requestData()" size="mini" plain type="primary">测试请求</button>
    <button @tap="requestData1()" size="mini" plain type="primary">测试请求1</button>

  </view>
</template>

<style lang="scss">
</style> -->

<template>
  <view>
    <button @click="open">打开弹窗</button>
    <uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0"
      >底部弹出 Popup 自定义圆角</uni-popup
    >
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const popup = ref()
const open = () => {
  popup.value.open()
}
</script>
