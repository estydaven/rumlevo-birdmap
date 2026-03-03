<script setup>
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useRouter } from 'vue-router';
    import { useBirdStore } from '@/stores/birdStore';
    import SeasonBar from '@/components/SeasonBar.vue';

    const route = useRoute();
    const router = useRouter();
    const birdStore = useBirdStore();
    const basePath = import.meta.env.BASE_URL;

    function goBack() {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/rumlovabirds');
        }
    }

    onMounted(async () => {
        const id = Number(route.params.id);
        if (!birdStore.list.length) {
            await birdStore.loadBirds();
        }
       birdStore.selectedBird = birdStore.list.find(b => b.id === id)
    })
</script>
<template>
    <div>
        <div v-if="birdStore.loading">Загрузка...</div>
        <div v-else-if="birdStore.error">Ошибка: {{ birdStore.error }}</div>
        <div v-if="birdStore.selectedBird" class="bird-details">
            <h1>{{ birdStore.selectedBird.ru }}</h1>
            <h2><em>{{ birdStore.selectedBird.scientificName }}</em></h2>
            <h3><em>{{ birdStore.selectedBird.en }}</em></h3>
            <h4><em>{{ birdStore.selectedBird.be }}</em></h4>

            <img
            :src="`${basePath}images_birds/${birdStore.selectedBird.img}`"
            :alt="birdStore.selectedBird.ru"
            class="bird-img"
            />

            <div class="seasonality">
                <p>Сезонная встречаемость</p>
                <SeasonBar
                    v-if="birdStore.selectedBird"
                    mode="multiSeason"
                    :birdId="birdStore.selectedBird.id"
                />
            </div>

            <p>Отряд: {{ birdStore.selectedBird.order }}</p>
            <p>Семейство: {{ birdStore.selectedBird.family }}</p>
            <p>Род: {{ birdStore.selectedBird.genus }}</p>
            <p>Вид: {{ birdStore.selectedBird.species }}</p>
            <p>Глобальный статус: {{ birdStore.selectedBird.status }}</p>

            <button class="button button_small" @click="goBack()">← Назад</button>
        </div>

        <div v-else>
            <p>Птица не найдена 😢</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .bird-details {
        padding-bottom: 50px;
    }
    .bird-detail {
        max-width: 600px;
        margin: 0 auto;
    }
    .seasonality {
        margin-top: 20px;
        padding: 15px;
        background: #f8f8f8;
        border-radius: 10px;
    }
</style>