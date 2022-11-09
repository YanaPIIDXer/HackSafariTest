import { createRouter, createWebHistory } from "vue-router"

export const routePaths = {
  root: "/",
}

const routes = [
  { name: "root", path: routePaths.root, component: () => import("@/views/RootView.vue") },
]

export const tabItems = routes.map(route => {
  return { label: route.name, to: route.path }
})

const option = {
  history: createWebHistory(),
  routes,
}

export default createRouter(option)
