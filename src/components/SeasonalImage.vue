<script setup>
    import { computed } from 'vue';

    const month = new Date().getMonth();

    const season = computed(() => {
        if ([11, 0, 1].includes(month)) return 'winter'
        if ([2, 3, 4].includes(month)) return 'spring'
        if ([5, 6, 7].includes(month)) return 'summer'
        return 'autumn'
    })

    const images = {
        winter: new URL('@/assets/images/seasons/winter.png', import.meta.url).href,
        spring: new URL('@/assets/images/seasons/spring.png', import.meta.url).href,
        summer: new URL('@/assets/images/seasons/summer.png', import.meta.url).href,
        autumn: new URL('@/assets/images/seasons/autumn.png', import.meta.url).href,
    }

    const seasonImage = computed(() => images[season.value]);
</script>

<template>
    <img :src="seasonImage" alt="" class="season-image" />
</template>

<style scoped lang="scss">
.season-image {
    width: 100%;
    max-width: 400px;
    display: block;
    margin: 0 auto 20px;
}
</style>