import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MapView from '@/views/MapView.vue'
import LocationBirdsView from '@/views/LocationBirdsView.vue'
import RumlovaBirdsView from '@/views/RumlovaBirdsView.vue'
import InfoView from '@/views/InfoView.vue'

const routes = [
    {path: '/', name: 'home', component: HomeView },
    {path: '/map', name: 'map', component: MapView},
    {path: '/locationbirds', name: 'locationbirds', component: LocationBirdsView},
    {path: '/rumlovabirds', name: 'rumlovabirds', component: RumlovaBirdsView},
    {path: '/info', name: 'info', component: InfoView},
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router