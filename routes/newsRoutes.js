const bcrypt = require('bcrypt');
const newsRoutes = require('express').Router();
const jwt = require('jsonwebtoken');
const tokenValidator = require('../middlewares/tokenValidation');
const newsList = require('../helper/getPreferences');
const { userDataList } = require('../data/userData');
let data = userDataList;

newsRoutes.post('/signup', async (req, res) => {
	try {
		const { email, name, password, preferences } = req.body;

		if (!email) {
			throw new Error('email is missing');
		}

		if (!password) {
			throw new Error('password is missing');
		}

		data.forEach((user) => {
			if (email == user.email) {
				throw new Error('user exists');
			}
		});

		const salt = await bcrypt.genSalt(10);
		hashedPassword = await bcrypt.hash(password, salt);
		const news = preferences;

		data.push({ email, name, password: hashedPassword, preferences, news });

		current_pushed_data = data.filter((user) => {
			if (user.email == email) {
				return true;
			} else {
				return false;
			}
		});
		let dataObj = current_pushed_data[0];
		// console.log(data);

		res.status(201).json({ message: 'registered', data: { dataObj } });
	} catch (error) {
		console.log('error: ', error.message);
		res.status(400).json({ error: error.message });
	}
});

newsRoutes.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		userData = data.filter((user) => {
			if (email == user.email) {
				return true;
			} else {
				return false;
			}
		});

		if (!userData) {
			throw new Error('invalid email');
		}
		user = userData[0];

		if (!bcrypt.compare(password, user.password)) {
			throw new Error('password invalid');
		}

		const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
			expiresIn: '1y',
		});

		res.status(200).json({ token: token, user, message: 'successful login' });
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

newsRoutes.get('/preferences', tokenValidator, async (req, res) => {
	try {
		const email = req.email;
		userData = data.filter((user) => {
			if (user.email == email) {
				return true;
			} else {
				false;
			}
		});
		const user = userData[0];
		const preferences = user.preferences;
		res.status(200).json({ preferences: preferences });
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

newsRoutes.put('/preferences', tokenValidator, async (req, res) => {
	try {
		const { preferences } = req.body;
		const email = req.email;
		userData = data.map((user) => {
			if (user.email == email) {
				user.preferences = preferences;
			}
			return user;
		});
		data = userData;
		current_pushed_data = data.filter((user) => {
			if (user.email == email) {
				return true;
			} else {
				return false;
			}
		});
		let dataObj = current_pushed_data[0];
		res
			.status(200)
			.json({ preferences: dataObj.preferences, message: 'modified suceess' });
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

const getUserData = () => {
	return data;
};
newsRoutes.dataList = getUserData;

module.exports = newsRoutes;
