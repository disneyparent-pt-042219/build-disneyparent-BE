const db = require('../dbConfig');

module.exports = {
    get,
    getComment,
    add,
    update,
    remove,
};

function get() {
    return db('comments');
}

function getComment(id) {
    return db('comments')
        .select(
            'id',
            'username',
            'comment'
        )
        .where('id', id);
}

function add(comment) {
    return db('comments')
        .insert(comment)
        .then(ids => {
            return getComment(ids[0]);
        });
}

function update(id, changes) {
    return db('comments')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('comments')
        .where('id', id)
        .del();
}