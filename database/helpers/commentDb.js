const db = require('../dbConfig');

module.exports = {
    add,
    update,
    remove,
};

function add(comment) {
    return db('comments')
        .insert(comment)
        .then(ids => {
            return getById(ids[0]);
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