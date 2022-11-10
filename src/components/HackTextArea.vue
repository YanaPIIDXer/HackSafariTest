<script setup lang="ts">
import { ref } from "vue"
import type { Ref } from "vue"

const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: "",
  }
})

const mainRef: Ref<HTMLTextAreaElement | undefined> = ref()
const triggerRef: Ref<HTMLTextAreaElement | undefined> = ref()
</script>

<template lang="pug">
span
  span.root
    textarea.main(ref="mainRef" :placeholder="props.placeholder")
    textarea.trigger(ref="triggerRef" :placeholder="props.placeholder")
</template>

<style lang="sass" scoped>
.root
  position: relative
  
  textarea
    resize: none
    position: absolute
    left: 0
    top: 0

  .main
    z-index: 0
    
  .trigger
    z-index: 1
    position: fixed
    left: 0
    top: 0
    touch-action: none
    opacity: 0
    cursor: default
    
    &.active
      touch-action: auto
      opacity: 1
      cursor: auto
      position: absolute
</style>