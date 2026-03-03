<script setup>
import { computed } from 'vue'
import seasonData from '@/assets/data/birdSeasonData.js'

const props = defineProps({
  birdId: { type: Number, required: false },
  sectionId: { type: Number, required: false, default: 111 },
  season: { type: String, required: false }, // нужен только для singleSeason
  mode: { type: String, default: 'multiSeason' } // 'singleSeason' | 'multiSeason'
});

// Склоняемый падеж для подписи
const seasonNamesInst = {
  winter: 'зимой',
  spring: 'весной',
  summer: 'летом',
  autumn: 'осенью'
};

// Именительный падеж для карточки
const seasonNamesNom = {
  winter: 'Зима',
  spring: 'Весна',
  summer: 'Лето',
  autumn: 'Осень'
};

// Авто-сезон по текущей дате (для singleSeason)
const currentSeason = computed(() => {
  const month = new Date().getMonth() + 1; // январь = 1
  if ([12,1,2].includes(month)) return 'winter';
  if ([3,4,5].includes(month)) return 'spring';
  if ([6,7,8].includes(month)) return 'summer';
  return 'autumn';
});

// Выбираем сезон для singleSeason
const usedSeason = computed(() => props.season || currentSeason.value);

// Частота для singleSeason
const frequency = computed(() => {
  if (!props.birdId || !seasonData[0]?.[props.sectionId]?.[props.birdId]) return null;
  if (props.mode === 'singleSeason') {
    const val = seasonData[0][props.sectionId][props.birdId][usedSeason.value];
    return val != null ? val : null;
  }
  return null;
});

// Цвет
function getColor(freq) {
  if (freq == null) return '#ccc';
  const green = [0, 200, 0];
  const red = [200, 0, 0];
  const r = Math.round(red[0] * freq + green[0] * (1 - freq));
  const g = Math.round(red[1] * freq + green[1] * (1 - freq));
  const b = Math.round(red[2] * freq + green[2] * (1 - freq));
  return `rgb(${r},${g},${b})`;
}

function getWidth(freq) {
  return freq != null ? `${Math.round(freq * 100)}%` : '0%';
}

// Подпись
const labelText = computed(() => {
  if (props.mode === 'singleSeason') {
    return frequency.value != null
      ? `Встречаемость ${seasonNamesInst[usedSeason.value]}: ${Math.round(frequency.value*100)}%`
      : '—';
  }
  return '';
});

const freqValue = computed(() => frequency.value ?? 0);
</script>

<template>
  <div v-if="mode==='singleSeason' && birdId" class="season-row">
    <div class="season-bar">
      <div class="season-fill" :style="{ backgroundColor: getColor(freqValue), width: getWidth(freqValue) }">
        <span class="fill-label">{{ labelText }}</span>
      </div>
    </div>
  </div>

  <div v-else-if="birdId" class="season-col">
    <div v-for="s in ['winter','spring','summer','autumn']" :key="s" class="season-row">
      <div class="season-bar">
        <div class="season-fill" :style="{ backgroundColor: getColor(seasonData[0]?.[props.sectionId]?.[props.birdId]?.[s]), width: getWidth(seasonData[0]?.[props.sectionId]?.[props.birdId]?.[s]) }"></div>
      </div>
      <span class="percent">{{ seasonNamesNom[s] }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.season-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 6px 0;
}
.season-col {
  display: flex;
  flex-direction: column;
}
.season-bar {
  flex: 1;
  height: 15px;
  background: #878585;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}
.season-fill {
  height: 100%;
  transition: 0.4s ease;
}
.fill-label {
  position: absolute;
  width: 100%;
  left: 60%;
  top: -2px;
  transform: translateX(-50%);
  font-size: 12px;
  color: #ffffff;
}
.percent {
  width: 60px;
  font-size: 12px;
  color: #555;
  text-align: left;
}
</style>