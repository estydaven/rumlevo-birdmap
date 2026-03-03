<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavMenu from '@/components/NavMenu.vue';
import { useBirdStore } from '@/stores/birdStore.js';
import SeasonBar from '@/components/SeasonBar.vue';

const birdStore = useBirdStore();
const router = useRouter();
const basePath = import.meta.env.BASE_URL;
const goToBird = (id) => {
    router.push(`/bird/${id}`)
}

onMounted(() => {
    birdStore.loadBirds(true);
})
</script>

<template>
    <div class="main">
        <h1>Список птиц парка Румлёво</h1>
        <div v-if="birdStore.loading">Загрузка...</div>
        <div v-if="birdStore.error">Ошибка: {{ birdStore.error }}</div>
        <div v-else>
            <div v-for="(families, order) in birdStore.birdsByOrderAndFamily" :key="order" class="order-block">
                <h2 class="order-title" @click="birdStore.setOpenOrder(order)">
                    {{ order }}
                    <span class="arrow"
                        :class="{ open: birdStore.openOrder === order}"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24">
                            <path d="M8 5l8 7-8 7" fill="currentColor"/>
                        </svg>
                    </span>
                </h2>
                <div v-if="birdStore.openOrder === order">
                    <div v-for="(birds, family) in families" :key="family" class="family-block">
                        <h3 class="family-title" @click="birdStore.setOpenFamily(order, family)">
                            {{ family }}
                            <span class="arrow"
                                :class="{ open: birdStore.openFamilyKey === `${order}_${family}`}"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24">
                                    <path d="M8 5l8 7-8 7" fill="currentColor"/>
                                </svg>
                            </span>
                        </h3>
                        <div v-if="birdStore.openFamilyKey === `${order}_${family}`" class="bird-list">
                            <div v-for="bird in birds" :key="bird.id" @click="goToBird(bird.id)" class="bird-item">
                                <img :src="`${basePath}images_birds/${bird.img}`" :alt="bird.ru" />
                                <h4>{{ bird.ru }}</h4>
                                <SeasonBar
                                    mode="singleSeason"
                                    :birdId="bird.id"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <NavMenu />
</template>

<style lang="scss" scoped>
.main {
    padding: 20px 10px 65px 10px;
}
.bird-list {
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    justify-content: space-between;
}
.bird-item {
    width: calc(100% / 2 - 10px);
    cursor: pointer;
}
.bird-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}
.arrow svg {
  transition: transform 0.2s ease;
}
.arrow.open svg {
  transform: rotate(90deg);
}
.season-colors {
    display: flex;
    margin-bottom: 10px;
    column-gap: 3px;
}
.season-block {
  width: 14px;
  height: 14px;
  border-radius: 3px;
}
</style>