<script setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue'
import { loadFromStore, saveToStore } from './db.js'

let map, gridLayer, birdData

function getStyle(feature) {
  return {
    fillColor: '#66cc66',
    weight: 1,
    opacity: 1,
    color: 'gray',
    fillOpacity: 0.3,
  }
}

async function loadFresh(store, key, url) {
  const res = await fetch(`${url}?v=${Date.now()}`)
  const data = await res.json()
  await saveToStore(store, key, data)
  return data
}

async function refreshGrid() {
  const data = await loadFresh('geo', 'rumlevo-grid', import.meta.env.BASE_URL + 'rumlevo-grid.geojson')
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
  map = L.map('map').setView([53.660399, 23.858360], 16) // дефолтный центр

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
    }
  )

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map)

  birdData = await loadFromStore('birds', 'bird-probs') ||
             await loadFromStore('birds', 'bird-probabilities.json') ||
             {}

  await refreshGrid()
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