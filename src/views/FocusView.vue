<script setup lang="ts">
/**
 *        ～このViewで取り扱う問題～
 * 特定の要素にフォーカスを移すためのfocusメソッドが、
 * Safariだと特定のイベント内でないと機能しない
 * 
 *             ～問題の設定～
 *    特定の要素をダブルクリックした時に
 *    特定の要素に対してフォーカスを合わせる
 *    ※dblclickイベント内ではfocus使用不可
 */

import { ref, type Ref, nextTick } from "vue"

const inputRef: Ref<HTMLInputElement | undefined> = ref()

/**
 * ダブルクリックされた
 */
const onDoubleClick = async () => {
  if (!inputRef.value) { return }
  
  /**
   * Safariでの挙動：フォーカスは合うが、ソフトウェアキーボードが表示されない
   */
  inputRef.value.focus()
}
</script>

<template lang="pug">
div
  .root
    .title ダブルクリックによるfocus()実行
    .target
      input(ref="inputRef" type="text")
    .area(@dblclick="onDoubleClick") dblclick
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
