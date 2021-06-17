const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The server is running in PORT ${PORT}`);
});

app.use(express.json());

app.use('/api/beds', require('./routes/beds'));

app.get('/', (req, res) => {
  res.json({ msg: 'This is a test' });
});
