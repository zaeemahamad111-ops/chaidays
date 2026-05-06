const fs = require('fs');

const spaces = 7;
const drinks = 15;
const desserts = 4;

let items = [];
let id = 1;

// Helper to get random layout
const layouts = [
  { col: 'col-span-12 md:col-span-8', ratio: 'aspect-[16/9]' },
  { col: 'col-span-12 md:col-span-4', ratio: 'aspect-[3/4]' },
  { col: 'col-span-12 md:col-span-4', ratio: 'aspect-square' },
  { col: 'col-span-12 md:col-span-4', ratio: 'aspect-square' },
  { col: 'col-span-12 md:col-span-4', ratio: 'aspect-[3/4]' },
  { col: 'col-span-12 md:col-span-8', ratio: 'aspect-[16/9]' },
  { col: 'col-span-12 md:col-span-6', ratio: 'aspect-[4/3]' },
  { col: 'col-span-12 md:col-span-6', ratio: 'aspect-[4/3]' }
];

function addCategory(cat, count, labelPrefix) {
  for (let i = 1; i <= count; i++) {
    const layout = layouts[(id - 1) % layouts.length];
    items.push({
      id: id++,
      category: cat,
      label: `${labelPrefix} • ${i.toString().padStart(2, '0')}`,
      colSpan: layout.col,
      ratio: layout.ratio,
      img: `/images/gallery/${cat}-${i}.jpg`,
      alt: `Chai Days ${cat} ${i}`
    });
  }
}

addCategory('space', spaces, 'SPACE');
addCategory('drinks', drinks, 'DRINKS');
addCategory('desserts', desserts, 'DESSERTS');

// Reassign IDs 
items.forEach((item, idx) => item.id = idx + 1);

fs.writeFileSync('d:/chaidays/chaidays-web/galleryData.txt', 'const galleryItems = ' + JSON.stringify(items, null, 2).replace(/"([a-zA-Z]+)":/g, '$1:') + ';');
