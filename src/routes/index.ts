import { createRouter, createWebHistory } from "vue-router"

export const routePaths = {
  root: "/",
}

const routes = [
  { name: "root", path: routePaths.root, component: () => import("@/views/RootView.vue") },
]

const option = {
  history: createWebHistory(),
  routes,
}

export default createRouter(option)
