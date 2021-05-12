const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('<h1>12 de mayo e 2021, 8:28am</h1>'))


app.listen(3000);
console.log("Server on port 3000");