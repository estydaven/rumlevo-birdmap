<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const isMenuVisible = ref(false);
const route = useRoute();

function toggleMenu() {
    isMenuVisible.value = !isMenuVisible.value;
}
</script>

<template>
    <div>
        <button @click="toggleMenu" :class="{ open: isMenuVisible }" class="burger-icon">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav v-if="isMenuVisible" class="menu">
            <ul>
                <li v-if="route.path !== '/'"><router-link to="/">Вернуться на главную</router-link></li>
                <li><router-link to="/map">Карта</router-link></li>
                <li><a href="#">Список птиц</a></li>
                <li><a href="#">Инфо</a></li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.burger-icon {
  position: relative;
  width: 30px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  z-index: 9999;
}

.burger-icon span {
  display: block;
  height: 4px;
  width: 100%;
  background-color: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Когда меню открыто */
.burger-icon.open span:nth-child(1) {
  transform: rotate(45deg) translateY(9px);
}

.burger-icon.open span:nth-child(2) {
  opacity: 0;
}

.burger-icon.open span:nth-child(3) {
  transform: rotate(-45deg) translateY(-9px);
}

.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu ul {
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