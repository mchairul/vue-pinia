
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
        path: '/booking',
        name: 'booking',
        component: () => import('../views/booking.vue')
    },
    {
        path: '/booking/add',
        name: 'booking.add',
        component: () => import('../views/add_booking.vue')
    }
]
