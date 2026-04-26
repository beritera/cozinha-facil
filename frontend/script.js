const API_URL = 'http://localhost:3000/recipes';

const form = document.getElementById('recipe-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const recipesList = document.getElementById('recipes-list');

let editingRecipeId = null;

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

      <button onclick="editRecipe(${recipe.id}, '${recipe.title}', '${recipe.description || ''}')"> Editar </button>

      <button class="delete-btn" onclick="deleteRecipe(${recipe.id})">Excluir</button>
    `;

    recipesList.appendChild(card);
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

const recipeData = {
    title: titleInput.value,
    description: descriptionInput.value,
};

if (editingRecipeId) {
    await fetch(`${API_URL}/${editingRecipeId}`, {
        method = 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
    });

    editingRecipeId = null;

}   else {
    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData),
    });
}

    titleInput.value = '';
    descriptionInput.value = '';

    loadRecipes();
});

    function editRecipe(id, title, description) {
        editRecipeId = id,
        titleInput.value = title,
        descriptionInput.value = description;
    }

    async function deleteRecipe(id) {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        loadRecipes();

    }

    loadRecipes();
  