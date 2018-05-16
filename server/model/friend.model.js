const REL = 'ADD';

const check = (session, cypher) => (
		session.run(cypher)
		.then(
				result => (
						result.records[0].get('yes')
				)
		)
);

const listIds = (session, cypher) => (
		session.run(cypher)
		.then(
				result => (
						result.records.map(
								(record) => (
										record.get('ids').low
								)
						)
				)
		)
);

class FriendModel {
	addFriend(session, id, to) {
		if (id === to) next();
		if (id > to) {
			let tmp = to;
			to = id;
			id = tmp;
		}

		const cypher = `MERGE (a:Acc{id: ${id} }) MERGE (b:Acc{id: ${to} }) MERGE (a)-[: ${REL} ]->(b)`;
		return session.run(cypher).then(() => true)
	}

	delFriend(session, id, to) {
		if (id === to) next();
		const cypher = `MATCH (:Acc{id: ${id} }) -[r: ${REL} ]- (:Acc{id: ${to} }) DELETE r`;
		return session.run(cypher).then(() => true)
	}

	isFriend(session, id, to) {
		const cypher = `MATCH (:Acc{id: ${id} }) -[r: ${REL} ]- (:Acc{id: ${to} }) RETURN count(r)=1 AS yes`;
		return check(session, cypher)
	}

	listFriends(session, id) {
		const cypher = `MATCH (a:Acc{id: ${id} }) -[: ${REL} ]- (b) RETURN b.id AS ids`;
		return listIds(session, cypher)
	}

	listFriendsOfFriends(session, id) {
		const cypher = `MATCH (a:Acc{id: ${id} }) -[: ${REL} ]- (b) -[: ${REL} ]- (c) WHERE NOT((a) –[: ${REL} ]– (c)) RETURN DISTINCT c.id AS ids`;
		return listIds(session, cypher)
	}

	isFriendsOfFriends(session, id, to) {
		const cypher = `MATCH p=shortestPath((:Acc{id: ${id} }) -[: ${REL} *..2 ]- (:Acc{id: ${to} }))  RETURN length(p)=2 AS yes`;
		return check(session, cypher)
	}

	listCommonFriends(session, id, to) {
		const cypher = `MATCH (a:Acc{id: ${id} })-[: ${REL} ] -(b)- [: ${REL} ]- (c:Acc{id: ${to} }) RETURN DISTINCT b.id AS ids`;
		return listIds(session, cypher)
	}
}

const friendModel = new FriendModel();
module.exports = friendModel;

