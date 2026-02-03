<script setup>
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useBirdStore } from '@/stores/birdStore';

    const route = useRoute();
    const birdStore = useBirdStore();
    const basePath = import.meta.env.BASE_URL;

    onMounted(async () => {
        const id = Number(route.params.id);
        if (!birdStore.list.length) {
            await birdStore.loadBirds();
        }
        birdStore.selectedBird = birdStore.list.find(b => b.id === id)
    })

    // onMounted(async () => {
    //     const id = route.params.id;
    //     await birdStore.selectedBird(id);
    // })
</script>
<template>
  <div v-if="birdStore.loading">Загрузка...</div>
  <div v-else-if="birdStore.error">Ошибка: {{ birdStore.error }}</div>
  <div v-if="birdStore.selectedBird" class="bird-details">
    <h1>{{ birdStore.selectedBird.ru }}</h1>
    <h2><em>{{ birdStore.selectedBird.latin }}</em></h2>

    <img
      :src="`${basePath}images_birds/${birdStore.selectedBird.img}`"
      :alt="birdStore.selectedBird.ru"
      class="bird-img"
    />

    <p>Отряд: {{ birdStore.selectedBird.order }}</p>
    <p>Семейство: {{ birdStore.selectedBird.family }}</p>
    <p>Род: {{ birdStore.selectedBird.genus }}</p>
    <p>Вид: {{ birdStore.selectedBird.species }}</p>

    <router-link to="/rumlovabirds">← Назад</router-link>
  </div>

  <div v-else>
    <p>Птица не найдена 😢</p>
  </div>
</template>
<!-- <template>
  <div v-if="birdStore.loading">Загрузка...</div>
  <div v-else-if="birdStore.error">Ошибка: {{ birdStore.error }}</div>
  <div v-else-if="birdStore.selectedBird" class="bird-detail">
    <h1>{{ birdStore.selectedBird.name }}</h1>
    <p><i>{{ birdStore.selectedBird.sciName }}</i></p>
    <p><b>Статус:</b> {{ birdStore.selectedBird.status || 'неизвестен' }}</p>

    <div v-if="birdStore.selectedBird.images?.length">
      <img 
        :src="birdStore.selectedBird.images[0]" 
        alt="bird image" 
        style="max-width:400px;" 
      />
    </div>
    <div v-else>
      <p><i>Нет изображения</i></p>
    </div>

    <div v-if="birdStore.selectedBird.description">
      <h3>Описание</h3>
      <p>{{ birdStore.selectedBird.description }}</p>
    </div>
  </div>
  <div v-else>
    <p>Птица не найдена</p>
  </div>
</template> -->

<style lang="scss" scoped>
    .bird-detail {
        max-width: 600px;
        margin: 0 auto;
    }
</style>