<script setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue'
import { loadFromStore, saveToStore } from './db.js'

let map, gridLayer, birdData, gridData

async function loadFresh(store, key, url) {
  const res = await fetch(`${url}?v=${Date.now()}`)
  const data = await res.json()
  await saveToStore(store, key, data)
  return data
}

function getStyle(feature) {
  return {
    fillColor: '#66cc66',
    weight: 1,
    opacity: 1,
    color: 'gray',
    fillOpacity: 0.3,
  }
}

async function refreshGrid() {
  const data = await loadFresh('geo', 'rumlevo-grid', '/rumlevo-grid.geojson')
  if (gridLayer) map.removeLayer(gridLayer)
  gridLayer = L.geoJSON(data, {
    style: getStyle,
    onEachFeature: (feature, layer) => {
      const id = feature.properties.id
      const birds = birdData[id]
      layer.on('click', () => {
        let content
        if (birds) {
          content = `<b>Секция: ${id}</b><br><ul>`
          Object.entries(birds).forEach(([bird, prob]) => {
            content += `<li>${bird}: ${Math.round(prob * 100)}%</li>`
          })
          content += '</ul>'
        } else {
          content = 'Нет данных для этой секции'
        }
        layer.bindPopup(content).openPopup()
      })
    }
  }).addTo(map)
}

onMounted(async () => {
  //map = L.map('map').setView([53.660399, 23.858360], 16)
  map = L.map('map')

navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude
    const lng = position.coords.longitude
    map.setView([lat, lng], 16)

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup('Вы здесь 🐾')
      .openPopup()
  },
  (error) => {
    console.error('Ошибка геолокации:', error)
    map.setView([53.660399, 23.858360], 16)
  }
)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map)

  gridData = await loadFresh('geo', 'rumlevo-grid', '/rumlevo-grid.geojson')
  birdData = await loadFromStore('birds', 'bird-probs') ||
             await loadFromStore('birds', 'bird-probabilities.json') ||
             {}

  // Если даже в store ничего, можно загрузить заново или оставить пустым

  gridLayer = L.geoJSON(gridData, {
    style: getStyle,
    onEachFeature: (feature, layer) => {
      const id = feature.properties.id
      const birds = birdData[id]
      layer.on('click', () => {
        let content
        if (birds) {
          content = `<b>Секция: ${id}</b><br><ul>`
          Object.entries(birds).forEach(([bird, prob]) => {
            content += `<li>${bird}: ${Math.round(prob * 100)}%</li>`
          })
          content += '</ul>'
        } else {
          content = 'Нет данных для этой секции'
        }
        layer.bindPopup(content).openPopup()
      })
    }
  }).addTo(map)
})
</script>
<template>
  <div id="map"></div>
  <button @click="refreshGrid"
          style="position: absolute; top: 10px; left: 10px; z-index: 1000;">
    🔄 Обновить сетку
  </button>
</template>

<style>
#map {
  width: 100%;
  height: 100vh;
}
</style>