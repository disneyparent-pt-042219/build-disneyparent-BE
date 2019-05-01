const db = require('../dbConfig');

module.exports = {
    get,
    getBy,
    getById,
    getFamilyPosts,
    add,
    update,
    remove,
};

function get() {
    return db('family');
}

function getBy(filter) {
    return db('family').where(filter);
}

function getById(id) {
    return db('family')
        .select('id', 'username')
        .where({ id })
        .first();
}

function getFamilyPosts(username) {
    return db('posts as p')
        .join('family as f', 'f.username', 'p.family_username')
        .select('p.id', 'p.text', 'f.username as postedBy')
        .where('p.family_username', username);
}

function add(user) {
    const [id] = db('family')
        .insert(user);

    return getById(id);
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