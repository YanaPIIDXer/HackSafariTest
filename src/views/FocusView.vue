<script setup lang="ts">
/**
 * ～このViewで取り扱う問題～
 * 特定の要素にフォーカスを移すためのfocusメソッドが、
 * Safariだと特定のイベント内でないと機能しない
 * 
 * ～問題の設定～
 * 特定の要素をダブルクリックした時に
 * 特定の要素に対してフォーカスを合わせる
 * ※dblclickイベント内ではfocus使用不可
 * 
 * ～調査内容～
 * ・厳密には、フォーカス自体は合っている
 * ・ソフトウェアキーボードが表示されないだけ
 * ・その為、iOS等のスマホ・タブレット端末限定の問題となる
 */

import { ref } from "vue"
import type { Ref } from "vue"

const inputRef: Ref<HTMLInputElement | undefined> = ref()
const isDisplay = ref(false)

/**
 * フォーカスを合わせる
 */
const focus = async () => {
  if (!inputRef.value) { return }

  isDisplay.value = true
  inputRef.value.focus()
}

/**
 * dblclickイベントを使わないダブルクリック
 * 賢い実装
 */
const smartImplementDoubleclick = (e: Event) => {
  e.target?.addEventListener("click", focus)
  setTimeout(() => {
    e.target?.removeEventListener("click", focus)
  }, 250)
}
</script>

<template lang="pug">
div
  .root
    .title ダブルクリックによるfocus()実行
    svg(width="100" height="100")
      foreignObject(width="100" height="100")
        textarea(ref="inputRef" width="100" height="100" @focusout="isDisplay = false")
      rect(x="0" y="0" width="100" height="100" style="background: #000000" :style="{ display: !isDisplay ? 'inline' : 'none' }")
    .area(@dblclick="focus") dblclick: フォーカスは合うがソフトウェアキーボードが表示されない
    .area(@click="focus") click: フォーカスが合い、ソフトウェアキーボードが表示される
    .area(@click="smartImplementDoubleclick") clickイベント2回発火によるダブルクリック（スマート実装）: フォーカスが合い、ソフトウェアキーボードが表示される
</template>

<style lang="sass" scoped>
.root
  width: 100%
  height: 100%
  
  .title
    text-align: center
    font-size: 18px

  .area
    width: 95vw
    height: 150px
    margin: auto
    text-align: center
    border: 1px solid #000000
    user-select: none
</style>
