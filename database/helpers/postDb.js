const db = require('../dbConfig.js');

module.exports = {
    get,
    getPost,
    getPostComment,
    getPostByFamily,
    add,
    update,
    remove,
    removeByUser,
};

function get() {
    return db('posts');
}

function getPost(id) {
    return db('posts')
        .select(
            'id',
            'attraction',
            'num_of_children',
            'meetup_time',
            'meetup_date',
            'message',
        )
        .where('id', id);
}

function getPostComment(postId) {
    return db('comments')
        .where('post_id', postId);
}

function getPostByFamily(familyId) {
    return db('posts')
        .where('family_id', familyId);
}

function add(post) {
    return db('posts')
        .insert(post)
        .then(ids => {
            return getPost(ids[0]);
        });
}

function update(id, changes) {
    return db('posts')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('posts')
        .where('id', id)
        .del();
}

function removeByUser(user_id) {
    return db('posts')
        .where('user_id', user_id)
        .del();
}