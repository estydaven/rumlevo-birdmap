import { defineStore } from 'pinia';
import { getAllBirds } from '@/services/birdService.js';

export const useBirdStore = defineStore('birds', {
    state: () => ({
        list: [],
        selectedBird: null,
        loading: false,
        error: null,
        openOrder: null,
    }),

    actions: {
        async loadBirds(force = false) {
            this.loading = true
            this.error = null
            try {
                this.list = await getAllBirds(force)
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },
        selectBird(id) {
            this.selectedBird = this.list.find(b => b.id === id) || null;
        },
        setOpenOrder(order) {
            this.openOrder = this.openOrder === order ? null : order
        }
    },

    getters: {
        birdsByOrderAndFamily: (state) => {
            const result = {}

            state.list.forEach(bird => {
            // Отряд
            if (!result[bird.order]) {
                result[bird.order] = {}
            }

            // Семейство
            if (!result[bird.order][bird.family]) {
                result[bird.order][bird.family] = []
            }

            result[bird.order][bird.family].push(bird)
            })

            return result
        }
    }
})