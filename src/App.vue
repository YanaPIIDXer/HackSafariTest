<script setup lang="ts">
import { tabItems } from "./routes"
import TabMenu from "primevue/tabmenu"
</script>

<template lang="pug">
.root
  TabMenu(:model="tabItems")
  h1.title Hack Safari Test
  router-view
</template>

<style lang="sass" scoped>
.root
  .title
    text-align: center
</style>
