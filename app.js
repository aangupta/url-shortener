const express = require('express');
const api = require('./api');
const { urls } = require('./urls_data');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/api', api);
/* app.use('/u/:id', (req, res) => ) */
app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});
