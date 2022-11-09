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
 * ・基本的にはclickイベント等focusが機能するイベントさえ介していれば正常動作する
 * 　が、documentのdblclickイベントをpreventDefaultしてダブルクリックによるズームを封印する処理を入れていたら問題が起こる（職場がコレ）
 *   と言うよりpreventDefaultは関係なく、documentのdblclickイベントに何かしらトリガーしてたらアウト。
 * 
 * ～結論～
 * document.dblclickに何かをトリガーしたらダメ
 */

import { ref, onMounted, onBeforeUnmount } from "vue"
import type { Ref } from "vue"

const inputRef: Ref<HTMLInputElement | undefined> = ref()

/**
 * フォーカスを合わせる
 */
const focus = async () => {
  if (!inputRef.value) { return }
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

/**
 * dblclickイベントを使わないダブルクリック
 * 愚直な実装
 */
let flg = false
const dirtyImplementDoubleClick = () => {
  if (flg) {
    focus()
    flg = false
    return
  }
  flg = true
  setTimeout(() => { flg = false}, 250)
}

/**
 * ダブルタップによるズームを抑制
 * ※諸悪の根源
 */
const ignoreDoubleTap = (e: Event) => {
  e.preventDefault()
}

onMounted(() => {
  document.addEventListener("dblclick", ignoreDoubleTap, { passive: false })
})
onBeforeUnmount(() => {
  document.removeEventListener("dblclick", ignoreDoubleTap)
})
</script>

<template lang="pug">
div
  .root
    .title ダブルクリックによるfocus()実行
    .target
      input(ref="inputRef" type="text")
    .scaleArea ここをダブルタップすると拡大する<br />ここをダブルタップすると拡大する<br />ここをダブルタップすると拡大する<br />ここをダブルタップすると拡大する<br />ここをダブルタップすると拡大する<br />ここをダブルタップすると拡大する<br />ここをダブルタップすると拡大する<br />ここをダブルタップすると拡大する<br />ここをダブルタップすると拡大する<br />ここをダブルタップすると拡大する<br />
    .area(@dblclick="focus") dblclick
    .area(@click="focus") click
    .area(@click="smartImplementDoubleclick") clickイベント2回発火によるダブルクリック（スマート実装）
    .area(@click="dirtyImplementDoubleClick") clickイベント2回発火によるダブルクリック（愚直実装）
</template>

<style lang="sass" scoped>
.root
  width: 100%
  height: 100%
  
  .title
    text-align: center
    font-size: 18px

  .scaleArea
    width: 256px
    height: 256px
    background: #FF00FF

  .target
    width: fit-content
    margin: 0 auto

  .area
    width: 95vw
    height: 150px
    margin: auto
    text-align: center
    border: 1px solid #000000
    user-select: none
</style>
