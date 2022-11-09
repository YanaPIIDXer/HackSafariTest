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
 * ・documentをwindowに切り替えるとよい
 * ・と言うかそもそもダブルタップによるズーム自体起きていない気がする
 * 　（ズーム状態でダブルタップするとズームアウトはするが、ピンチ操作によるズーム処理も同じく抑制しているので、結果的にこの処理自体そもそも必要なし）
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
 * ダブルタップによるズームを抑制
 * ※諸悪の根源
 */
const ignoreDoubleTap = (e: Event) => {
  e.preventDefault()
}

onMounted(() => {
  // ↓死ぬ
  //document.addEventListener("dblclick", ignoreDoubleTap)
  // ↓OK
  window.addEventListener("dblclick", ignoreDoubleTap)
})
onBeforeUnmount(() => {
  //document.removeEventListener("dblclick", ignoreDoubleTap)
  window.removeEventListener("dblclick", ignoreDoubleTap)
})
</script>

<template lang="pug">
div
  .root
    .title ダブルクリックによるfocus()実行
    .target
      input(ref="inputRef" type="text")
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
