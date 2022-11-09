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
</script>

<template lang="pug">
div
  .root
    .title ダブルクリックによるfocus()実行
</template>

<style lang="sass" scoped>
.root
  .title
    text-align: center
    font-size: 18px
</style>
