const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const app = express();
const PORT = 3000;


app.use(bodyParser.json());

app.use('/', bookRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something is wrong! Try again later');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
