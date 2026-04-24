const recipes = [];

exports.getRecipes = (req, res) => {
  res.json(recipes);
};

exports.createRecipe = (req, res) => {
  const { title, description } = req.body;

  const newRecipe = {
    id: recipes.length + 1,
    title,
    description,
  };

  recipes.push(newRecipe);

  res.status(201).json(newRecipe);
};

exports.updateRecipe = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const recipe = recipes.find((recipe) => recipe.id == id);

  if (!recipe) {
    return res.status(404).json({ message: 'Receita não encontrada' });
  }

  recipe.title = title || recipe.title;
  recipe.description = description || recipe.description;

  res.json(recipe);
};

exports.deleteRecipe = (req, res) => {
  const { id } = req.params;

  const index = recipes.findIndex((recipe) => recipe.id == id);

  if (index === -1) {
    return res.status(404).json({ message: 'Receita não encontrada' });
  }

  recipes.splice(index, 1);

  res.json({ message: 'Receita removida com sucesso' });
};