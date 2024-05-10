<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
// 自定义组件
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
// 请求API
import { getHomeBannerAPI, getHomeCategoryMutliAPI, getHomeHotMutliAPI } from '@/services/home'
// 类型
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'

//获取首页轮播图列表
const bannerList = ref<BannerItem[]>([])
// 向后端请求数据，返回的结果保存到bannerList
const getBannerList = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
// 获取首页分类列表
const categoryList = ref<CategoryItem[]>([])
const getCategoryList = async () => {
  const res = await getHomeCategoryMutliAPI()
  categoryList.value = res.result
}
// 获取首页热门推荐
const hotList = ref<HotItem[]>([])
const getHotList = async () => {
  const res = await getHomeHotMutliAPI()
  hotList.value = res.result
}

// 页面上拉触底，调用（猜你喜欢）子组件的函数
const guessRef = ref<XtxGuessInstance>()
const onScrolltolower = () => {
  guessRef.value?.getMore()
}

// 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
const isTriggered = ref(false)
// 页面下拉刷新
const onRefresh = async () => {
  isTriggered.value = true
  guessRef.value?.resetList()
  await Promise.all([getBannerList(), getCategoryList(), getHotList(), guessRef.value?.getMore()])
  isTriggered.value = false
}

// 正在加载数据，显示骨架屏
const isLoading = ref(false)

onLoad(async () => {
  isLoading.value = true
  await Promise.all([getBannerList(), getCategoryList(), getHotList()])
  isLoading.value = false
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />

  <scroll-view
    scroll-y
    class="scroll-view"
    @scrolltolower="onScrolltolower"
    refresher-enabled
    @refresherrefresh="onRefresh"
    :refresher-triggered="isTriggered"
  >
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading" />
    <!-- 实际页面内容 -->
    <template v-else>
      <!-- 自定义轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 首页分类 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>
