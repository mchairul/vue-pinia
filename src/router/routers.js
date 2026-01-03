
export var routers = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/index.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/about.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard.vue')
    }
]
