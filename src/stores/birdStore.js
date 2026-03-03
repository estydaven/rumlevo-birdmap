import { defineStore } from 'pinia';
import { getAllBirds } from '@/services/birdService.js';
import taxonomyMap from "@/assets/data/taxonomy_order.json";
import birdSeasonData from "@/assets/data/birdSeasonData.js";

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

function getFrequencyColor(frequency) {
  // Если частоты нет — серый
  if (frequency == null) return "#ccc";
  const green = [0, 200, 0];
  const red = [200, 0, 0];
  const r = Math.round(red[0] * frequency + green[0] * (1 - frequency));
  const g = Math.round(red[1] * frequency + green[1] * (1 - frequency));
  const b = Math.round(red[2] * frequency + green[2] * (1 - frequency));
  return `rgb(${r},${g},${b})`;
}

export const useBirdStore = defineStore('birds', {
    state: () => ({
        list: [],
        selectedBird: null,
        loading: false,
        error: null,
        openOrder: null,
        openFamilyKey: null,
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
            this.openFamilyKey = null;
            this.openOrder = this.openOrder === order ? null : order;
        },
        setOpenFamily(order, family) {
            const key = `${order}_${family}`;
            this.openFamilyKey = this.openFamilyKey === key ? null : key;
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
        },
        // Цвета для списка птиц
        birdColorsBySeason: (state) => {
            const map = {};
            state.list.forEach(bird => {
                map[Number(bird.id)] = {};
                ["winter", "spring", "summer", "autumn"].forEach(season => {
                // Находим данные по birdId и сезону
                const data = birdSeasonData.find(
                    s => Number(s.birdId) === Number(bird.id) && s.season === season
                );

                // Если данных нет — серый
                map[bird.id][season] = data ? getFrequencyColor(data.frequency) : "#ccc";
                });
            });
            return map;
        },
        // Для карточки: возвращаем сразу объект с частотами для ширины полосок
        birdFrequencyBySeason: (state) => {
        const map = {};
        state.list.forEach(bird => {
            map[Number(bird.id)] = {};
            ["winter", "spring", "summer", "autumn"].forEach(season => {
            const data = birdSeasonData.find(
                s => Number(s.birdId) === Number(bird.id) && s.season === season
            );
            map[bird.id][season] = data ? data.frequency : 0;
            });
        });
        return map;
        }
    }
})