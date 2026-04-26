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

      <button class="edit-btn">
        Editar
      </button>

      <button class="delete-btn" onclick="deleteRecipe(${recipe.id})">
        Excluir
      </button>
    `;

    const editButton = card.querySelector('.edit-btn');

    editButton.addEventListener('click', () => {
      editingRecipeId = recipe.id;
      titleInput.value = recipe.title;
      descriptionInput.value = recipe.description || '';

      form.querySelector('button').textContent = 'Salvar Alteração';
    });

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
      method: 'PUT',
      headers: {    
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });

    editingRecipeId = null;
    form.querySelector('button').textContent = 'Cadastrar Receita';
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });
  }

  titleInput.value = '';
  descriptionInput.value = '';

  loadRecipes();
});

function editRecipe(id, title, description) {
  editingRecipeId = id;
  titleInput.value = title;
  descriptionInput.value = description;
}

async function deleteRecipe(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  loadRecipes();
}

loadRecipes();