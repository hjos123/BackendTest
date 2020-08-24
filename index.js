const express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser');

const port = process.env.APP_PORT || 4000;

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Servidor en linea');
})

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/climas', require('./routes/climas'));

app.listen(port, () => {
  console.log(`El servidor esta trabajando en el puerto ${port}`);
})