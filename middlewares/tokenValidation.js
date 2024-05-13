const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const tokenValidator = async (req, res, next) => {
	try {
		if (req.headers && req.headers.authorization) {
			const token = req.headers.authorization;

			const decrypt_list = jwt.verify(token, process.env.JWT_SECRET);

			const { email } = decrypt_list;

			req.email = email;

			next();
		} else {
			// headers absent
			throw new Error('headers absent');
			// next();
		}
	} catch (error) {
		console.log('middlware error: ', error.message);
		res.status(401).json({ error: error.message });
		next();
	}
};

module.exports = tokenValidator;
