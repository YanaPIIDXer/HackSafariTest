<script setup lang="ts">
/**
 * ～このViewで取り扱う問題～
 * ソフトウェアキーボードの開閉によってレイアウトが崩れる事がある
 * 
 * ～発生している現象～
 * ・heightをvh単位で設定していると、ソフトウェアキーボードが出てきた時に1vh毎のサイズに変動が生じ（？）、スクロールが走る
 * 　→vhの高さが変動する？
 * ・ソフトウェアキーボードが消えても1vh毎のサイズは元には戻らないし、スクロールで元に戻る事もない
 * ・この時touchmoveでpreventDefaultしてスワイプによるスクロールを抑制していると、当然画面外に飛んだ要素は帰ってこなくなる
 * 
 * ～結論～
 * そもそもvhなんか使うな
 */
import { ref, onMounted, onBeforeUnmount } from "vue"

const width = ref(100)
const height = ref(100)

/**
 * リサイズされた
 */
const onResize = () => {
  width.value = window.innerWidth * 0.3
  height.value = window.innerHeight * 0.3
}

/**
 * 自動フォーカスアウト
 */
const autoFocusOut = (e: Event) => {
  setTimeout(() => {
    const target = e.target as HTMLElement
    target.blur()
  }, 1000)
}

const ignoreEvent = (e: Event) => {
  e.preventDefault()
}

onMounted(() => {
  window.addEventListener("resize", onResize)
  document.addEventListener("dblclick", ignoreEvent)
  onResize()
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize)
  document.removeEventListener("dblclick", ignoreEvent)
})
</script>

<template lang="pug">
div
  .root(@touchmove="ignoreEvent")
    .title ソフトウェアキーボードがレイアウトを壊す
    .target(:style="{ width: `${width}px`, height: `${height}px` }")
    textarea.textarea(@focus="autoFocusOut")
</template>

<style lang="sass" scoped>
.root
  position: absolute
  width: 100vw
  height: 100vh
  
  .title
    text-align: center
    font-size: 18px

  .target
    background: #000000
    margin: 0 auto

  .textarea
    width: 100%
    font-size: 17px
</style>
