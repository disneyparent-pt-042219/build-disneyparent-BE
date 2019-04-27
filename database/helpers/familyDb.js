const db = require('../dbConfig.js');

module.exports = {
    get,
    getByUsername,
    getParentPosts,
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

function getUserPosts(username) {
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

function update(id, changes) {
    return db('family')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('family')
        .where('id', id )
        .del();
}