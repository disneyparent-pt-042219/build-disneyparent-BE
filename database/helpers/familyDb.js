const db = require('../dbConfig');

module.exports = {
    get,
    getBy,
    getById,
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


function add(user) {
    const [id] = db('family')
        .insert(user);

    return getById(id);
}

function update(id, change) {
    return db('family')
        .where('id', id)
        .update(change);
}

function remove(id) {
    return db('family')
        .where('id', id)
        .del();
}