const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); // Replace './swagger.yaml' with the path to your Swagger file
const app = express();

const PRIVATE_KEY = "ILoveSunglasses";

app.use(bodyParser.json());

// Importing the data from JSON files
const users = require('../initial-data/users.json');
const brands = require('../initial-data/brands.json');
const products = require('../initial-data/products.json');

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ error: 'No token provided' });
	}
	const token = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(token, PRIVATE_KEY);
		req.username = decoded.username;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Token invalid or expired' });
	}
};

// Error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

app.get('/brands', (req, res) => {
	res.status(200).json(brands);
});

app.post('/login', (req, res) => {
	const { username, password } = req.body;
	const user = users.find(user => user.login.username === username && user.login.password === password);
	if (!user) {
		return res.status(401).json({ error: 'Invalid login info' });
	}
	const token = jwt.sign({ username: username }, PRIVATE_KEY, { expiresIn: '1h' });
	res.status(200).json({token});
});

app.get('/me/cart', verifyToken, (req, res) => {
	const currentUser = users.find(user => user.login.username === req.username);
	if (!currentUser) {
		return res.status(404).json({ error: 'User not found' });
	}
	res.status(200).json(currentUser.cart);
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Starting the server
if (require.main === module) {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
});
}


module.exports = app;
