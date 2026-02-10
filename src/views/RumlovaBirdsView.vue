<script setup>
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import NavMenu from '@/components/NavMenu.vue';
    import { useBirdStore } from '@/stores/birdStore.js';

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
                <h2 class="order-title" @click="birdStore.setOpenOrder(order)">{{ order }}<span class="arrow">{{ birdStore.openOrder === order ? '▲' : '▼' }}</span></h2>
                <div v-if="birdStore.openOrder === order">
                    <div v-for="(birds, family) in families" :key="family" class="family-block">
                        <h3 class="family-title">{{ family }}</h3>
                        <div class="bird-list">
                            <div v-for="bird in birds" :key="bird.id" @click="goToBird(bird.id)" class="bird-item">
                                <img :src="`${basePath}images_birds/${bird.img}`" :alt="bird.ru" />
                                <h3>{{ bird.ru }}</h3>
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
</style>