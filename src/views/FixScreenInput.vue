<script setup lang="ts">
/**
 * ～このViewで取り扱う問題～
 * テキストフォームにフォーカスを当てた時に走る
 * 画面のスクロールやズームを抑制する
 * 
 * ～解決のヒント～
 * ・ズームはフォントサイズ16pxを境にイン・アウトする
 * ・スクロールはフォーカスがあった要素を中心に捉えようとする
 * ・インプットを２つ用意し、一つは見た目用で普通にCSSを当てておく
 * ・もう片方は実入力用で、見た目用の方にフォーカスが当たるまでは見えないようにして「font-size: 16pxとし、画面左上に」位置させる
 * ・見た目用の方にフォーカスが当たったら、すぐに実入力用の方にフォーカスを差し替える
 * ・次のフレーム（setTimeoutの第二引数を0としたコールバック処理の中）で、CSSを見た目用のものと同一にした上で見た目用の方に被せる形で表示する
 * ・実入力用に対する入力はすべて見た目用の方にも転記する
 * ・フォーカスが外れた時に実入力用のインプットは元に戻す
 * 
 * ～結論～
 * 上記説明だと分かりづらいと思うのでHackTextAreaの実装を確認のこと
 */
import HackTextArea from "@/components/HackTextArea.vue"
</script>

<template lang="pug">
div
  .root
    .title inputにフォーカスを当てた時のスクロール・ズームを抑制
    PrimeButton フォーカスを外す
    textarea.rawInput(style="left: 200px; top: 400px" placeholder="スクロールもズームも発生する")
    HackTextArea.hackInput(style="left: 350px; top: 200px" placeholder="画面固定" :font-size="24")
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

  .hackInput
    position: absolute
</style>
