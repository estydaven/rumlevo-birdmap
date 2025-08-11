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
.button {
    display: block;
    width: 100%;
    height: 70px;
    text-align: center;
    margin: 0 auto;
    background-color: $color-sunset;
    padding: 20px 10px;
    border-radius: 8px;
    color: $color-forest;
    font-weight: 700;
    font-size: 22px;
    outline: none;
    transition: 1s ease-in-out;
    position: relative;
    overflow: hidden;
  
  &:hover {
    background-color: $color-forest;
    color: $color-sunset;
  }
}
</style>