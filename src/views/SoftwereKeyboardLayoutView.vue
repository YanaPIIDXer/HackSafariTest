<script setup lang="ts">
/**
 * ～このViewで取り扱う問題～
 * ソフトウェアキーボードの開閉によってレイアウトが崩れる事がある
 * 
 * ～問題の設定～
 * 再現条件調査中
 */
import { onMounted, onBeforeUnmount } from "vue"

/**
 * リサイズされた
 */
const onResize = () => {
}

onMounted(() => {
  window.addEventListener("resize", onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize)
})
</script>

<template lang="pug">
div
  .root
    .title ソフトウェアキーボードがレイアウトを壊す
</template>

<style lang="sass" scoped>
.root
  width: 100%
  height: 100%
  
  .title
    text-align: center
    font-size: 18px
</style>
