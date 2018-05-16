"use strict";

const config = require('../config');
const neo4j = require('neo4j-driver').v1;
const driver = new neo4j.driver(config.url, neo4j.auth.basic(config.user, config.password));

module.exports.getSession = function (context) {
	if (context.neo4jSession) {
		return context.neo4jSession;
	}
	else {
		context.neo4jSession = driver.session();
		return context.neo4jSession;
	}
};

module.exports.cleanSession = (req, res, next) => {
	res.on('finish', function () {
		if (req.neo4jSession) {
			req.neo4jSession.close();
			delete req.neo4jSession;
		}
	});
	next();
};