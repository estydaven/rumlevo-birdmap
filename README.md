
# 🐦 Rumlevo BirdMap

**Rumlevo BirdMap** — это интерактивная карта птиц лесопарка Румлёво в Гродно.  
Приложение показывает вероятности встреч с разными видами птиц в разных секторах парка, с поддержкой офлайн-данных и геолокации.

## 🚀 Возможности

- 📍 Отображение сетки по данным GeoJSON
- 🐦 Птицы по секциям с вероятностями (Bird Probabilities)
- 📡 Определение текущего местоположения пользователя
- 💾 Кэширование данных в IndexedDB
- 📱 Поддержка мобильных устройств

## 🛠️ Как запустить проект локально

1. **Клонируй репозиторий:**
   ```bash
   git clone https://github.com/estydaven/rumlevo-birdmap.git
   cd rumlevo-birdmap
   ```

2. **Установи зависимости:**
   ```bash
   npm install
   ```

3. **Запусти локальный сервер:**
   ```bash
   npm run dev
   ```

4. **Открой в браузере:**
   ```
   http://localhost:5173
   ```

## 🏗️ Сборка проекта

Для деплоя (например, на GitHub Pages):

```bash
npm run build
```

Файлы будут собраны в папку `dist/`. Деплой происходит с ветки `gh-pages`.

## 🌐 Онлайн-версия

🔗 [estydaven.github.io/rumlevo-birdmap](https://estydaven.github.io/rumlevo-birdmap)

## 📁 Структура данных

- `public/rumlevo-grid.geojson` — сетка секций
- `public/bird-probabilities.json` — данные по птицам
- `src/db.js` — работа с IndexedDB
