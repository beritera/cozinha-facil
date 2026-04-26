const pool = require('../config/database');

exports.getRecipes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar receitas' });
  }
};

exports.createRecipe = async (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Título é obrigatório' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO recipes (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar receita' });
  }
};

exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE recipes 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description)
       WHERE id = $3
       RETURNING *`,
      [title, description, id]
    );

    if (title !== undefined && title.trim() === '') {
  return res.status(400).json({ message: 'Título não pode ser vazio' });
}

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar receita' });
  }
};

exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM recipes WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    res.json({ message: 'Receita removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover receita' });
  }
};