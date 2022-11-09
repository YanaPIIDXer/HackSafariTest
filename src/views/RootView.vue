<script setup lang="ts">
/**
 * 許すまじボタンが押された
 */
const onClickYurusumaji = () => {
  alert("アップル許すまじ")
}
</script>

<template lang="pug">
div
  .root
    .message アップル許すまじ
    PrimeButton(@click="onClickYurusumaji") 許すまじ
</template>

<style lang="sass" scoped>
.root
  text-align: center
  
  .message
    font-size: 64px
</style>
