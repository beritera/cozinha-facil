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