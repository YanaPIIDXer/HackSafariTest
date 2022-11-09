import { createRouter, createWebHistory } from "vue-router"

export const routePaths = {
  root: "/",
  focus: "/focus",
  softwareKeyboardLayout: "/keyboard_layout",
}

const routes = [
  { name: "root", path: routePaths.root, component: () => import("@/views/RootView.vue") },
  { name: "focus", path: routePaths.focus, component: () => import("@/views/FocusView.vue") },
  { name: "layout", path: routePaths.softwareKeyboardLayout, component: () => import("@/views/SoftwereKeyboardLayoutView.vue") },
]

export const tabItems = routes.map(route => {
  return { label: route.name, to: route.path }
})

const option = {
  history: createWebHistory(),
  routes,
}

export default createRouter(option)
