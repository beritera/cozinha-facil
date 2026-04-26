const API_URL = 'http://localhost:3000/recipes';

const form = document.getElementById('recipe-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const recipesList = document.getElementById('recipes-list');

async function loadRecipes() {
  const response = await fetch(API_URL);
  const recipes = await response.json();

  recipesList.innerHTML = '';

  recipes.forEach((recipe) => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>${recipe.description || 'Sem descrição'}</p>
      <button class="delete-btn" onclick="deleteRecipe(${recipe.id})">Excluir</button>
    `;

    recipesList.appendChild(card);
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const newRecipe = {
    title: titleInput.value,
    description: descriptionInput.value,
  };

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRecipe),
  });

  titleInput.value = '';
  descriptionInput.value = '';

  loadRecipes();
});

async function deleteRecipe(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  loadRecipes();
}

loadRecipes();