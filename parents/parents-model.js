const db = require('../database/dbConfig.js');

module.exports = {
    add,
    find, 
    findBy,
    update,
    remove,
};

async function add(parent) {
    const [id] = await db('parents').insert(parent);
    return findById(id);
}

function find() {
    return db('parents').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('parents').where(filter);
}

function update(id, changes) {
    return db('parents')
        .where({ id })
        .update(changes, '*');
}

function remove(id) {
    return db('parents')
        .where({ id })
        .del();
}