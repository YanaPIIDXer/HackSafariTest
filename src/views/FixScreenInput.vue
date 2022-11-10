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
</template>

<style lang="sass" scoped>
.root
  width: 100%
  height: 100%
  
  .title
    text-align: center
    font-size: 18px
</style>
