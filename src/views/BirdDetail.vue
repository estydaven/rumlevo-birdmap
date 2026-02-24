<script setup>
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useRouter } from 'vue-router';
    import { useBirdStore } from '@/stores/birdStore';

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

    <p>Отряд: {{ birdStore.selectedBird.order }}</p>
    <p>Семейство: {{ birdStore.selectedBird.family }}</p>
    <p>Род: {{ birdStore.selectedBird.genus }}</p>
    <p>Вид: {{ birdStore.selectedBird.species }}</p>
    <p>Глобальный статус: {{ birdStore.selectedBird.status }}</p>

    <!-- <router-link to="/rumlovabirds">← Назад</router-link> -->
    <button class="button button_small" @click="goBack()">← Назад</button>
  </div>

  <div v-else>
    <p>Птица не найдена 😢</p>
  </div>
</template>
<style lang="scss" scoped>
    .bird-detail {
        max-width: 600px;
        margin: 0 auto;
    }
</style>