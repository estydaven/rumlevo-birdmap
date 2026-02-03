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

    // function selectedBird(id) {
    //     birdStore.selectedBird(id);
    // }
</script>

<template>
    <div class="main">
        <h1>Список птиц парка Румлёво</h1>
        <div v-if="birdStore.loading">Загрузка...</div>
        <div v-if="birdStore.error">Ошибка: {{ birdStore.error }}</div>
        <div v-if="birdStore.list.length" class="bird-list">
            <div v-for="bird in birdStore.list" :key="bird.id" @click="goToBird(bird.id)" class="bird-item">
                <img :src="`${basePath}images_birds/${bird.img}`" :alt="bird.ru" />
                <h3>{{ bird.ru }}</h3>
                <p><em>{{ bird.latin }}</em></p>
            </div>
            <!-- <div v-if="birdStore.selectedBird" class="bird-details">
                <h2>{{ birdStore.selectedBird.ru }}</h2>
                  <img
                    :src="`${basePath}images_birds/${birdStore.selectedBird.img}`"
                    :alt="birdStore.selectedBird.ru"
                />
            </div> -->
        </div>
        <!-- <ul class="bird-list">
            <li v-for="bird in birdStore.list" :key="bird.id" class="bird-card">
            <h2>{{ bird.name }}</h2>
            <p><i>{{ bird.sciName }}</i></p>
            <p>Статус: {{ bird.status || 'неизвестен' }}</p>
            <img 
                v-if="bird.images && bird.images.length > 0" 
                :src="bird.images[0]" 
                alt="bird image" 
                class="bird-image"
            />
            <img v-else src="" alt="no image" class="bird-image"/>
            </li>
        </ul> -->


        <!-- <ul>
            <li v-for="bird in birdStore.list" :key="bird.id">
                <router-link :to="`/bird/${bird.id}`">
                {{ bird.name }}
                </router-link>
            </li>
        </ul> -->
        <!-- <ul>
            <li v-for="bird in birdStore.list" :key="bird.id">
                <h3>{{ bird.name }}</h3>
                <p><em>{{ bird.sciName }}</em></p>
                <p>Статус: {{ bird.status || "неизвестен" }}</p>
                <img :src="bird.images?.[0] || 'noBird.png'" alt="bird image" width="200" />
            </li>
        </ul> -->

        
        <!-- Детали выбранной птицы -->
        <!-- <div v-if="birdStore.selectedBird" class="bird-details">
        <h3>{{ birdStore.selectedBird.nameRus || birdStore.selectedBird.nameLat }}</h3>
        <img
            v-if="birdStore.selectedBird.img"
            :src="birdStore.selectedBird.img"
            :alt="birdStore.selectedBird.nameRus"
            class="bird-img"
        />
        <p v-if="birdStore.selectedBird.description">
            {{ birdStore.selectedBird.description }}
        </p>
        </div> -->
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
    width: calc(100% / 3 - 10px);
    cursor: pointer;
}
.bird-item img {
    width: 100%;
    height: 100px;
    object-fit: cover;
}
</style>