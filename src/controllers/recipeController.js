exports.updateRecipe = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const recipe = recipes.find(r => r.id == id);

  if (!recipe) {
    return res.status(404).json({ message: 'Receita não encontrada' });
  }

  recipe.title = title || recipe.title;
  recipe.description = description || recipe.description;

  res.json(recipe);
};

exports.deleteRecipe = (req, res) => {
  const { id } = req.params;

  const index = recipes.findIndex(r => r.id == id);

  if (index === -1) {
    return res.status(404).json({ message: 'Receita não encontrada' });
  }

  recipes.splice(index, 1);

  res.json({ message: 'Receita removida com sucesso' });
};