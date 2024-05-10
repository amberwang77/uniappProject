import XtxSwiper from './XtxSwiper.vue'
import XtxGuess from '@/components/XtxGuess.vue'

declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}

// 首页 猜你喜欢组件实例的类型
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
