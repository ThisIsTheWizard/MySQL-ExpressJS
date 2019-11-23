const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
	res.send('Hello There');
});

const banking = require('./api/banking');
app.use(banking);

app.listen(process.env.PORT || 8080, () => {
	console.log('Server has been started successfully on port 8080');
});
