const db = require('../dbConfig');

module.exports = {
    getByPostId,
    add,
    update,
    remove,
};

function getByPostId(postId) {
    return db('comments')
        .select(
            'id',
            'username',
            'comment'
        )
        .where('post_id', postId);
}

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