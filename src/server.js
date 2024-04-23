const express = require('express');
const { json } = require('body-parser');
const cors = require('./app/api/server/cors');

const app = express();
const port = 3001;

app.use(cors);
app.use(json());

const validCredentials = {
  email: 'test@test.test',
  password: '111111',
};

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  console.log(req);
  if (
    email === validCredentials.email &&
    password === validCredentials.password
  ) {
    res
      .status(200)
      .json({ status: 'success', message: 'Вход выполнен успешно' });
  } else {
    res
    .status(401)
    .json({ status: 'error', message: 'Неверные учетные данные' });
  }
});

app.post('/email', (req, res) => {
  const { email } = req.body;
  if (email) {
    res.status(200).json({ status: 'success' });
  } else {
    res.status(401).json({ status: 'error', message: 'Ошибка' });
  }
});

app.get('/email', (req, res) => {
  res.status(200).json({ status: 'success', data: 'test@test.test' });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
