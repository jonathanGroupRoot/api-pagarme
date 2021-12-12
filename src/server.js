const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('./routes');

require('./database/index');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => {
    console.log(`Servidor funcionando no http://localhost:${port}`);
})