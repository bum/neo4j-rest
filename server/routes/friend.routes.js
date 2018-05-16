const friendController = require('../controller/friend.controller');

const router = require('express').Router();

router.get('/:id/add/:to', friendController.addFriend);
router.get('/:id/del/:to', friendController.delFriend);

router.get('/:id/is/:to', friendController.isFriend);
router.get('/:id/ids', friendController.listFriends);
router.get('/:id/fof', friendController.listFriendsOfFriends);
router.get('/:id/fof/:to', friendController.isFriendsOfFriends);
router.get('/:id/cmf/:to', friendController.listCommonFriends);

module.exports = router;