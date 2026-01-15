
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
        path: '/home',
        name: 'dashboard',
        component: () => import('../views/dashboard.vue')
    },
    {
        path: '/chat',
        name: 'chat',
        component: () => import('../views/chat.vue')
    }
]
