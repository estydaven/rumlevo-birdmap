// scripts/generateTaxonOrder.js
import fs from "fs";
import { parse } from 'csv-parse';

const results = [];

fs.createReadStream("public/data/ebird_taxonomy.csv")
    .pipe(parse({ columns: true }))
    .on("data", row => {
    const scientificName = row["scientific name"]?.trim();
    const taxonOrder = Number(row["sort v2025"]);
    const category = row["category"];

    // Берём только настоящие виды
    if (scientificName && !isNaN(taxonOrder) && category === "species") {
        results.push({
            scientificName,
            taxonOrder
        });
    }
    })
    .on("end", () => {
    // Сортируем по taxonOrder
    const taxonomyMap = {};
    results.forEach(item => {
        taxonomyMap[item.scientificName] = item.taxonOrder;
    })

    // Записываем в JSON
    fs.writeFileSync("public/data/taxonomy_order.json", JSON.stringify(taxonomyMap, null, 2));

    console.log(`Создан taxonomy_order.json с ${results.length} записями!`);
  });