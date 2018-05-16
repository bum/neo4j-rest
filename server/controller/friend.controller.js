const dbSession = require('../neo4j/dbutils').getSession;
const friendModel = require('../model/friend.model');
const writeError = require('./response').writeError;

class FriendController {
	addFriend(req, res) {
		friendModel.addFriend(dbSession(req),
				req.params.id,
				req.params.to
		).then((is) => {
			res.json({is});
		}).catch(writeError)
	}

	delFriend(req, res) {
		friendModel.delFriend(dbSession(req),
				req.params.id,
				req.params.to
		).then((is) => {
			res.json({is});
		}).catch(writeError)
	}

	isFriend(req, res) {
		friendModel.isFriend(dbSession(req),
				req.params.id,
				req.params.to
		).then((is) => {
			res.json({is});
		}).catch(writeError)
	}

	listFriends(req, res) {
		friendModel.listFriends(dbSession(req),
				req.params.id
		).then((ids) => {
			res.json({ids});
		}).catch(writeError)
	}

	listFriendsOfFriends(req, res) {
		friendModel.listFriendsOfFriends(dbSession(req),
				req.params.id
		).then((ids) => {
			res.json({ids});
		}).catch(writeError)
	}

	isFriendsOfFriends(req, res) {
		friendModel.isFriendsOfFriends(dbSession(req),
				req.params.id,
				req.params.to
		).then((is) => {
			res.json({is});
		}).catch(writeError)
	}

	listCommonFriends(req, res) {
		friendModel.listCommonFriends(dbSession(req),
				req.params.id,
				req.params.to
		).then((ids) => {
			res.json({ids});
		}).catch(writeError)
	}
}

const friendController = new FriendController();
module.exports = friendController;