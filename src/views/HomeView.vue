<script setup>
    import SeasonalImage from '../components/SeasonalImage.vue';
</script>

<template>
    <!-- <h1>Главная страница</h1> -->
    <div class="main">
        <SeasonalImage />
        <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, quisquam vel! Vel temporibus, totam alias amet consequuntur quasi vero culpa quae iure repellat, eligendi asperiores consequatur. Officiis dolores recusandae reiciendis?</p>
        <router-link to="/map" class="button">
            Начать исследование!
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
.main {
    padding: 20px 10px;
}
.text {
    text-align: center;
    margin-bottom: 30px;
}
</style>