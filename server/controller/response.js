module.exports.writeError = (res, error, status) => {
	res.status(error.status || status || 400).json({
		error: {
			message: error.message
		}
	});
};