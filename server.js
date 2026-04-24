const express = require('express');
const app = express();

const recipeRoutes = require('./src/routes/recipeRoutes');

app.use(express.json());
app.use(recipeRoutes);

app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});