import { saveToStore, loadFromStore } from '@/db.js';

export async function getAllBirds(forceRefresh = false) {
    if (!forceRefresh) {
        const cached = await loadFromStore('birds', 'all-birds');
        if (cached) return cached;
    }
    
    const url = `${import.meta.env.BASE_URL}data/birds.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Ошибка загрузки JSON: ${res.status}`)
    const data = await res.json();

    await saveToStore('birds', 'all-birds', data);
    return data;
}

// const API_URL = 'https://nuthatch.lastelm.software/v2'
// const API_KEY = '67851786-0011-40c7-977e-5964388e9004';

// async function FetchFromAPI(endpoint) {
//     const res = await fetch(`${API_URL}${endpoint}`, {
//         headers: {'api-key': API_KEY}
//     })
//     if (!res.ok) throw new Error(`Ошибка API: ${res.status}`);
//     return res.json();
// }

// // Получить всех птиц
// export async function getAllBirds(forceRefresh = false) {
//     if (!forceRefresh) {
//         const cached = await loadFromStore('birds', 'all-birds');
//         if (cached) return cached;
//     }

//     const data = await FetchFromAPI('/birds?hasImg=true');

//     // API возвращает объект, а список птиц внутри data.entities
//     const birds = data.entities || [];

//     await saveToStore('birds', 'all-birds', birds);

//     return birds;
// }

// // Получить конкретную птицу по ID
// export async function getBirdByID(id, forceRefresh = false) {
//     if (!forceRefresh) {
//         const cached = await loadFromStore('birds', `bird-${id}`);
//         if (cached) return cached;
//     }

//     const data = await FetchFromAPI(`/birds/${id}`);
//     const bird = data || null;

//     if (bird) {
//         await saveToStore('birds', `bird-${id}`, bird)
//     }

//     return bird;
// }