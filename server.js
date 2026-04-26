const express = require('express');
const cors = require('cors');
const app = express();

const recipeRoutes = require('./src/routes/recipeRoutes');

app.use(cors());
app.use(express.json());
app.use(recipeRoutes);

app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});