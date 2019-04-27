const db = require('../dbConfig.js');

module.exports = {
    get,
    getByUsername,
    getFamilyPosts,
    add,
    update,
    remove,
};

function get() {
    return db('family');
}

function getByUsername(username) {
    const userId = db('family')
        .where()
        .first()
    return userId;
}

function getFamilyPosts(username) {
    return db('posts as p')
        .join('family as f', 'f.username', 'p.family_username')
        .select('p.id', 'p.text', 'f.username as postedBy')
        .where('p.family_username', username);
}

function add(family) {
    return db('family')
        .insert(family)
        .then();
}

function update(username, changes) {
    return db('family')
        .where({ username })
        .update(changes);
}

function remove(username) {
    return db('family')
        .where('username', username )
        .del();
}