import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/projects",
      name: "projects",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/ProjectsView.vue"),
    },
    {
      path: "/projects/recipes",
      name: "recipes",
      component: () => import("@/views/RecipeToolView.vue"),
    },
    {
      path: "/projects/expense-calculator",
      name: "recipes",
      component: () => import("@/views/ExpenseCalculatorView.vue"),
    },
  ],
});

export default router;
