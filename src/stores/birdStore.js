import { defineStore } from 'pinia';
import { getAllBirds } from '@/services/birdService.js';

export const useBirdStore = defineStore('birds', {
    state: () => ({
        list: [],
        selectedBirds: null,
        loading: false,
        error: null,
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
            this.selectedBirds = this.list.find(b => b.id === id) || null;
        }
    }
})