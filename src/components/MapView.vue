<template>
  <div id="map" style="height: 100vh;"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';

onMounted(async () => {
  const map = L.map('map').setView([53.911, 30.309], 15);

  // Онлайн-тайлы (позже заменишь на оффлайн)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Геолокация
  map.locate({ setView: true, maxZoom: 17 });
  map.on('locationfound', (e) => {
    L.circle(e.latlng, {
      radius: e.accuracy / 35,
      color: 'blue',
      fillColor: '#30f',
      fillOpacity: 0.3
    }).addTo(map).bindPopup("Вы здесь");
  });
  map.on('locationerror', () => {
    alert("Геолокация не доступна.");
  });

  // Загрузка зон
  const res = await fetch('/zones.geojson');
  const geojson = await res.json();
  const birds = await fetch('/birds.json').then(r => r.json());

  L.geoJSON(geojson, {
    onEachFeature: function (feature, layer) {
      const zoneId = feature.properties.id;
      const birdList = birds[zoneId] || [];
      const text = `<b>${feature.properties.name}</b><br>Птицы: ${birdList.join(', ')}`;
      layer.bindPopup(text);
    },
    style: { color: "green", weight: 2, fillOpacity: 0.2 }
  }).addTo(map);
});
</script>
