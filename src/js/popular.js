import {getPopularRecipes} from './Api/api-popular_recipes';

const list = document.querySelector('.popular-list');

getPopularRecipes().then(data => {console.dir(data)})

function renderItems(data) {
  const card = data.map(({ title, description, preview, _id }) => `
    <li class="list-item" id="${_id}">
        <img class="item-img" src="${preview}" alt="${title}" width="64" height="64">
        <div class="text-wrap">
        <h3 class="item-title">${title}</h3>
        <p class="item-text">${description}</p>
        </div>
    </li>`).join('');

  list.innerHTML = card;
}

function updateVisibleItems() {
  const width = window.innerWidth;
  if (width >= 768) {
    getPopularRecipes().then(data => {
      localStorage.setItem('popularRecipes', JSON.stringify(data));
      renderItems(data.slice(0, 4));
    });
  } else {
    const data = JSON.parse(localStorage.getItem('popularRecipes'));

    if (data) {
      renderItems(data.slice(0, 2)); 
    }
  }
}

updateVisibleItems();

window.addEventListener('resize', updateVisibleItems);