const express = require('express');
const dotenv = require('dotenv');
const newsRoutes = require('./routes/newsRoutes');
const tokenValidator = require('./middlewares/tokenValidation');
const getUserData = require('./routes/newsRoutes');
const { userData, userDataList } = require('./data/userData');
const app = express();
const port = 6000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use('/users', newsRoutes);

app.get('/news', tokenValidator, async (req, res) => {
	try {
		const email = req.email;
		const data = userDataList;
		console.log('data: ', data);
		userList = data.filter((user) => {
			if (user.email == email) {
				return true;
			} else {
				return false;
			}
		});
		user = userList[0];
		res.status(200).json({ news: user.news });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.listen(port, (err) => {
	if (err) {
		return console.log('Something bad happened', err);
	}
	console.log(`Server is listening on ${port}`);
});

module.exports = app;
