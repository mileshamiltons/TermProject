import { createRouter, createWebHistory } from "vue-router";
import LoginView from "./views/LoginView.vue";
import DashboardView from "./views/DashboardView.vue";
import { auth } from "./firebase";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/login", component: LoginView },
  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  const user = auth.currentUser;

  if (to.meta.requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});

export default router;
