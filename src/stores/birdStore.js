import { defineStore } from 'pinia';
import { getAllBirds } from '@/services/birdService.js';
import taxonomyMap from "@/assets/data/taxonomy_order.json";

function getMinTaxonOrder(families) {
    let min = 999999

    Object.values(families).forEach(birds => {
        birds.forEach(bird => {
            const taxOrder = taxonomyMap[bird.scientificName]
            if (taxOrder && taxOrder < min) {
                min = taxOrder
            }
        })
    })

    return min
}

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
            const grouped = {}

            // 1️⃣ Группируем
            state.list.forEach(bird => {
                const order = bird.order || "Unknown"
                const family = bird.family || "Unknown"
                // Отряд
                if (!grouped[order]) {
                    grouped[order] = {}
                }

                // Семейство
                if (!grouped[order][family]) {
                    grouped[order][family] = []
                }

                grouped[order][family].push(bird)
            })

            // 2️⃣ Сортируем виды внутри семейств
            Object.values(grouped).forEach(families => {
                Object.values(families).forEach(birds => {
                    birds.sort((a, b) => {
                        const orderA = taxonomyMap[a.scientificName] ?? 999999
                        const orderB = taxonomyMap[b.scientificName] ?? 999999
                        return orderA - orderB
                    })
                })
            })

            // 3️⃣ Сортируем отряды по минимальному taxonOrder внутри них
            const sortedOrders = Object.keys(grouped).sort((a, b) => {
                const minA = getMinTaxonOrder(grouped[a])
                const minB = getMinTaxonOrder(grouped[b])
                return minA - minB
            })

            // 4️⃣ Собираем итоговый объект в правильном порядке
            const result = {}

            sortedOrders.forEach(order => {
                result[order] = grouped[order]
            })

            return result
        }
    }
})