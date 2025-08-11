<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <div>
        <nav class="menu">
            <ul>
                <li v-if="route.path !== '/map'"><el-icon color="#fff"><MapLocation /></el-icon><router-link to="/map">Карта</router-link></li>
                <li v-if="route.path === '/locationbirds' || route.path === '/map' || route.path === '/info'"><el-icon color="#fff"><LocationInformation /></el-icon><router-link to="/rumlovabirds">Птицы Румлёво</router-link></li>
                <li v-if="route.path === '/map' || route.path === '/info'"><el-icon color="#fff"><Place /></el-icon><router-link to="/locationbirds">Птицы локации</router-link></li>
                <li v-if="['/rumlovabirds', '/locationbirds', '/map'].includes(route.path)"><el-icon color="#fff"><InfoFilled /></el-icon><router-link to="/info">О проекте</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<style scoped lang="scss">

.menu {
  position: absolute;
  bottom: 0;
  width: 480px;
  max-width: 100%;
  padding: 10px 5px;
  background-color: $color-forest;
  z-index: 1000;

  ul {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
  }

  a {
    color: $color-text-light;
    text-decoration: none;
    font-size: 17px;

    &:hover {
      color: $color-sunset;
    }
  }
}

</style>