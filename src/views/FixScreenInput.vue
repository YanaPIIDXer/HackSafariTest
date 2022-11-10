<script setup lang="ts">
/**
 * ～このViewで取り扱う問題～
 * テキストフォームにフォーカスを当てた時に走る
 * 画面のスクロールやズームを抑制する
 */

</script>

<template lang="pug">
div
  .root
    .title inputにフォーカスを当てた時のスクロール・ズームを抑制
    PrimeButton フォーカスを外す
    textarea.rawInput(style="left: 300px; top: 400px" placeholder="スクロールもズームも発生する")
</template>

<style lang="sass" scoped>
.root
  width: 100%
  height: 100%
  position: relative
  
  .title
    text-align: center
    font-size: 18px

  .rawInput
    position: absolute
    resize: none
    font-size: 24px
</style>
