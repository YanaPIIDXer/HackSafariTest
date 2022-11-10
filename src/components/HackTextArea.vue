<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: "",
  }
})
</script>

<template lang="pug">
span
  span.root
    textarea.main(ref="mainRef" :placeholder="props.placeholder")
    textarea.trigger(ref="triggerRef" :placeholder="props.placeholder")
</template>

<style lang="sass" scoped>
.root
  textarea
    resize: none
</style>