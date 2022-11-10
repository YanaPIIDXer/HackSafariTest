<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import type { Ref } from "vue"

const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  fontSize: {
    type: Number,
    required: false,
    defualt: 16,
  },
})

const mainRef: Ref<HTMLTextAreaElement | undefined> = ref()
const triggerRef: Ref<HTMLTextAreaElement | undefined> = ref()

const isActive = ref(false)

onMounted(() => {
  if (!mainRef.value || !triggerRef.value) { return }

  triggerRef.value.addEventListener("focus", () => {
    mainRef.value?.focus()
  })
  mainRef.value.addEventListener("focusin", () => {
    setTimeout(() => {
      isActive.value = true
    }, 0)
  })
  mainRef.value.addEventListener("focusout", () => {
    isActive.value = false
  })
  mainRef.value.addEventListener("input", () => {
    if (!triggerRef.value || !mainRef.value) { return }
    
    triggerRef.value.value = mainRef.value.value
  })
})
</script>

<template lang="pug">
span
  span.root
    textarea.main(ref="mainRef" :style="{ fontSize: `${props.fontSize}px` }" :placeholder="props.placeholder" :class="{ active: isActive, deactive: !isActive }")
    textarea.trigger(ref="triggerRef" :style="{ fontSize: `${props.fontSize}px` }" :placeholder="props.placeholder")
</template>

<style lang="sass" scoped>
.root
  position: relative
  
  textarea
    resize: none
    position: absolute
    left: 0
    top: 0

  .trigger
    z-index: 0
    
  .main
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
    
    &.deactive
      font-size: 16
</style>