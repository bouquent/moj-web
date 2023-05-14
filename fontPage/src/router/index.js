import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "mojHomeComponent",
        component: () => import("../components/MojHomeComponent.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../components/Login.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../components/Register.vue"),
    },
    {
        path: "/problemset",
        name: "problemset",
        component: () => import("../components/ProblemSet.vue"),
    },
    {
        path: "/submit-history",
        name: "submit-history",
        component: () => import("../components/SubmitHistory.vue"),
    },
    {
        path: "/problems/:id",
        name: "problem",
        component: ()=> import("../components/Problems.vue")
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router