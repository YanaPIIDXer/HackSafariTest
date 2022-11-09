import { createRouter, createWebHistory } from "vue-router"

export const routePaths = {
  root: "/",
  focus: "/focus",
}

const routes = [
  { name: "root", path: routePaths.root, component: () => import("@/views/RootView.vue") },
  { name: "focus", path: routePaths.focus, component: () => import("@/views/FocusView.vue") },
]

export const tabItems = routes.map(route => {
  return { label: route.name, to: route.path }
})

const option = {
  history: createWebHistory(),
  routes,
}

export default createRouter(option)
