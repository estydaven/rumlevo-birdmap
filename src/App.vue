<!-- <script setup>
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue'
import { loadFromStore, saveToStore } from './db.js'

let map, gridLayer, birdData

function getStyle(feature) {
    return {
        fillColor: '#66cc66',
        weight: 1,
        opacity: 0,
        color: 'gray',
        fillOpacity: 0,
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
    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
        iconUrl: markerIcon,
        shadowUrl: markerShadow
    })

    const userIcon = new L.Icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    map = L.map('map').setView([53.660399, 23.858360], 16)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
    }).addTo(map)

    map.locate()

    map.on('locationfound', (e) => {
        map.setView(e.latlng, 17)
        L.marker(e.latlng, { icon: userIcon })
            .addTo(map)
            .bindPopup('Вы здесь 🐾')
            .openPopup()
    })

    map.on('locationerror', (e) => {
        console.error('Ошибка геолокации:', e.message)
    })

    birdData = await loadFromStore('birds', 'bird-probs')

    if (!birdData) {
        try {
            const res = await fetch(import.meta.env.BASE_URL + 'bird-probabilities.json?v=' + Date.now())
            birdData = await res.json()
            await saveToStore('birds', 'bird-probs', birdData)
            console.log('Сохранили birdData в IndexedDB:', birdData)
        } catch (error) {
            console.error('Не удалось загрузить bird-probabilities.json:', error)
            birdData = {}
        }
    }

    await refreshGrid()
})
</script> -->
<script setup></script>
<template>
    <router-view />
    <!-- <div id="map"></div>
    <button @click="refreshGrid" style="position: absolute; top: 10px; left: 10px; z-index: 1000;">
        🔄 Обновить сетку
    </button> -->
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
}
/* #map {
    width: 100%;
    height: 100vh;
} */
</style>