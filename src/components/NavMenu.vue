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

<style scoped>
.menu {
  position: fixed;
  bottom: 0;
  width: 480px;
  max-width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.menu ul {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin-bottom: 15px;
}

.menu a {
  color: white;
  text-decoration: none;
  font-size: 20px;
}
</style>